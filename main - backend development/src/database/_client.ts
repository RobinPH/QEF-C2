import { Database } from "@database";
import { PrismaAdapter } from "@database/adapter";

const prismaAdapter = new PrismaAdapter();

export const db = new Database(prismaAdapter);
