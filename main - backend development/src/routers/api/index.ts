import { Router } from "express";
import accountRouter from "./account";
import analystRouter from "./analyst";
import answerRouter from "./answer";
import authRouter from "./auth";
import questionRouter from "./question";
import studentRouter from "./student";
import subjectRouter from "./subject";
import teacherRouter from "./teacher";
import userRouter from "./user";
import usersRouter from "./users";

const router = Router();

router.use("/users", usersRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/subject", subjectRouter);
router.use("/answer", answerRouter);
router.use("/question", questionRouter);
router.use("/analyst", analystRouter);

export default router;
