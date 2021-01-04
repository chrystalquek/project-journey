import express from 'express';
import {ImageData, ImageResponse} from '../types';
import imageService from '../services/image';

import HTTP_CODES from '../constants/httpCodes';

const uploadImage = async (req, res: express.Response) => {
  try {
    const imageData: ImageData = {
      email: req.body.email,
      imageName: req.file.filename,
    }
    const imageResponse: ImageResponse = await imageService.uploadImage(imageData as ImageData);
    res.status(HTTP_CODES.OK).json(imageResponse);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

const getImage = async (req: express.Request, res: express.Response) => {
  try {
    if (typeof req.query.email !== 'string') {
      throw new Error("Email field is not string");
    }
    const email = req.query.email as string;
    const imageResponse: ImageResponse = await imageService.getImage(email)
    res.status(HTTP_CODES.OK).json(imageResponse);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

const deleteImage = async (req: express.Request, res: express.Response) => {
  try {
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

export default {
  getImage,
  uploadImage,
  deleteImage
};
