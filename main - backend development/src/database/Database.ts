import type { DatabaseAdapter } from "@database/adapter";
import { CreateUserProps } from "@types";
import bcrypt from "bcrypt";

export class Database {
  private adapter: DatabaseAdapter;

  constructor(adapter: DatabaseAdapter) {
    this.adapter = adapter;
  }

  async createUser(userProps: CreateUserProps, saltRounds = 10) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(userProps.password, salt);

    return await this.adapter.createUser({
      ...userProps,
      password: hashedPassword,
    });
  }

  async authenticateUser(email: string, password: string) {
    const unsanitizedUser = await this.adapter.getUnsanitizedUserByEmail(email);
    const user = await this.adapter.getUserByEmail(email);

    if (unsanitizedUser === null || user === null) {
      return null;
    }

    if (!bcrypt.compareSync(password, unsanitizedUser.password)) {
      return null;
    }

    return user;
  }

  async getAllUsers() {
    return await this.adapter.getAllUsers();
  }

  async seed() {
    const DEFAULT_USERS: Array<CreateUserProps> = [
      {
        name: "Robin Dimasin",
        email: "robindimasin@gmail.com",
        password: "password",
        role: "ANALYST",
      },
    ];

    for (const user of DEFAULT_USERS) {
      await this.createUser(user);
    }
  }
}
