import prisma from "@database/prisma";
import { Student, User } from "@prisma/client";
import { Model } from "./model";

export default class StudentModel extends Model<Student, never, "student"> {
  constructor() {
    super("student");
  }

  async get(id: string) {
    return await prisma.student.findFirst({
      where: {
        id,
      },
    });
  }

  async all() {
    return await prisma.student.findMany({
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async getByUserId(userId: string) {
    return await prisma.student.findFirst({
      where: {
        userId,
      },
    });
  }

  async getSubjects(id: string) {
    return (
      await prisma.studentSubject.findMany({
        where: {
          studentId: id,
        },
        include: {
          subject: true,
        },
      })
    ).map((result) => {
      return result.subject;
    });
  }

  async create(user: User) {
    return await prisma.student.create({
      data: {
        userId: user.id,
      },
    });
  }

  async seed(users: User[]) {
    const students = new Array<Student>();

    for (const user of users) {
      students.push(await this.create(user));
    }

    return students;
  }
}
