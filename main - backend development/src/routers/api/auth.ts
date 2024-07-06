import { StudentModel, UserModel } from "@database/model";
import { UserRole } from "@prisma/client";
import { createErrorResponse, createResponse } from "@utils";
import { Router } from "express";
import { z } from "zod";
import { validateRequestBody } from "zod-express-middleware";

const auth = Router();

auth.post(
  "/login",
  validateRequestBody(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  ),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.authenticate(email, password);

    if (!user) {
      res.json(createErrorResponse("Invalid email and/or password"));

      return;
    }

    if (user.token === null) {
      res.json(createErrorResponse("Failed to create token"));

      return;
    }

    res.json(
      createResponse({
        token: user.token,
      })
    );
  }
);

auth.post(
  "/register",
  validateRequestBody(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })
  ),
  async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserModel.register(
      name,
      email,
      password,
      UserRole.STUDENT
    );

    if (!user) {
      res.status(500).json(createErrorResponse("Something went wrong"));

      return;
    }

    const student = await StudentModel.create(user);

    res.json(
      createResponse({
        token: user.token,
      })
    );
  }
);

export default auth;
