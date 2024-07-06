import type { Backend } from "../Backend";

export class Service {
  backend: Backend;

  constructor(backend: Backend) {
    this.backend = backend;
  }
}
