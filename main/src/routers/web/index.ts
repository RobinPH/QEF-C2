import { Request, Response, Router } from "express";
import path from "node:path";
import { FRONTEND_DIST_PATH, IS_PRODUCTION } from "../../constants";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (IS_PRODUCTION) {
    res.sendFile(path.join(FRONTEND_DIST_PATH, "index.html"));
  } else {
    res.redirect("http://localhost:5173");
  }
});

export default router;
