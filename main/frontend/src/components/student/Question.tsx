import { useAnswer } from "@hooks/useAnswer";
import { Question as QuestionType, Student as StudentType } from "@types";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const Question: React.FC<{ student: StudentType; question: QuestionType }> = ({
  student,
  question,
}) => {
  const { answer, submitAnswer } = useAnswer(student, question);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-slate-200">
      <div className="font-bold">{question.question}</div>
      {answer ? (
        <div>
          <input
            className="flex items-center w-full gap-2 input input-bordered input-sm"
            value={answer.answer}
            disabled
          ></input>
        </div>
      ) : (
        <div>
          <Formik
            initialValues={{ answer: "" }}
            validationSchema={Yup.object().shape({
              answer: Yup.string().required(),
            })}
            onSubmit={async ({ answer }) => {
              submitAnswer(answer);
            }}
          >
            <Form className="flex gap-2">
              <label className="flex items-center w-full gap-2 input input-bordered input-sm">
                <Field name="answer" placeholder="Your answer" type="text" />
              </label>
              <button className="w-fit btn btn-primary btn-sm" type="submit">
                Submit Answer
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Question;
