import type { Answer, BackendResponse, Question, Student } from "@types";
import { Service } from "./Service";

export class AnswerService extends Service {
  async getStudentAnswerAtQuestion(student: Student, question: Question) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        answer: Answer;
      }>
    >(`/answer/${student.id}/${question.id}`);

    const data = response.data;

    if (!data.success) {
      return;
    }

    return data.payload.answer;
  }

  async submitGrade(answer: Answer, grade: number) {
    const response = await this.backend.axios.post<
      BackendResponse<{
        answer: Answer;
      }>
    >(`/answer/submit-grade/${answer.id}`, {
      grade,
    });

    const data = response.data;

    if (!data.success) {
      return;
    }

    return data.payload.answer;
  }
}
