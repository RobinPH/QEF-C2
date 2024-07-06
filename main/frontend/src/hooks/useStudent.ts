import { Student, Subject } from "@types";
import { useEffect, useState } from "react";
import { useAccount } from "./useAccount";
import { useBackend } from "./useBackend";

export const useStudent = () => {
  const { account } = useAccount();
  const { student: studentService } = useBackend();

  const [isLoading, setIsLoading] = useState(true);

  const [student, setStudent] = useState<Student>();
  const [subjects, setSubjects] = useState(new Array<Subject>());

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!account || account.role !== "STUDENT") {
        setStudent(undefined);

        setIsLoading(false);
        return;
      }

      const student = await studentService.getByUserId(account.id);

      setStudent(student);

      if (!student) {
        setSubjects([]);
        setIsLoading(false);
        return;
      }

      const subjects = await studentService.getSubjects(student.id);

      setSubjects(subjects);

      // console.log({ subjects });

      setIsLoading(false);
    })();
  }, [account, studentService]);

  return { isLoading, student, subjects };
};
