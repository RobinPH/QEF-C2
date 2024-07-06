import { AnswerModel, QuestionModel } from "@database/model";
import { entityExistsMiddleware } from "@middlewares/entityExists";
import { isUserStudentMiddleware } from "@middlewares/isUserStudent";
import { use } from "@middlewares/middleware";
import { createErrorResponse, createResponse } from "@utils";
import { Router } from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

const question = Router();

question.post(
  "/submit-answer/:id",
  validateRequestBody(
    z.object({
      answer: z.string(),
    })
  ),
  use(entityExistsMiddleware(QuestionModel, "id"), isUserStudentMiddleware()),
  async (req, res) => {
    const { student, question } = res.locals;

    if (await AnswerModel.getStudentAnswerAtQuestion(student.id, question.id)) {
      return res.status(400).json(createErrorResponse("Already answered"));
    }

    const answer = await AnswerModel.create(
      student.id,
      question.id,
      req.body.answer
    );

    res.json(
      createResponse({
        answer,
      })
    );
  }
);

export default question;
