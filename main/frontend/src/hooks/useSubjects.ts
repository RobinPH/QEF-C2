import { Question, SanitizedUser, Student, Subject } from "@types";
import { useEffect, useState } from "react";
import { useAccount } from "./useAccount";
import { useBackend } from "./useBackend";

export const useSubject = (subject: Subject) => {
  const { account } = useAccount();
  const { subject: subjectService } = useBackend();

  const [questions, setQuestions] = useState(new Array<Question>());
  const [students, setStudents] = useState(
    new Array<Student & { user: SanitizedUser | null }>()
  );

  useEffect(() => {
    if (account && account.role !== "STUDENT") {
      subjectService.getStudents(subject.id).then(setStudents);
    }
  }, [account, subject, subjectService]);

  useEffect(() => {
    subjectService.getQuestions(subject.id).then(setQuestions);
  }, [subject, subjectService]);

  return { questions, students };
};
