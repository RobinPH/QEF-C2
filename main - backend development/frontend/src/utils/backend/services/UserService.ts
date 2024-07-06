import type { BackendResponse, SanitizedUser, User } from "@types";
import { Service } from "./Service";

export class UserService extends Service {
  async get(id: string) {
    const response = await this.backend.axios.get<
      BackendResponse<{
        user: User;
      }>
    >(`/user/${id}`);

    const data = response.data;

    if (!data.success) {
      return undefined;
    }

    return data.payload.user;
  }

  async all() {
    const response = await this.backend.axios.get<SanitizedUser[]>("/users");

    return response.data;
  }
}
