import express from 'express';
import imageService from '../services/image';
import { ImageData } from '../types';

import HTTP_CODES from '../constants/httpCodes';

const uploadImage = async (req, res: express.Response) => {
  try {
    await imageService.uploadImage(req);
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
