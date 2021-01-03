import mongoose from 'mongoose';
import { ImageData } from '../types';
import Image from '../models/Image';
import { Storage } from '@google-cloud/storage';

const storage = new Storage()

const uploadImage = async (imageData: ImageData): Promise<void> => {
  try {
    const filepath = "./uploads/" + imageData.imageName
    const returnVal = await storage.bucket('journey-storage').upload(filepath, {
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    try {
      const url = returnVal[1].mediaLink;
      const imageSchemaData = new Image({
      _id: new mongoose.Types.ObjectId(),
      email: imageData.email,
      imageName: imageData.imageName,
      url: url
    });
    await imageSchemaData.save().then(created => console.info(`Created ${created}`));
    } catch (err) {
      throw new Error(err.msg)
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  uploadImage
};