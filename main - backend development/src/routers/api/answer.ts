import { AnswerModel } from "@database/model";
import { entityExistsMiddleware } from "@middlewares/entityExists";
import { use } from "@middlewares/middleware";
import { withRoleMiddleware } from "@middlewares/withRole";
import { createResponse } from "@utils";
import { Router } from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

const answer = Router();

answer.get("/:studentId/:questionId/", async (req, res) => {
  res.json(
    createResponse({
      answer: await AnswerModel.getStudentAnswerAtQuestion(
        req.params.studentId,
        req.params.questionId
      ),
    })
  );
});

answer.route("/submit-grade/:id").post(
  validateRequestBody(
    z.object({
      grade: z.number(),
    })
  ),
  use(entityExistsMiddleware(AnswerModel, "id"), withRoleMiddleware("TEACHER")),
  async (req, res) => {
    res.json(
      createResponse({
        answer: await AnswerModel.submitGrade(
          res.locals.answer.id,
          req.body.grade
        ),
      })
    );
  }
);

export default answer;
