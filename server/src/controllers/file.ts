import { UploadFileRequest } from "../types/request/file";
import fileService from "../services/file";

import HTTP_CODES from "../constants/httpCodes";
import { UploadFileResponse } from "../types/response/file";

// TODO authentication not done in anticipation of changes made here
const uploadSingleFile = async (
  req: UploadFileRequest,
  res: UploadFileResponse
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: "No file uploaded" });
      return;
    }

    const response = await fileService.uploadSingleFile(req.file);
    res.status(HTTP_CODES.OK).json(response);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error.message);
  }
};

export default {
  uploadSingleFile,
};
