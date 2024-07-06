import { useAnswer } from "@hooks/useAnswer";
import { Question as QuestionType, SanitizedUser, Student } from "@types";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const Answer: React.FC<{
  student: Student & {
    user: SanitizedUser | null;
  };
  question: QuestionType;
}> = ({ student, question }) => {
  const { answer, submitGrade } = useAnswer(student, question);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-slate-50">
      <div className="font-bold">{student.user?.name}'s Answer</div>
      {answer ? (
        <div className="flex flex-col items-end w-full gap-4">
          <input
            className="flex items-center w-full gap-2 input input-bordered input-sm"
            value={answer.answer}
            disabled
          ></input>
          {answer.grade !== null ? (
            <input
              className="flex items-center w-full gap-2 input input-bordered input-sm"
              value={`Grade: ${answer.grade}`}
              disabled
            ></input>
          ) : (
            <Formik
              initialValues={{ grade: null }}
              validationSchema={Yup.object().shape({
                grade: Yup.number().required(),
              })}
              onSubmit={async ({ grade }) => {
                if (grade !== null) {
                  submitGrade(grade);
                }
              }}
            >
              <Form className="flex gap-2 w-fit">
                <Field
                  name="grade"
                  placeholder="Enter Grade"
                  type="number"
                  className="flex items-center gap-2 max-w-32 input input-bordered input-sm"
                />
                <button className="w-fit btn btn-primary btn-sm" type="submit">
                  Submit Grade
                </button>
              </Form>
            </Formik>
          )}
        </div>
      ) : (
        <div>No Answer yet</div>
      )}
    </div>
  );
};

export default Answer;
