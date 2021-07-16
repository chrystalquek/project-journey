import { Response } from "./common";

export type UploadedFileInfo = {
  url: string;
};
export type UploadFileResponse = Response<UploadedFileInfo>;
