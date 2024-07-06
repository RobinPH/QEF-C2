import type { BackendResponse, SanitizedUser } from "@types";
import { Service } from "./Service";

export class AccountService extends Service {
  async whoami(token: string) {
    const response = await this.backend.axios.post<
      BackendResponse<{
        user: SanitizedUser;
      }>
    >(
      "/account/whoami",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;

    if (!data.success) {
      return null;
    }

    return data.payload.user;
  }
}
