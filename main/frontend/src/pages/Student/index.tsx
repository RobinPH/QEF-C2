import IsStudent from "@components/IsStudent";
import Subject from "@components/student/Subject";
import { useAccount, useStudent } from "@hooks";

const StudentPage = IsStudent(() => {
  const { account } = useAccount();
  const { student, subjects } = useStudent();

  if (!account || !student) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 p-8 rounded-md shadow-md bg-slate-100">
      <h1 className="text-xl font-bold">
        <span>Hello, </span>
        <span>{account.name}</span>
      </h1>
      <div className="p-4 font-bold bg-white rounded-md shadow-md">
        You are enrolled to {subjects.length} subjects.
      </div>
      <div className="flex flex-col gap-4">
        {subjects.map((subject) => (
          <Subject student={student} subject={subject} />
        ))}
      </div>
    </div>
  );
});

export default StudentPage;
