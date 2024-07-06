import dotenv from "dotenv";

import path from "node:path";

dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const FRONTEND_DIST_PATH = path.join(__dirname, "../frontend", "dist");
export const PORT = process.env.PORT || 3000;
