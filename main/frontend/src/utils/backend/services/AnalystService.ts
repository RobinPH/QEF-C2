import { Analyst, BackendResponse, Subject } from "@types";
import { Service } from "./Service";

export class AnalystService extends Service {
  async get(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        analyst: Analyst;
      }>
    >(`/analyst/${id}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.analyst;
  }

  async getByUserId(userId: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        analyst: Analyst;
      }>
    >(`/analyst/user/${userId}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.analyst;
  }

  async getSubjects() {
    const response = await this.backend.axios.get<
      BackendResponse<{
        subjects: Subject[];
      }>
    >(`/subject/all`);

    const data = response.data;

    if (!data.success) {
      return [];
    }

    return data.payload.subjects;
  }
}
