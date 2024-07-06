import prisma from "@database/prisma";
import { User, UserRole } from "@prisma/client";
import { CreateUserProps } from "@types";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { Model } from "./model";

export default class UserModel extends Model<
  User,
  "password" | "token",
  "user"
> {
  constructor() {
    super("user");
  }

  async get(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async get_unsanitized(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async create(userProps: CreateUserProps, saltRounds = 10) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(userProps.password, salt);

    const existingUser = await this.getByEmail(userProps.email);

    if (existingUser !== null) {
      return null;
    }

    return await prisma.user.create({
      data: {
        ...userProps,
        password: hashedPassword,
      },
    });
  }

  async getByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async getByToken(token: string) {
    return await prisma.user.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async authenticate(email: string, password: string) {
    const unsanitizedUser = await this.getByEmail_unsanitized(email);
    const user = await this.getByEmail(email);

    if (!unsanitizedUser || !user) {
      return;
    }

    if (!bcrypt.compareSync(password, unsanitizedUser.password)) {
      return;
    }

    const token = this.createToken();

    return await prisma.user.update({
      data: {
        token,
      },
      where: user,
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.STUDENT
  ) {
    const user = await this.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return;
    }

    const token = this.createToken();

    return await prisma.user.update({
      data: {
        token,
      },
      where: {
        id: user.id,
      },
    });
  }

  async logout(token: string) {
    await prisma.user.delete({
      where: {
        token,
      },
    });
  }

  createToken() {
    return crypto.randomBytes(48).toString("hex");
  }

  async all() {
    return (await prisma.user.findMany()).map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });
  }

  private async getByEmail_unsanitized(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getByToken_unsanitized(token: string) {
    return await prisma.user.findFirst({
      where: {
        token,
      },
    });
  }

  async seed() {
    const DEFAULT_USERS: Array<CreateUserProps> = [
      {
        name: "Super Admin",
        email: "admin@gmail.com",
        password: "password",
        role: UserRole.ADMIN,
      },
      {
        name: "John Doe",
        email: "s1@gmail.com",
        password: "password",
        role: UserRole.STUDENT,
      },
      {
        name: "Foo Bar",
        email: "s2@gmail.com",
        password: "password",
        role: UserRole.STUDENT,
      },
      {
        name: "Teacher One",
        email: "t1@gmail.com",
        password: "password",
        role: UserRole.TEACHER,
      },
      {
        name: "Teacher Two",
        email: "t2@gmail.com",
        password: "password",
        role: UserRole.TEACHER,
      },
      {
        name: "Analyst One",
        email: "a1@gmail.com",
        password: "password",
        role: UserRole.ANALYST,
      },
    ];

    const users = new Array<User>();

    for (const user of DEFAULT_USERS) {
      const createdUser = await this.create(user);

      if (createdUser) {
        users.push(createdUser);
      }
    }

    return users;
  }
}
