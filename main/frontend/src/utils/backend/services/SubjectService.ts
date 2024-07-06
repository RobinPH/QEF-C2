import {
  BackendResponse,
  Question,
  SanitizedUser,
  Student,
  Subject,
} from "@types";
import { Service } from "./Service";

export class SubjectService extends Service {
  async get(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        subject: Subject;
      }>
    >(`/subject/${id}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.subject;
  }

  async getQuestions(subjectId: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        questions: Question[];
      }>
    >(`/subject/${subjectId}/questions`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.questions;
  }

  async getStudents(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        students: (Student & { user: SanitizedUser | null })[];
      }>
    >(`/subject/${id}/students`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.students;
  }
}
