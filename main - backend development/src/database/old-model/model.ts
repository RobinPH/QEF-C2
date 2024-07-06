export interface Model<T> {
  get(id: string): Promise<T | undefined> | T | undefined;
}
