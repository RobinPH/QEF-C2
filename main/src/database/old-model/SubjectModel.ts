import prisma from "@database/prisma";
import { Subject } from "@prisma/client";

export default class SubjectModel {
  static async get(id: string) {
    return await prisma.subject.findFirst({
      where: {
        id,
      },
    });
  }

  static async getQuestions(id: string) {
    return await prisma.question.findMany({
      where: {
        subjectId: id,
      },
    });
  }

  static async create({ name, code }: { name: string; code: string }) {
    return await prisma.subject.create({
      data: {
        name,
        code,
      },
    });
  }

  static async seed() {
    const SUBJECTS = [
      {
        name: "Introduction to Mathematics",
        code: "MATH-001",
      },
      {
        name: "Introduction to English",
        code: "ENGLISH-001",
      },
    ];
    const students = new Array<Subject>();

    for (const subject of SUBJECTS) {
      students.push(await SubjectModel.create(subject));
    }

    return students;
  }
}
