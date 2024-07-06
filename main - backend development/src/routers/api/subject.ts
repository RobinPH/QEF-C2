import { SubjectModel } from "@database/model";
import { use } from "@middlewares/middleware";
import { withRoleMiddleware } from "@middlewares/withRole";
import { createResponse } from "@utils";
import { Router } from "express";

const subject = Router();

subject.get(
  "/all",
  use(withRoleMiddleware("ANALYST", "ADMIN")),
  async (req, res) => {
    res.json(
      createResponse({
        subjects: await SubjectModel.all(),
      })
    );
  }
);

subject.get("/:id", async (req, res) => {
  res.json(
    createResponse({
      subject: await SubjectModel.get(req.params.id),
    })
  );
});

subject.get(
  "/:id/students",
  use(withRoleMiddleware("TEACHER", "ANALYST", "ADMIN")),
  async (req, res) => {
    res.json(
      createResponse({
        students: await SubjectModel.getStudents(req.params.id),
      })
    );
  }
);

subject.get("/:id/questions", async (req, res) => {
  res.json(
    createResponse({
      questions: await SubjectModel.getQuestions(req.params.id),
    })
  );
});

export default subject;
