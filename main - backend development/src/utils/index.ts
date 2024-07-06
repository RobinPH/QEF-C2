import { RequestHandler } from "express";

export const createResponse = <Payload extends Record<string, any>>(
  payload: Payload
) => {
  return {
    success: true,
    payload,
  };
};

export const createErrorResponse = (message: string) => {
  return {
    success: false,
    error: message,
  };
};

export function combine<
  Locals2 extends Record<string, any>,
  P2,
  ResBody2,
  ReqBody2,
  ReqQuery2,
  P1,
  ResBody1,
  ReqBody1,
  ReqQuery1,
  Locals1 extends Record<string, any>,
  Args extends any[]
>(
  priorMiddleware: RequestHandler<P1, ResBody1, ReqBody1, ReqQuery1, Locals1>,
  middleware: (
    ...args: Args
  ) => RequestHandler<
    P1 & P2,
    ResBody1 & ResBody2,
    ReqBody1 & ReqBody2,
    ReqQuery1 & ReqQuery2,
    Locals1 & Locals2
  >
): (
  ...args: Args
) => RequestHandler<
  P1 & P2,
  ResBody1 & ResBody2,
  ReqBody1 & ReqBody2,
  ReqQuery1 & ReqQuery2,
  Locals1 & Locals2
> {
  return (...args) => {
    return async (req, res, next) => {
      // @ts-ignore
      priorMiddleware(req, res, function (err) {
        if (err) return next(err);

        middleware(...args)(req, res, next);
      });
    };
  };
}
