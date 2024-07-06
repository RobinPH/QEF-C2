import { Answer, Question, Student } from "@types";
import { useCallback, useEffect, useState } from "react";
import { useBackend } from "./useBackend";

export const useAnswer = (student: Student, question: Question) => {
  const { answer: answerService, question: questionService } = useBackend();

  const [answer, setAnswer] = useState<Answer>();

  const submitAnswer = useCallback(
    async (answer: string) => {
      questionService.submitAnswer(question, answer).then(setAnswer);
    },
    [question, questionService]
  );

  const submitGrade = useCallback(
    async (grade: number) => {
      if (answer) {
        answerService.submitGrade(answer, grade).then(setAnswer);
      }
    },
    [answer, answerService]
  );

  useEffect(() => {
    answerService.getStudentAnswerAtQuestion(student, question).then(setAnswer);
  }, [student, question, answerService]);

  return { answer, submitAnswer, submitGrade };
};
