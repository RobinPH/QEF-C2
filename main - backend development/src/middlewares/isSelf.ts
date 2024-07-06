import { createErrorResponse } from "@utils/index";
import { isAuthenticatedMiddleware } from "./isAuthenticated";

export const isSelfMiddleware = (key: string = "id") => {
  return isAuthenticatedMiddleware().addWithLocals<{}>(
    async (req, res, next) => {
      const { user } = res.locals;
      const id = req.params[key];

      // console.log(id, user);

      if (!user) {
        return res.status(400).send(createErrorResponse("Not logged in"));
      }

      if (id !== user.id) {
        return res.status(400).send(createErrorResponse("Unauthorized"));
      }

      next();
    },
    "isSelfMiddleware"
  );
};

const isSelf = (key: string = "id") => {
  return isSelfMiddleware(key).build();
};

export default isSelf;
