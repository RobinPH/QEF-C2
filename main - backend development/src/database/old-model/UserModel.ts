import prisma from "@database/prisma";
import { User, UserRole } from "@prisma/client";
import { CreateUserProps } from "@types";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

export default class UserModel {
  static async get(id: string) {
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

  static async create(userProps: CreateUserProps, saltRounds = 10) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(userProps.password, salt);

    const existingUser = await UserModel.getByEmail(userProps.email);

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

  static async getByEmail(email: string) {
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

  static async getByToken(token: string) {
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

  static async authenticate(email: string, password: string) {
    const unsanitizedUser = await UserModel.getByEmail_unsanitized(email);
    const user = await UserModel.getByEmail(email);

    if (!unsanitizedUser || !user) {
      return;
    }

    if (!bcrypt.compareSync(password, unsanitizedUser.password)) {
      return;
    }

    const token = UserModel.createToken();

    return await prisma.user.update({
      data: {
        token,
      },
      where: user,
    });
  }

  static async register(
    name: string,
    email: string,
    password: string,
    role: UserRole = UserRole.STUDENT
  ) {
    const user = await UserModel.create({
      name,
      email,
      password,
      role,
    });

    if (!user) {
      return;
    }

    const token = UserModel.createToken();

    return await prisma.user.update({
      data: {
        token,
      },
      where: {
        id: user.id,
      },
    });
  }

  static async logout(token: string) {
    await prisma.user.delete({
      where: {
        token,
      },
    });
  }

  static createToken() {
    return crypto.randomBytes(48).toString("hex");
  }

  static async all() {
    return (await prisma.user.findMany()).map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });
  }

  private static async get_unsanitized(id: string) {
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

  private static async getByEmail_unsanitized(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  static async getByToken_unsanitized(token: string) {
    return await prisma.user.findFirst({
      where: {
        token,
      },
    });
  }

  static async seed() {
    const DEFAULT_USERS: Array<CreateUserProps> = [
      {
        name: "Robin Dimasin",
        email: "robindimasin@gmail.com",
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
