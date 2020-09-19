import express from "express";
import resourceController from "../controllers/resource";

const router = express.Router();

router.get("/", resourceController.index);
router.post(
    "/",
    resourceController.validate("createResource"),
    resourceController.index
);

export default router;
