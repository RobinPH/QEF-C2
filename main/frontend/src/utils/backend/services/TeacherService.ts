import { BackendResponse, Subject, Teacher } from "@types";
import { Service } from "./Service";

export class TeacherService extends Service {
  async get(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        teacher: Teacher;
      }>
    >(`/teacher/${id}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.teacher;
  }

  async getByUserId(userId: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        teacher: Teacher;
      }>
    >(`/teacher/user/${userId}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.teacher;
  }

  async getSubjects(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        subjects: Subject[];
      }>
    >(`/teacher/${id}/subjects`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.subjects;
  }
}
