import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";
import { UploadedFileInfo } from "../types/response/file";

const storage = new Storage();

const ROOT_BUCKET = storage.bucket("journey-storage");

const uploadSingleFile = async (
  file: Express.Multer.File
): Promise<UploadedFileInfo> => {
  try {
    const { filename, destination } = file;
    const filePath = path.join(destination, filename);

    // Upload file located at `filePath` to bucket located at `{root_bucket_path}/filename`
    const uploadResponse = await ROOT_BUCKET.upload(filePath, {
      destination: filename,
    });

    // Deletes the file after upload
    fs.unlinkSync(filePath);

    if (!uploadResponse[1]?.mediaLink) {
      throw new Error("File upload link isn't retrieved");
    }
    // Gets download link from metadata
    return { url: uploadResponse[1].mediaLink };
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  uploadSingleFile,
};
