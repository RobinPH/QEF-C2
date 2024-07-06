import type { Answer, BackendResponse, Question } from "@types";
import { Service } from "./Service";

export class QuestionService extends Service {
  async submitAnswer(question: Question, answer: string) {
    const response = await this.backend.axios.post<
      BackendResponse<{
        answer: Answer;
      }>
    >(`/question/submit-answer/${question.id}`, { answer });

    const data = response.data;

    if (!data.success) {
      return;
    }

    return data.payload.answer;
  }
}
