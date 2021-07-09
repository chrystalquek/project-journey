import express from "express";
import eventRouter from "./event";
import userRouter from "./user";
import volunteerRouter from "./volunteer";
import signUpRouter from "./signUp";
import formRouter from "./form";
import commitmentApplicationRouter from "./commitmentApplication";
import fileRouter from "./file";
import emailRouter from "./email";

const router = express.Router();

router.use("/event", eventRouter);
router.use("/signup", signUpRouter);
router.use("/user", userRouter);
router.use("/volunteer", volunteerRouter);
router.use("/form", formRouter);
router.use("/commitment-application", commitmentApplicationRouter);
router.use("/file", fileRouter);
router.use("/email", emailRouter);

export default router;
