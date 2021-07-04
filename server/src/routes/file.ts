import express from "express";
import fileController from "../controllers/file";
import { uploadFile } from "../utils/setUpFileUpload";

const router = express.Router();

router.post(
  "/image",
  uploadFile("image").single("file"), // accepts a single file with the name `fieldname`, stored in `req.file`
  fileController.uploadSingleFile
);

router.post(
  "/video",
  uploadFile("video").single("file"),
  fileController.uploadSingleFile
);

router.post(
  "/application",
  uploadFile("application").single("file"),
  fileController.uploadSingleFile
);
export default router;
