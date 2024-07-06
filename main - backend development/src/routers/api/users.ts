import { UserModel } from "@database/model";
import { Router } from "express";

const users = Router();

users.get("/", async (req, res) => {
  res.json(await UserModel.all());
});

export default users;
