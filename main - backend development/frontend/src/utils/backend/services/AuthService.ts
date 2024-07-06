import type { BackendResponse } from "@types";
import { Service } from "./Service";

export class AuthService extends Service {
  async login(email: string, password: string) {
    const response = await this.backend.axios.post<
      BackendResponse<{
        token: string;
      }>
    >("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    if (!data.success) {
      return;
    }

    const { token } = data.payload;

    return token;
  }

  async register(name: string, email: string, password: string) {
    const response = await this.backend.axios.post<
      BackendResponse<{
        token: string;
      }>
    >("/auth/register", {
      name,
      email,
      password,
    });

    const data = response.data;

    if (!data.success) {
      return;
    }

    const { token } = data.payload;

    return token;
  }
}
