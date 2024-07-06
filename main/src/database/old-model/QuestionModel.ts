import prisma from "@database/prisma";
import { Question, Subject } from "@prisma/client";

export default class QuestionModel {
  static async get(id: string) {
    return await prisma.question.findFirst({
      where: {
        id,
      },
    });
  }

  static async create(subject: Subject, question: string) {
    return await prisma.question.create({
      data: {
        question,
        subject: {
          connect: subject,
        },
      },
    });
  }

  static async seed(subjects: Subject[]) {
    const questions = new Array<Question>();

    for (const subject of subjects) {
      questions.push(
        await QuestionModel.create(
          subject,
          `For you, what is "${subject.name}" about?`
        )
      );

      questions.push(await QuestionModel.create(subject, `Introduce yourself`));
    }

    return questions;
  }
}
