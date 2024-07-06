import {
  AnalystModel,
  QuestionModel,
  StudentModel,
  StudentSubjectModel,
  SubjectModel,
  TeacherModel,
  UserModel,
} from "@database/model";
import { UserRole } from "@prisma/client";

const main = async () => {
  try {
    const users = await UserModel.seed();
    const students = await StudentModel.seed(
      users.filter((user) => user.role === UserRole.STUDENT)
    );
    const teachers = await TeacherModel.seed(
      users.filter((user) => user.role === UserRole.TEACHER)
    );
    const analysts = await AnalystModel.seed(
      users.filter((user) => user.role === UserRole.ANALYST)
    );
    const subjects = await SubjectModel.seed(teachers);
    const studentSubjects = await StudentSubjectModel.seed(
      students.map((student) => {
        return {
          ...student,
          subjects,
        };
      })
    );
    const questions = await QuestionModel.seed(subjects);
  } catch (error) {
    console.error(error);
  } finally {
  }
};

main();
