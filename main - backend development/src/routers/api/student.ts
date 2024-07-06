import { StudentModel } from "@database/model";
import { entityExistsMiddleware } from "@middlewares/entityExists";
import { use } from "@middlewares/middleware";
import { withRoleMiddleware } from "@middlewares/withRole";
import { createResponse } from "@utils";
import { Router } from "express";

const student = Router();

student.get(
  "/all",
  use(withRoleMiddleware("ANALYST", "ADMIN")),
  async (req, res) => {
    res.json(
      createResponse({
        students: await StudentModel.all(),
      })
    );
  }
);

student
  .route("/:id")
  .get(use(entityExistsMiddleware(StudentModel, "id")), async (req, res) => {
    res.json(
      createResponse({
        student: await StudentModel.get(req.params.id),
      })
    );
  });

student
  .route("/:id/subjects")
  .get(use(entityExistsMiddleware(StudentModel, "id")), async (req, res) => {
    // console.log(res.locals.student);
    res.json(
      createResponse({
        subjects: await StudentModel.getSubjects(req.params.id),
      })
    );
  });

student.get("/user/:userId", async (req, res) => {
  const student = await StudentModel.getByUserId(req.params.userId);

  res.json(
    createResponse({
      student,
    })
  );
});

export default student;
