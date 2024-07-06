import { createErrorResponse } from "@utils/index";
import { Locals, ParamsDictionary, Query } from "express-serve-static-core";
import { Middleware } from "./middleware";

export const withParameterMiddleware = <Params extends string[]>(
  ...params: Params
) => {
  return new Middleware<
    // ParamsDictionary & {
    //   [key in Params[number]]: string;
    // },
    ParamsDictionary,
    unknown,
    unknown,
    Query,
    Locals
  >(async (req, res, next) => {
    // console.log("withParameterMiddleware");
    const missing = new Array<string>();

    for (const param of params) {
      if (!(param in req.params)) {
        missing.push(param);
      }
    }

    if (missing.length > 0) {
      return res
        .status(400)
        .send(createErrorResponse(`Missing parameters: ${params.join(", ")}`));
    }

    // console.log("next-withParameterMiddleware");
    next();
  }, "withParameterMiddleware");
};

const withParameter = <Params extends string[]>(...params: Params) => {
  return withParameterMiddleware(...params).build();
};

export default withParameter;
