import { Question as QuestionType, SanitizedUser, Student } from "@types";
import React from "react";
import Answer from "./Answer";

const Question: React.FC<{
  students: (Student & {
    user: SanitizedUser | null;
  })[];
  question: QuestionType;
}> = ({ students, question }) => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-slate-200">
      <div className="font-bold">{question.question}</div>
      <div className="flex flex-col gap-2">
        {students.map((student) => {
          return <Answer student={student} question={question} />;
        })}
      </div>
    </div>
  );
};

export default Question;
