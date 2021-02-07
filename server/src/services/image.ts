import { Storage } from '@google-cloud/storage';
import { ImageData, ImageResponse } from '../types';
import Image from '../models/Image';

const storage = new Storage();

const uploadImage = async (imageData: ImageData): Promise<ImageResponse> => {
  try {
    const filepath = `/tmp/${imageData.imageName}`;
    const returnVal = await storage.bucket('journey-storage').upload(filepath, {
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    try {
      const url = returnVal[1].mediaLink;

      const imageResponse: ImageResponse = {
        email: imageData.email,
        imageName: imageData.imageName,
        url,
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
