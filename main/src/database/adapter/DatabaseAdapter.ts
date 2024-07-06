import type { CreateUserProps, SanitizedUser, User } from "@types";

export abstract class DatabaseAdapter {
  constructor() {}

  abstract getAllUsers(): Promise<SanitizedUser[]>;
  abstract getUserById(id: string): Promise<SanitizedUser | null>;
  abstract getUserByEmail(email: string): Promise<SanitizedUser | null>;
  abstract getUnsanitizedUserById(id: string): Promise<User | null>;
  abstract getUnsanitizedUserByEmail(email: string): Promise<User | null>;
  abstract createUser(userProps: CreateUserProps): Promise<User | null>;
}
