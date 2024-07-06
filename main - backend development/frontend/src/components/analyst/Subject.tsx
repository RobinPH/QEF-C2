import { useSubject } from "@hooks/useSubjects";
import { Subject as SubjectType } from "@types";
import React from "react";
import Question from "./Question";

const Subject: React.FC<{ subject: SubjectType }> = ({ subject }) => {
  const { questions, students } = useSubject(subject);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="flex">
        <span className="font-bold">{subject.code}</span>
        <div className="m-0 divider divider-horizontal" />
        <span>{subject.name}</span>
      </div>
      <div className="m-0 divider" />
      <div>
        <div>
          <div>This subject has {students.length} students:</div>
          <div className="pl-4 text-sm font-bold">
            {students.map((student) => (
              <div>{student.user?.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Questions</div>
        <div className="flex flex-col gap-2">
          {questions.map((question) => {
            return <Question students={students} question={question} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Subject;
