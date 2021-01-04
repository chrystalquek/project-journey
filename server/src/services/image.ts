import mongoose from 'mongoose';
import { ImageData, ImageResponse } from '../types';
import Image from '../models/Image';
import { Storage } from '@google-cloud/storage';

const storage = new Storage()

const uploadImage = async (imageData: ImageData): Promise<ImageResponse> => {
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
      
      await Image.deleteMany({
        email: imageData.email
      })

      const imageSchemaData = new Image({
      _id: new mongoose.Types.ObjectId(),
      email: imageData.email,
      imageName: imageData.imageName,
      url: url
    });
    
      const imageResponse: ImageResponse = {
        email: imageData.email,
        imageName: imageData.imageName,
        url: url
      };

    await imageSchemaData.save().then(created => console.info(`Created ${created}`));
    return imageResponse;
    } catch (err) {
      throw new Error(err.msg)
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

const getImage = async (email: string) => {
  const image = await Image.findOne({
    email,
  }).lean().exec();

  if (!image) {
    throw new Error(`Image with email: ${email} not found`);
  }

  console.log(JSON.stringify(image))

  const imageResponse: ImageResponse = {
    email: image.email,
    imageName: image.imageName,
    url: image.url
  };

  return imageResponse;
};

export default {
  uploadImage,
  getImage
};