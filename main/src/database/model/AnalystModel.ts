import prisma from "@database/prisma";
import { Analyst, User } from "@prisma/client";
import { Model } from "./model";

export default class AnalystModel extends Model<Analyst, never, "analyst"> {
  constructor() {
    super("analyst");
  }

  async get(id: string) {
    return await prisma.analyst.findFirst({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string) {
    return await prisma.analyst.findFirst({
      where: {
        userId,
      },
    });
  }

  async create(user: User) {
    return await prisma.analyst.create({
      data: {
        userId: user.id,
      },
    });
  }

  async seed(users: User[]) {
    const analysts = new Array<Analyst>();

    for (const user of users) {
      analysts.push(await this.create(user));
    }

    return analysts;
  }
}
