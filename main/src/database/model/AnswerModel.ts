import prisma from "@database/prisma";
import { Answer } from "@prisma/client";
import { Model } from "./model";

export default class AnswerModel extends Model<Answer, never, "answer"> {
  constructor() {
    super("answer");
  }

  async get(id: string) {
    return await prisma.answer.findFirst({
      where: {
        id,
      },
    });
  }

  async create(studentId: string, questionId: string, answer: string) {
    return await prisma.answer.create({
      data: {
        studentId,
        questionId,
        answer,
      },
    });
  }

  async submitGrade(id: string, grade: number) {
    return await prisma.answer.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });
  }

  async getStudentAnswerAtQuestion(studentId: string, questionId: string) {
    return await prisma.answer.findFirst({
      where: {
        studentId,
        questionId,
      },
    });
  }
}
