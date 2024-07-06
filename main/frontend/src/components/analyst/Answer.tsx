import { useAnswer } from "@hooks/useAnswer";
import { Question as QuestionType, SanitizedUser, Student } from "@types";
import React from "react";

const Answer: React.FC<{
  student: Student & {
    user: SanitizedUser | null;
  };
  question: QuestionType;
}> = ({ student, question }) => {
  const { answer } = useAnswer(student, question);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-md shadow-md bg-slate-50">
      <div className="font-bold">{student.user?.name}'s Answer</div>
      {answer ? (
        <div className="flex gap-4">
          <input
            className="flex items-center w-full gap-2 input input-bordered input-sm"
            value={answer.answer}
            disabled
          ></input>
          <input
            className="flex items-center w-full gap-2 input input-bordered input-sm"
            value={
              answer.grade !== null
                ? `Grade: ${answer.grade}`
                : "Not yet graded"
            }
            disabled
          ></input>
        </div>
      ) : (
        <div>No Answer yet</div>
      )}
    </div>
  );
};

export default Answer;
