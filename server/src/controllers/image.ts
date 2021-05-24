import express from 'express';
import imageService from '../services/image';
import volunteerService from '../services/volunteer';

import HTTP_CODES from '../constants/httpCodes';
import { VolunteerData } from '../models/Volunteer';

// TODO authentication not done in anticipation of changes made here

const uploadImage = async (req, res: express.Response) => {
  try {
    const imageData: ImageRequest = {
      email: req.body.email,
      imageName: req.file.filename,
    };
    const response = await imageService.uploadImage(imageData);
    res.status(HTTP_CODES.OK).json(response);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json(error);
  }
};

const updateProfilePicture = async (req, res: express.Response) => {
  try {
    const imageData: ImageRequest = {
      email: req.body.email,
      imageName: req.file.filename,
    };
    const imageResponse = await imageService.uploadImage(imageData);
    const response = await volunteerService.updateVolunteerDetails(
      imageResponse.email as string,
      { photoUrl: imageResponse.url } as Partial<VolunteerData>,
    );
    res.status(HTTP_CODES.OK).json(response);
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

export type ImageRequest = {
  email: String,
  imageName: String
}

export default {
  uploadImage,
  updateProfilePicture,
  deleteImageWithEmail,
};
