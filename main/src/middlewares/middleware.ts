import { RequestHandler } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";

export class Middleware<
  P extends ParamsDictionary = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery extends Query = Query,
  Locals extends Record<string, any> = Record<string, any>
> {
  parent?: Middleware<any, any, any, any, any>;

  constructor(
    public handler: RequestHandler<
      P,
      ResBody,
      ReqBody,
      ReqQuery,
      Locals
    > = async (req, res, next) => next(),
    public name?: string
  ) {}

  next<
    P1 extends ParamsDictionary,
    ResBody1,
    ReqBody1,
    ReqQuery1 extends Query,
    Locals1 extends Record<string, any>
  >(
    middleware: Middleware<P1, ResBody1, ReqBody1, ReqQuery1, Locals1>,
    name?: string
  ) {
    let current = middleware;

    while (current.parent) {
      current = current.parent;
    }

    current.parent = this;

    return middleware as unknown as Middleware<
      P1 & P,
      ResBody1 & ResBody,
      ReqBody1 & ReqBody,
      ReqQuery1 & ReqQuery,
      Locals1 & Locals
    >;
  }

  add<P1, ResBody1, ReqBody1, ReqQuery1, Locals1 extends Record<string, any>>(
    handler: RequestHandler<
      P1 & P,
      ResBody1 & ResBody,
      ReqBody1 & ReqBody,
      ReqQuery1 & ReqQuery,
      Locals1 & Locals
    >,
    name?: string
  ) {
    const middleware = new Middleware<
      P1 & P,
      ResBody1 & ResBody,
      ReqBody1 & ReqBody,
      ReqQuery1 & ReqQuery,
      Locals1 & Locals
    >(handler, name);

    middleware.parent = this;

    return middleware;
  }

  addWithParameters<P1 extends ParamsDictionary>(
    handler: RequestHandler<P1 & P, ResBody, ReqBody, ReqQuery, Locals>,
    name?: string
  ) {
    return this.add<P1 & P, unknown, unknown, unknown, any>(handler, name);
  }

  addWithLocals<Locals1 extends Record<string, any>>(
    handler: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals1 & Locals>,
    name?: string
  ) {
    return this.add<unknown, unknown, unknown, unknown, Locals1>(handler, name);
  }

  build(): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
    const middlewares = new Array<Middleware>();
    let current: Middleware<any, any, any, any, any> | undefined = this;

    while (current) {
      middlewares.push(current);

      current = current.parent;
    }

    middlewares.reverse();

    return async (req, res, next) => {
      // for (const middleware of middlewares) {
      //   console.log(middleware);
      // }
      for (const middleware of middlewares) {
        try {
          await new Promise<void>((resolve, reject) => {
            // console.log("Running", middleware.name, middleware.parent?.name);
            middleware.handler(req, res, (error) => {
              // console.log("okay", middleware.name);
              if (error) {
                return reject(error);
              }

              resolve();
            });
          });
        } catch (err) {
          break;
        }
      }
      next();
    };
  }
}

export const use = <Middlewares extends Middleware<any, any, any, any, any>[]>(
  ...middlewares: Middlewares
) => {
  let middleware = new Middleware();

  for (let i = 0; i < middlewares.length; i++) {
    // @ts-ignore
    middleware = middleware.next(middlewares[i]);
  }

  return middleware.build() as MiddlewareToRequestHandler<
    CondenseMiddlewares<Middlewares>
  >;
};

type MiddlewareToRequestHandler<M extends any> = M extends Middleware<
  infer P,
  infer ResBody,
  infer ReqBody,
  infer ReqQuery,
  infer Locals
>
  ? RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
  : never;

type CondenseMiddlewares<T extends any[]> = T extends [
  Middleware<
    infer P,
    infer ResBody,
    infer ReqBody,
    infer ReqQuery,
    infer Locals
  >,
  ...infer Rest
]
  ? Rest extends Middleware<any, any, any, any, any>[]
    ? Middleware<
        P & CondenseP<Rest>,
        ResBody & CondenseResBody<Rest>,
        ReqBody & CondenseReqBody<Rest>,
        ReqQuery & CondenseReqQuery<Rest>,
        Locals & CondenseLocals<Rest>
      >
    : Middleware<P, ResBody, ReqBody, ReqQuery, Locals>
  : never;

type CondenseP<T extends any[]> = T extends [
  Middleware<infer P, any, any, any, any>,
  ...infer Rest
]
  ? P & CondenseP<Rest>
  : unknown;

type CondenseResBody<T extends any[]> = T extends [
  Middleware<any, infer ResBody, any, any, any>,
  ...infer Rest
]
  ? ResBody & CondenseResBody<Rest>
  : unknown;

type CondenseReqBody<T extends any[]> = T extends [
  Middleware<any, any, infer ReqBody, any, any>,
  ...infer Rest
]
  ? ReqBody & CondenseReqBody<Rest>
  : unknown;

type CondenseReqQuery<T extends any[]> = T extends [
  Middleware<any, any, any, infer ReqQuery, any>,
  ...infer Rest
]
  ? ReqQuery & CondenseReqQuery<Rest>
  : unknown;

type CondenseLocals<T extends any[]> = T extends [
  Middleware<any, any, any, any, infer Locals>,
  ...infer Rest
]
  ? Locals & CondenseLocals<Rest>
  : unknown;
