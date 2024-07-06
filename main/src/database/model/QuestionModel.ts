import prisma from "@database/prisma";
import { Question, Subject } from "@prisma/client";
import { Model } from "./model";

export default class QuestionModel extends Model<Question, never, "question"> {
  constructor() {
    super("question");
  }

  async get(id: string) {
    return await prisma.question.findFirst({
      where: {
        id,
      },
    });
  }

  async create(subject: Subject, question: string) {
    return await prisma.question.create({
      data: {
        question,
        subject: {
          connect: subject,
        },
      },
    });
  }

  async seed(subjects: Subject[]) {
    const questions = new Array<Question>();

    for (const subject of subjects) {
      questions.push(
        await this.create(subject, `For you, what is "${subject.name}" about?`)
      );

      questions.push(await this.create(subject, `Introduce yourself`));
    }

    return questions;
  }
}
