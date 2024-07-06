import { BackendResponse, SanitizedUser, Student, Subject } from "@types";
import { Service } from "./Service";

export class StudentService extends Service {
  async get(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        student: Student;
      }>
    >(`/student/${id}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.student;
  }

  async getByUserId(userId: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        student: Student;
      }>
    >(`/student/user/${userId}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.student;
  }

  async getSubjects(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        subjects: Subject[];
      }>
    >(`/student/${id}/subjects`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.subjects;
  }

  async all() {
    const response = await this.backend.axios.get<
      BackendResponse<{
        students: (Student & { user: SanitizedUser | null })[];
      }>
    >(`/student/all`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.students;
  }
}
