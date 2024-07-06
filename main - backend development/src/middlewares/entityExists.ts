import { Model } from "@database/model/model";
import { createErrorResponse } from "@utils";
import { withParameterMiddleware } from "./withParameter";

export const entityExistsMiddleware = <
  T extends string,
  Entity extends { [key: string]: any },
  HiddenProperty extends keyof Entity,
  _Name extends string,
  EntityName extends string | undefined = _Name
>(
  model: Model<Entity, HiddenProperty, _Name>,
  key: T,
  name?: EntityName
) => {
  return withParameterMiddleware<[T]>(key).addWithLocals<
    EntityName extends string
      ? {
          [key in EntityName]: Omit<Entity, never>;
        }
      : {}
  >(async (req, res, next) => {
    // console.log("entityExistsMiddleware");
    const id = req.params[key];

    const entity = await model.get(id);

    if (!entity) {
      return res
        .status(400)
        .send(createErrorResponse("Entity does not exists"));
    }

    const _name = name ?? model.name;

    if (_name) {
      // @ts-ignore
      res.locals[_name] = entity;
    }

    // console.log("next-entityExistsMiddleware");

    next();
  }, "entityExistsMiddleware");
};

const entityExists = <
  T extends string,
  Entity extends { [key: string]: any },
  EntityName extends string | undefined,
  HiddenProperty extends keyof Entity = ""
>(
  model: Model<Entity, HiddenProperty>,
  key: T,
  name: EntityName
) => {
  return entityExistsMiddleware(model, key, name).build();
};

export default entityExists;
