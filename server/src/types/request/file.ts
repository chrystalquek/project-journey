import { Request } from "./common";

type FileType = "image" | "video" | "application";

export type UploadFileRequest = Request<{
  formData: FormData;
  fileType: FileType;
}>;
