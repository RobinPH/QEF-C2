import { TeacherModel } from "@database/model";
import { entityExistsMiddleware } from "@middlewares/entityExists";
import { use } from "@middlewares/middleware";
import { createResponse } from "@utils";
import { Router } from "express";

const teacher = Router();

teacher
  .route("/:id/subjects")
  .get(use(entityExistsMiddleware(TeacherModel, "id")), async (req, res) => {
    res.json(
      createResponse({
        subjects: await TeacherModel.getSubjects(req.params.id),
      })
    );
  });

teacher.get("/user/:userId", async (req, res) => {
  const teacher = await TeacherModel.getByUserId(req.params.userId);

  res.json(
    createResponse({
      teacher,
    })
  );
});

export default teacher;
