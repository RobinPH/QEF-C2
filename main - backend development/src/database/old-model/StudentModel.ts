import prisma from "@database/prisma";
import { Student, User } from "@prisma/client";

export default class StudentModel {
  static async get(id: string) {
    return await prisma.student.findFirst({
      where: {
        id,
      },
    });
  }

  static async getByUserId(userId: string) {
    return await prisma.student.findFirst({
      where: {
        userId,
      },
    });
  }

  static async getSubjects(id: string) {
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

  static async create(user: User) {
    return await prisma.student.create({
      data: {
        userId: user.id,
      },
    });
  }

  static async seed(users: User[]) {
    const students = new Array<Student>();

    for (const user of users) {
      students.push(await StudentModel.create(user));
    }

    return students;
  }
}
