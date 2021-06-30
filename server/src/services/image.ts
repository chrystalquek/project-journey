import { Storage } from "@google-cloud/storage";
import mongoose from "mongoose";
import { ImageRequest } from "../controllers/image";

import Image, { ImageData } from "../models/Image";

const storage = new Storage();

const uploadImage = async (imageData: ImageRequest): Promise<ImageData> => {
  try {
    const filepath = `/tmp/${imageData.imageName}`;
    const returnVal = await storage.bucket("journey-storage").upload(filepath, {
      gzip: true,
      metadata: {
        cacheControl: "no-cache",
      },
    });
    try {
      const url = returnVal[1].mediaLink;

      // TODO change when fixing image, don't really know what's going on here
      const imageResponse: ImageData = {
        _id: mongoose.Types.ObjectId(imageData.email as string),
        email: imageData.email as string,
        imageName: imageData.imageName as string,
        url,
        createdAt: new Date(),
      };

      return imageResponse;
    } catch (err) {
      throw new Error(err.msg);
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteImage = async (email: string) => {
  await Image.deleteMany({
    email,
  });

  return `Image with email ${email} is deleted`;
};

export default {
  uploadImage,
  deleteImage,
};
