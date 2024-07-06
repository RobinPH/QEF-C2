import prisma from "@database/prisma";
import { Teacher, User } from "@prisma/client";
import { Model } from "./model";

export default class TeacherModel extends Model<Teacher, never, "teacher"> {
  constructor() {
    super("teacher");
  }

  async get(id: string) {
    return await prisma.teacher.findFirst({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string) {
    return await prisma.teacher.findFirst({
      where: {
        userId,
      },
    });
  }

  async getSubjects(id: string) {
    return await prisma.subject.findMany({
      where: {
        teacherId: id,
      },
    });
  }

  async create(user: User) {
    return await prisma.teacher.create({
      data: {
        userId: user.id,
      },
    });
  }

  async seed(users: User[]) {
    const teachers = new Array<Teacher>();

    for (const user of users) {
      teachers.push(await this.create(user));
    }

    return teachers;
  }
}
