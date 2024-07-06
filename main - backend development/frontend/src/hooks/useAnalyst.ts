import { Analyst, SanitizedUser, Student, Subject } from "@types";
import { useEffect, useState } from "react";
import { useAccount } from "./useAccount";
import { useBackend } from "./useBackend";

export const useAnalyst = () => {
  const { account } = useAccount();
  const { analyst: analystService, student: studentService } = useBackend();

  const [isLoading, setIsLoading] = useState(true);

  const [analyst, setAnalyst] = useState<Analyst>();
  const [subjects, setSubjects] = useState(new Array<Subject>());
  const [students, setStudents] = useState(
    new Array<Student & { user: SanitizedUser | null }>()
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!account || account.role !== "ANALYST") {
        setAnalyst(undefined);

        setIsLoading(false);
        return;
      }

      const analyst = await analystService.getByUserId(account.id);

      setAnalyst(analyst);

      if (!analyst) {
        setSubjects([]);
        setIsLoading(false);
        return;
      }

      const subjects = await analystService.getSubjects();

      setSubjects(subjects);

      const students = await studentService.all();

      setStudents(students);

      setIsLoading(false);
    })();
  }, [account, analystService, studentService]);

  return { isLoading, analyst, subjects, students };
};
