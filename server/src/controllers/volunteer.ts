import express from 'express';
import _ from 'lodash';
import { body, param } from 'express-validator';
import jwt from 'express-jwt';
import { QueryOptions, VolunteerData } from '../types';
import {
  addNewVolunteer, deleteVolunteer, getAllVolunteers, getVolunteer, updateVolunteerDetails,
} from '../services/volunteer';
import { accessTokenSecret } from '../helpers/auth';

import HTTP_CODES from '../constants/httpCodes';
import VALIDATOR from '../helpers/validation';

export type VolunteerValidatorMethod = 'createVolunteer' | 'getVolunteer' | 'deleteVolunteer' | 'updateVolunteer'

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
const getValidations = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [
        // Login details
        VALIDATOR.email(true),
        VALIDATOR.password,

        // Personal details
        VALIDATOR.name,
        VALIDATOR.address,
        VALIDATOR.mobile,
        VALIDATOR.birthday,
        VALIDATOR.socialMediaPlatform,
        VALIDATOR.gender,
        VALIDATOR.citizenship,
        VALIDATOR.race,
        VALIDATOR.organization,
        VALIDATOR.position,
        VALIDATOR.volunteerType,

        // Boolean responses
        VALIDATOR.hasVolunteered,
        VALIDATOR.hasChildrenExperience,
        VALIDATOR.hasExternalVolunteerExperience,
        VALIDATOR.hasFirstAidCertification,

        // Enum responses
        VALIDATOR.leadershipInterest,
        VALIDATOR.description,
        VALIDATOR.interests,
        VALIDATOR.personalityType,
        VALIDATOR.skills,

        // Volunteering related
        VALIDATOR.volunteerReason, // Categorize answers
        VALIDATOR.volunteerFrequency, // Frequency per month
        VALIDATOR.volunteerContribution,

        // Remarks
        VALIDATOR.volunteerRemark,
      ];
    }
    case 'getVolunteer': {
      return [
        param('email').isEmail(),
      ];
    }
    case 'deleteVolunteer': {
      return [
        body('email').isEmail(),
      ];
    }
    case 'updateVolunteer': {
      return [
        VALIDATOR.email(false),
        VALIDATOR.password.optional(),
        VALIDATOR.name.optional(),
        VALIDATOR.address.optional(),
        VALIDATOR.mobile.optional(),

        VALIDATOR.socialMediaPlatform.optional(),
        VALIDATOR.organization.optional(),
        VALIDATOR.position.optional(),
        VALIDATOR.leadershipInterest.optional(),
        VALIDATOR.volunteerType.optional(),

        VALIDATOR.description.optional(),
        VALIDATOR.interests.optional(),
        VALIDATOR.personalityType.optional(),
        VALIDATOR.skills.optional(),
        VALIDATOR.administratorRemarks.optional(),
      ];
    }
    default:
      return [];
  }
};

const createNewVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    await addNewVolunteer(req.body as VolunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

const getVolunteerDetails = async (req: express.Request, res: express.Response) => {
  try {
    const volunteerDetails = await getVolunteer(req.params.email);
    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const getAllVolunteerDetails = async (req: express.Request, res: express.Response) => {
  try {
    // handles both searching volunteers and returning all volunteers

    const pageNo = Number(req.query.pageNo);
    const size = Number(req.query.size);
    const query: QueryOptions = { skip: 0, limit: 0 };
    if (pageNo < 0) {
      throw new Error('Invalid page number, should start with 0');
    }
    query.skip = size * pageNo;
    query.limit = size;

    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.volunteerType) {
      query.volunteerType = (req.query.volunteerType as string).split(',');
    }
    const volunteersDetails = await getAllVolunteers(query);
    res.status(HTTP_CODES.OK).json(volunteersDetails);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const checkUpdateRights = () => [
  jwt({ secret: accessTokenSecret, algorithms: ['HS256'] }),

  (req, res, next) => {
    if (req.body.administratorRemarks && req.user.role != 'admin') {
      return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

    next();
  },
];

const updateVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    await updateVolunteerDetails(req.body.email as string, req.body as Partial<VolunteerData>);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const removeVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    await deleteVolunteer(email);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

export default {
  getValidations,
  createNewVolunteer,
  getVolunteerDetails,
  getAllVolunteerDetails,
  removeVolunteer,
  checkUpdateRights,
  updateVolunteer,
};
