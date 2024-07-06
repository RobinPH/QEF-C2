import { BackendContext } from "@context/backend";
import {
  AccountService,
  AnalystService,
  AnswerService,
  AuthService,
  QuestionService,
  StudentService,
  SubjectService,
  TeacherService,
  UserService,
} from "@services";
import { useContext, useMemo } from "react";

export const useBackend = () => {
  const backend = useContext(BackendContext);

  const user = useMemo(() => new UserService(backend), [backend]);
  const auth = useMemo(() => new AuthService(backend), [backend]);
  const account = useMemo(() => new AccountService(backend), [backend]);
  const student = useMemo(() => new StudentService(backend), [backend]);
  const subject = useMemo(() => new SubjectService(backend), [backend]);
  const answer = useMemo(() => new AnswerService(backend), [backend]);
  const question = useMemo(() => new QuestionService(backend), [backend]);
  const teacher = useMemo(() => new TeacherService(backend), [backend]);
  const analyst = useMemo(() => new AnalystService(backend), [backend]);

  return {
    user,
    auth,
    account,
    student,
    subject,
    answer,
    question,
    teacher,
    analyst,
  };
};
