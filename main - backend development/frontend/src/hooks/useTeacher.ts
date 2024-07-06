import { Subject, Teacher } from "@types";
import { useEffect, useState } from "react";
import { useAccount } from "./useAccount";
import { useBackend } from "./useBackend";

export const useTeacher = () => {
  const { account } = useAccount();
  const { teacher: teacherService } = useBackend();

  const [isLoading, setIsLoading] = useState(true);

  const [teacher, setTeacher] = useState<Teacher>();
  const [subjects, setSubjects] = useState(new Array<Subject>());

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!account || account.role !== "TEACHER") {
        setTeacher(undefined);

        setIsLoading(false);
        return;
      }

      const teacher = await teacherService.getByUserId(account.id);

      setTeacher(teacher);

      if (!teacher) {
        setSubjects([]);
        setIsLoading(false);
        return;
      }

      const subjects = await teacherService.getSubjects(teacher.id);

      setSubjects(subjects);

      // console.log({ subjects });

      setIsLoading(false);
    })();
  }, [account, teacherService]);

  return { isLoading, teacher, subjects };
};
