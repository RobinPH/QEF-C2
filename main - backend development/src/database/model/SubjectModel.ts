import prisma from "@database/prisma";
import { Subject } from "@prisma/client";
import { SanitizedUser, Student, Teacher } from "@types";
import { Model } from "./model";

export default class SubjectModel extends Model<Subject, never, "subject"> {
  constructor() {
    super("subject");
  }

  async get(id: string) {
    return await prisma.subject.findFirst({
      where: {
        id,
      },
    });
  }

  async getQuestions(id: string) {
    return await prisma.question.findMany({
      where: {
        subjectId: id,
      },
    });
  }

  async all() {
    return await prisma.subject.findMany();
  }

  async getStudents(
    id: string
  ): Promise<(Student & { user: SanitizedUser | null })[]> {
    return (
      await prisma.studentSubject.findMany({
        where: {
          subjectId: id,
        },
        select: {
          student: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
              },
            },
          },
        },
      })
    ).map((result) => result.student);
  }

  async create(
    { name, code }: { name: string; code: string },
    teacher?: Teacher
  ) {
    return await prisma.subject.create({
      data: {
        name,
        code,
        teacherId: teacher?.id,
      },
    });
  }

  async seed(teachers: Teacher[]) {
    const SUBJECTS = [
      {
        name: "Introduction to Mathematics",
        code: "MATH-001",
      },
      {
        name: "Introduction to English",
        code: "ENGLISH-001",
      },
    ];
    const students = new Array<Subject>();

    for (let i = 0; i < SUBJECTS.length; i++) {
      const subject = SUBJECTS[i];
      const teacher = teachers[i % teachers.length];

      students.push(await this.create(subject, teacher));
    }

    return students;
  }
}
