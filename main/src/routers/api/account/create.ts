import { StudentModel, UserModel } from "@database/model";
import { isAuthenticated, withRole } from "@middlewares";
import { UserRole } from "@prisma/client";
import { createErrorResponse, createResponse } from "@utils";
import { Router } from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

const router = Router();

const inputValidatorMiddleware = validateRequestBody(
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
);

const createHandler = (path: string, role: UserRole) => {
  router
    .route(path)
    .post(
      isAuthenticated(),
      withRole(role),
      inputValidatorMiddleware,
      async (req, res) => {
        const { name, email, password } = req.body;

        const user = await UserModel.register(name, email, password, role);

        if (!user) {
          return res
            .status(500)
            .json(createErrorResponse("Something went wrong"));
        }

        return res.json(
          createResponse({
            token: user.token,
          })
        );
      }
    );
};

createHandler("/teacher", UserRole.TEACHER);
createHandler("/analyst", UserRole.ANALYST);

router.post(
  "/student",
  isAuthenticated,
  // withRole(UserRole.STUDENT),
  inputValidatorMiddleware,
  async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name,
      email,
      password,
      role: UserRole.STUDENT,
    });

    if (!user) {
      return res.status(500).json(createErrorResponse("Something went wrong"));
    }

    const student = await StudentModel.create(user);

    return res.json(createResponse({}));
  }
);

export default router;
