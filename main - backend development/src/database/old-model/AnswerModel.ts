import prisma from "@database/prisma";

export default class AnswerModel {
  static async get(id: string) {
    return await prisma.answer.findFirst({
      where: {
        id,
      },
    });
  }

  static async getStudentAnswerAtQuestion(
    studentId: string,
    questionId: string
  ) {
    return await prisma.answer.findFirst({
      where: {
        studentId,
        questionId,
      },
    });
  }

  // static async seed(subjects: Subject[]) {
  //   const questions = new Array<Question>();

  //   for (const subject of subjects) {
  //     questions.push(
  //       await QuestionModel.create(
  //         subject,
  //         `For you, what is "${subject.name}" about?`
  //       )
  //     );

  //     questions.push(await QuestionModel.create(subject, `Introduce yourself`));
  //   }

  //   return questions;
  // }
}
