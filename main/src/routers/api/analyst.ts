import { AnalystModel } from "@database/model";
import { createResponse } from "@utils";
import { Router } from "express";

const analyst = Router();

analyst.get("/user/:userId", async (req, res) => {
  const analyst = await AnalystModel.getByUserId(req.params.userId);

  res.json(
    createResponse({
      analyst,
    })
  );
});

export default analyst;
