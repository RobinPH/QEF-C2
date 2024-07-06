import { UserModel } from "@database/model";
import { createResponse } from "@utils";
import { Router } from "express";

const user = Router();

user.get("/:id", async (req, res) => {
  res.json(
    createResponse({
      user: await UserModel.get(req.params.id),
    })
  );
});

export default user;
