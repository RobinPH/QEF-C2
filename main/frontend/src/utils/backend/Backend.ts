import type { UserWithoutPassword } from "@types";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class Backend {
  axios: AxiosInstance;

  constructor(public account?: UserWithoutPassword | null) {
    this.account = account;

    // console.log({ account });

    this.axios = axios.create({
      baseURL: "http://localhost:5050/api",
      timeout: 10 * 1000,
      headers: {
        Authorization:
          account && account.token ? `Bearer ${account.token}` : null,
      },
    });
  }
}
