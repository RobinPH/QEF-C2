import { useSubject } from "@hooks/useSubjects";
import { Student as StudentType, Subject as SubjectType } from "@types";
import React from "react";
import Question from "./Question";

const Subject: React.FC<{ student: StudentType; subject: SubjectType }> = ({
  student,
  subject,
}) => {
  const { questions } = useSubject(subject);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="flex">
        <span className="font-bold">{subject.code}</span>
        <div className="m-0 divider divider-horizontal" />
        <span>{subject.name}</span>
      </div>
      <div className="m-0 divider" />
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Questions</div>
        <div className="flex flex-col gap-2">
          {questions.map((question) => {
            return <Question student={student} question={question} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Subject;
