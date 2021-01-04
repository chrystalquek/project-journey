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
    const imageUrl = await imageService.getImage(req.params.email)
    res.status(HTTP_CODES.OK).json({
      imageUrl: imageUrl
    });
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
