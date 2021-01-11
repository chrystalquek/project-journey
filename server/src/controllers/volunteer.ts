import express from 'express';
import _ from 'lodash';
import { body, param } from 'express-validator';
import jwt from 'express-jwt';
import { QueryParams, VolunteerData } from '../types';
import volunteerService from '../services/volunteer';
import commitmentApplicationService from '../services/commitmentApplication';
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
        VALIDATOR.nickname,
        VALIDATOR.gender,
        VALIDATOR.citizenship,
        VALIDATOR.birthday,
        VALIDATOR.address,
        VALIDATOR.mobileNumber,

        VALIDATOR.socialMediaPlatform,
        VALIDATOR.instagramHandle,

        VALIDATOR.organization,
        VALIDATOR.position,
        VALIDATOR.race,

        VALIDATOR.referralSources,
        VALIDATOR.languages,

        VALIDATOR.volunteerType,

        // Boolean responses
        VALIDATOR.hasVolunteered,
        VALIDATOR.biabVolunteeringDuration,

        VALIDATOR.hasChildrenExperience,
        VALIDATOR.childrenExperience,

        VALIDATOR.hasVolunteeredExternally,
        VALIDATOR.volunteeringExperience,

        VALIDATOR.hasFirstAidCertification,

        // Enum responses
        VALIDATOR.leadershipInterest,
        VALIDATOR.description,
        VALIDATOR.interests,
        VALIDATOR.personality,
        VALIDATOR.skills,
        VALIDATOR.strengths,
        VALIDATOR.volunteeringOpportunityInterest,

        // Volunteering related
        VALIDATOR.volunteerReason, // Categorize answers
        VALIDATOR.volunteerFrequency, // Frequency per month
        VALIDATOR.volunteerContribution,

        // Medical Information
        VALIDATOR.hasMedicalNeeds,
        VALIDATOR.medicalNeeds,
        VALIDATOR.hasAllergies,
        VALIDATOR.allergies,
        VALIDATOR.hasMedicationDuringDay,

        // Emergency Contact
        VALIDATOR.emergencyContactEmail,
        VALIDATOR.emergencyContactName,
        VALIDATOR.emergencyContactNumber,
        VALIDATOR.emergencyContactRelationship,

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
        VALIDATOR.mobileNumber.optional(),

        VALIDATOR.socialMediaPlatform.optional(),
        VALIDATOR.organization.optional(),
        VALIDATOR.position.optional(),
        VALIDATOR.leadershipInterest.optional(),
        VALIDATOR.volunteerType.optional(),

        VALIDATOR.interests.optional(),
        VALIDATOR.personality.optional(),
        VALIDATOR.skills.optional(),
        VALIDATOR.adminRemarks.optional(),
        VALIDATOR.volunteerRemark.optional(),
      ];
    }
    default:
      return [];
  }
};

const createNewVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    await volunteerService.addNewVolunteer(req.body as VolunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

const getVolunteerDetails = async (req: express.Request, res: express.Response) => {
  try {
    const volunteerDetails = await volunteerService.getVolunteer(req.params.email);
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
    const query: QueryParams = { skip: 0, limit: 0 };
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
    const volunteersDetails = await volunteerService.getAllVolunteers(query);
    res.status(HTTP_CODES.OK).json(volunteersDetails);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

/**
 * Retrieves sign ups that are pending approval
 * @return number of pending sign ups
 */
const getPendingVolunteers = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const pendingCommitmentApplications = await commitmentApplicationService
      .readCommitmentApplications('pending');

    const pendingVolunteersIds = pendingCommitmentApplications
      .map((commitmentApplication) => commitmentApplication.volunteerId);

    const pendingVolunteers = await volunteerService.readVolunteersByIds(pendingVolunteersIds);

    res.status(HTTP_CODES.OK).json({ data: pendingVolunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readVolunteersByIds = async (req, res) => {
  try {
    const volunteers = await volunteerService.readVolunteersByIds(req.body.ids);
    res.status(HTTP_CODES.OK).json({ data: volunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};
const checkUpdateRights = () => [
  jwt({ secret: accessTokenSecret, algorithms: ['HS256'] }),

  (req, res, next) => {
    if (req.body.adminRemarks && req.user.volunteeerType != 'admin') {
      return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

    next();
  },
];

const updateVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    await volunteerService.updateVolunteerDetails(
      req.body.email as string, req.body as Partial<VolunteerData>,
    );
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
    await volunteerService.deleteVolunteer(email);
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
  getPendingVolunteers,
  removeVolunteer,
  checkUpdateRights,
  updateVolunteer,
  readVolunteersByIds,
};
