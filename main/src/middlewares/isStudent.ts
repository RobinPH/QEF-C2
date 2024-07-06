import { StudentModel } from "@database/model";
import { Student } from "@types";
import { createErrorResponse } from "@utils";
import { withParameterMiddleware } from "./withParameter";

const isStudentMiddleware = <T extends string>(key: T) => {
  return withParameterMiddleware<[T]>(key).addWithLocals<{
    student: Student;
  }>(async (req, res, next) => {
    const id = req.params[key];

    const student = await StudentModel.getByUserId(id);

    if (!student) {
      return res
        .status(400)
        .send(createErrorResponse("Account does not have Student profile"));
    }

    res.locals.student = student;

    next();
  });
};

const isStudent = <T extends string>(key: T) => {
  return isStudentMiddleware<T>(key).build();
};

export default isStudent;
