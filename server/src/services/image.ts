import mongoose from 'mongoose';
import { ImageData } from '../types';
import Image from '../models/Image';
import { Storage } from '@google-cloud/storage';

const storage = new Storage()

const uploadImage = async (imageData: ImageData): Promise<void> => {
  try {
    // 1. GCS Storage
    const filepath = "./uploads/" + imageData.imageName
    await storage.bucket('journey-storage').upload(filepath, {
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });

    // 2. MongoDB
    const imageSchemaData = new Image({
      _id: new mongoose.Types.ObjectId(),
      email: imageData.email,
      imageName: imageData.imageName,
    });
    await imageSchemaData.save().then(created => console.info(`Created ${created}`));
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  uploadImage
};