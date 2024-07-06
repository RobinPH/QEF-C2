import { PrismaClient } from "@prisma/client";
import { CreateUserProps } from "@types";
import { DatabaseAdapter } from "./DatabaseAdapter";

export class PrismaAdapter extends DatabaseAdapter {
  prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    super();

    this.prisma = prisma;
  }

  async getAllUsers() {
    return (await this.prisma.user.findMany()).map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findFirst({
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

  async getUnsanitizedUserById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
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

  async getUnsanitizedUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(userProps: CreateUserProps) {
    const existingUser = await this.getUserByEmail(userProps.email);

    if (existingUser !== null) {
      return null;
    }

    return await this.prisma.user.create({
      data: userProps,
    });
  }
}
