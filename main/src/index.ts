import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { FRONTEND_DIST_PATH, IS_PRODUCTION, PORT } from "./constants";
import { apiRouter, webRouter } from "./routers";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (IS_PRODUCTION) {
  app.use(express.static(FRONTEND_DIST_PATH));
}

app.use("/", webRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
