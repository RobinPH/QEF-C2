import { UserModel } from "@database/model";
import { isAuthenticated, isSelf, withRole } from "@middlewares";
import { entityExistsMiddleware } from "@middlewares/entityExists";
import { isSelfMiddleware } from "@middlewares/isSelf";
import { use } from "@middlewares/middleware";
import { UserRole } from "@prisma/client";
import { Router } from "express";
import { createResponse } from "src/utils";
import accountCreateRouter from "./create";

const router = Router();

router.use("/create", accountCreateRouter);

router.route("/whoami").post(isAuthenticated(), async (req, res) => {
  res.json(
    createResponse({
      user: res.locals.user,
    })
  );
});

router
  .route("/:id")
  .post(
    use(entityExistsMiddleware(UserModel, "id", "foo"), isSelfMiddleware()),
    async (req, res) => {
      res.json(
        createResponse({
          user: res.locals.user,
        })
      );
    }
  );

router.route("/:id/student").post(isSelf(), async (req, res) => {
  res.json(
    createResponse({
      user: res.locals.user,
    })
  );
});

router.route("/test").get(withRole(UserRole.ADMIN), async (req, res) => {
  res.json(createResponse({}));
});

export default router;
