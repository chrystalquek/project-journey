import express from "express";
import resourceRouter from "./resource";
import volunteerRouter from "./volunteer";

const router = express.Router();

router.use("/resource/", resourceRouter);
router.use("/", volunteerRouter);

export default router;
