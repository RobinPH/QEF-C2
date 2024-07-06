import { UserModel } from "@database/model";
import { SanitizedUser } from "@types";
import { createErrorResponse } from "@utils/index";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { Middleware } from "./middleware";

export type AuthenticatedLocals = {
  user: SanitizedUser;
};

export const isAuthenticatedMiddleware = <P extends ParamsDictionary>() => {
  return new Middleware<P, any, any, Query, AuthenticatedLocals>(
    async (req, res, next) => {
      const authorization = req.headers["authorization"];

      // console.log({ authorization });

      if (!authorization) {
        return res.status(400).send(createErrorResponse("No token provided"));
      }

      const texts = authorization.split(" ");

      if (texts.length !== 2 || texts[0] !== "Bearer") {
        return res
          .status(400)
          .send(createErrorResponse("Invalid Authorization format"));
      }

      const [_, token] = texts;

      const user = await UserModel.getByToken(token);

      if (!user) {
        return res.status(400).send(createErrorResponse("Invalid token"));
      }

      res.locals.user = user;

      next();
    },
    "isAuthenticatedMiddleware"
  );
};

const isAuthenticated = () => {
  return isAuthenticatedMiddleware().build();
};

export default isAuthenticated;

// export default function isAuthenticated<
//   T extends ParamsDictionary
// >(): RequestHandler<T, any, any, Query, AuthenticatedLocals> {
//   return async (req, res, next) => {
//     const authorization = req.headers["authorization"];

//     if (!authorization) {
//       return res.status(400).send(createErrorResponse("No token provided"));
//     }

//     const texts = authorization.split(" ");

//     if (texts.length !== 2 || texts[0] !== "Bearer") {
//       return res
//         .status(400)
//         .send(createErrorResponse("Invalid Authorization format"));
//     }

//     const [_, token] = texts;

//     const user = await UserModel.getByToken(token);

//     if (!user) {
//       return res.status(400).send(createErrorResponse("Invalid token"));
//     }

//     res.locals.user = user;

//     next();
//   };
// }
