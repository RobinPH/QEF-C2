import { useAnalystStudent } from "@hooks/useAnalystStudent";
import { useUser } from "@hooks/useUser";
import { Student as StudentType } from "@types";
import React from "react";

const Student: React.FC<{ student: StudentType }> = ({ student }) => {
  const { subjects } = useAnalystStudent(student);
  const { user } = useUser(student.userId);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <div className="flex">
        {user && <span className="font-bold">{user.name}</span>}
      </div>
      <div className="m-0 divider" />
      <div>
        <div>
          <div>This student has {subjects.length} subjects:</div>
          <div className="pl-4 text-sm font-bold">
            {subjects.map((subject) => (
              <div>
                {subject.code} - {subject.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
