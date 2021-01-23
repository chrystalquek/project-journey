import express from 'express';
import { ImageData, ImageResponse } from '../types';
import imageService from '../services/image';

import HTTP_CODES from '../constants/httpCodes';

const uploadImage = async (req, res: express.Response) => {
  try {
    const imageData: ImageData = {
      email: req.body.email,
      imageName: req.file.filename,
    };
    const response = await imageService.uploadImage(imageData);
    res.status(HTTP_CODES.OK).json(response);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error);
  }
};

const getImageWithEmail = async (req: express.Request, res: express.Response) => {
  try {
    // if (typeof req.query.email !== 'string') {
    //   throw new Error("Email field is not string");
    // }
    const { email } = req.params;
    const imageResponse: ImageResponse = await imageService.getImage(email);
    res.status(HTTP_CODES.OK).json(imageResponse);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error);
  }
};

const deleteImageWithEmail = async (req: express.Request, res: express.Response) => {
  try {
    // if (typeof req.query.email !== 'string') {
    //   throw new Error("Email field is not string");
    // }
    const { email } = req.params;
    const response = await imageService.deleteImage(email);
    res.status(HTTP_CODES.OK).json(response);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error);
  }
};

export default {
  getImageWithEmail,
  uploadImage,
  deleteImageWithEmail,
};
