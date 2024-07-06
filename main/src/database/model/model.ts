export abstract class Model<
  Entity extends { [key: string]: any },
  HiddenProperty extends keyof Entity,
  Name extends string = ""
> {
  constructor(public readonly name: Name) {}

  get(
    id: string
  ):
    | Promise<Omit<Entity, HiddenProperty> | null>
    | Omit<Entity, HiddenProperty>
    | null {
    return null;
  }

  get_unsanitized(id: string): Promise<Entity | null> | Entity | null {
    return null;
  }
}
