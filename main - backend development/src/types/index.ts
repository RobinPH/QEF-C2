import type { User, UserRole } from "@prisma/client";

export type CreateUserProps = Pick<
  User,
  "name" | "email" | "password" | "role"
>;

export type UserWithoutPassword = Omit<User, "password">;

export type SanitizedUser = Omit<User, "password" | "token">;

export type Student = {
  id: string;
  userId: string | null;
};

export type Teacher = {
  id: string;
  userId: string | null;
};

export type Analyst = {
  id: string;
  userId: string | null;
};

export type Subject = {
  id: string;
  code: string;
  name: string;
  teacherId: string;
};

export type Question = {
  id: string;
  subjectId: string;
  question: string;
};

export type Answer = {
  id: string;
  questionId: string;
  studentId: string;
  answer: string;
  grade: number | null;
};

export type { User, UserRole };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BackendResponse<Payload extends Record<string, any>> =
  | {
      success: true;
      payload: Payload;
    }
  | {
      success: false;
      error: string;
    };
