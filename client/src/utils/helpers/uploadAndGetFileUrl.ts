import { FileType } from "@api/request";
import { uploadFile } from "@redux/actions/file";
import { store } from "@redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { UploadFileResponse } from "../../api/response";

export const uploadAndGetFileUrl = async (
  file: File,
  fileType: FileType
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const fileUploadResponse: UploadFileResponse = unwrapResult(
    await store.dispatch(uploadFile({ formData, fileType }))
  );

  if (!fileUploadResponse?.url) {
    throw new Error("File upload failed.");
  }

  return fileUploadResponse.url;
};
