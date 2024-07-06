import prisma from "@database/prisma";
import { Student, StudentSubject, Subject } from "@prisma/client";
import { Model } from "./model";

export default class StudentSubjectModel extends Model<
  StudentSubject,
  never,
  "studentSubject"
> {
  constructor() {
    super("studentSubject");
  }

  async create(student: Student, subjects: Subject[]) {
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

  async seed(students: (Student & { subjects: Subject[] })[]) {
    const studentSubjects = new Array<StudentSubject>();

    for (const student of students) {
      studentSubjects.push(...(await this.create(student, student.subjects)));
    }

    return studentSubjects;
  }
}
