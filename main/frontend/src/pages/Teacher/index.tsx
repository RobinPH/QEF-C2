import WithRole from "@components/WithRole";
import Subject from "@components/teacher/Subject";
import { useAccount, useTeacher } from "@hooks";

const TeacherPage = WithRole(() => {
  const { account } = useAccount();
  const { teacher, subjects } = useTeacher();

  if (!account || !teacher) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 p-8 rounded-md shadow-md bg-slate-100">
      <h1 className="text-xl font-bold">
        <span>Hello, </span>
        <span>{account.name}</span>
      </h1>
      <div className="p-4 font-bold bg-white rounded-md shadow-md">
        You handle {subjects.length} subjects.
      </div>
      <div className="flex flex-col gap-4">
        {subjects.map((subject) => (
          <Subject subject={subject} />
        ))}
      </div>
    </div>
  );
}, ["TEACHER"]);

export default TeacherPage;
