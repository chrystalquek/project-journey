import mongoose from 'mongoose';
import { ImageData } from '../types';
import Image from '../models/Image';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: "/Users/akhilvuputuri/journey/server/journey-288113-eab6b12d2e1b.json",
  projectId: "journey-288113"
})

const uploadImage = async (req): Promise<void> => {
  try {
    // 1. Upload to GCS Bucket
    console.log("Path is " + "./uploads/" + req.file.filename);
    console.log("Current dir is" + __dirname);
    const filepath = "./uploads/" + req.file.filename
    await storage.bucket('journey-storage').upload(filepath, {
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },

      // 2. Save image address in bucket in MongoDB
    });
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  uploadImage
};