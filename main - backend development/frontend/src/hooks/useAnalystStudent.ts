import { Student, Subject } from "@types";
import { useEffect, useState } from "react";
import { useBackend } from "./useBackend";

export const useAnalystStudent = (_student: Student) => {
  const { student: studentService } = useBackend();

  const [isLoading, setIsLoading] = useState(true);

  const [student, setStudent] = useState<Student>();
  const [subjects, setSubjects] = useState(new Array<Subject>());

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const student = await studentService.get(_student.id);

      setStudent(student);

      // console.log({ student }, _student.id);
      if (!student) {
        setSubjects([]);
        setIsLoading(false);
        return;
      }

      const subjects = await studentService.getSubjects(student.id);

      setSubjects(subjects);

      setIsLoading(false);
    })();
  }, [_student, studentService]);

  return { isLoading, student, subjects };
};
