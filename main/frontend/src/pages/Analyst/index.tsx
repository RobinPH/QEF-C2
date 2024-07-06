import WithRole from "@components/WithRole";
import Student from "@components/analyst/Student";
import Subject from "@components/analyst/Subject";
import { useAccount } from "@hooks";
import { useAnalyst } from "@hooks/useAnalyst";

const AnalystPage = WithRole(() => {
  const { account } = useAccount();
  const { analyst, students, subjects } = useAnalyst();

  if (!account || !analyst) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 p-8 rounded-md shadow-md bg-slate-100">
      <h1 className="text-xl font-bold">
        <span>Hello, </span>
        <span>{account.name}</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="p-4 font-bold bg-white rounded-md shadow-md">
            There are {students.length} students
          </div>
          <div className="flex flex-col gap-4">
            {students.map((student) => (
              <Student student={student} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 font-bold bg-white rounded-md shadow-md">
            There are {subjects.length} subjects
          </div>
          <div className="flex flex-col gap-4">
            {subjects.map((subject) => (
              <Subject subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}, ["ANALYST", "ADMIN"]);

export default AnalystPage;
