import { StudentModel } from "@database/model";
import { Student } from "@types";
import { createErrorResponse } from "@utils";
import { isAuthenticatedMiddleware } from "./isAuthenticated";

export const isUserStudentMiddleware = () => {
  return isAuthenticatedMiddleware().addWithLocals<{
    student: Student;
  }>(async (req, res, next) => {
    const { user } = res.locals;

    const student = await StudentModel.getByUserId(user.id);

    if (!student) {
      return res
        .status(400)
        .send(createErrorResponse("Account does not have Student profile"));
    }

    res.locals.student = student;

    next();
  });
};

const isUserStudent = () => {
  return isUserStudentMiddleware().build();
};

export default isUserStudent;
