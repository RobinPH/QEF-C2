import prisma from "@database/prisma";
import { Student, StudentSubject, Subject } from "@prisma/client";

export default class StudentSubjectModel {
  static async get(id: string) {
    return await prisma.student.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  static async create(student: Student, subjects: Subject[]) {
    const studentSubjects = new Array<StudentSubject>();

    for (const subject of subjects) {
      studentSubjects.push(
        await prisma.studentSubject.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
          },
        })
      );
    }

    return studentSubjects;
  }

  static async seed(students: (Student & { subjects: Subject[] })[]) {
    const studentSubjects = new Array<StudentSubject>();

    for (const student of students) {
      studentSubjects.push(
        ...(await StudentSubjectModel.create(student, student.subjects))
      );
    }

    return studentSubjects;
  }
}
