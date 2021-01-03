import express from 'express';
import {ImageData} from '../types';
import imageService from '../services/image';

import HTTP_CODES from '../constants/httpCodes';

const uploadImage = async (req, res: express.Response) => {
  try {
    const imageData: ImageData = {
      email: req.body.email,
      imageName: req.file.filename,
      created_at: new Date(Date.now())
    }
    await imageService.uploadImage(imageData as ImageData);
    res.status(HTTP_CODES.OK).send();
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
  uploadImage,
  deleteImage
};
