import express from 'express';
import { body, param } from 'express-validator';
import volunteerService from '../services/volunteer';
import commitmentApplicationService from '../services/commitmentApplication';

import HTTP_CODES from '../constants/httpCodes';
import VALIDATOR from '../helpers/validation';
import { VolunteerData, VolunteerType, VOLUNTEER_TYPE } from '../models/Volunteer';

export type VolunteerValidatorMethod =
  | 'createVolunteer'
  | 'getVolunteer'
  | 'deleteVolunteer'
  | 'updateVolunteer';

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

      ];
    }
    case 'getVolunteer': {
      return [param('email').isEmail()];
    }
    case 'deleteVolunteer': {
      return [body('email').isEmail()];
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
        VALIDATOR.administratorRemarks.optional(),
        VALIDATOR.volunteerRemarks.optional(),
      ];
    }
    default:
      return [];
  }
};

const createNewVolunteer = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // assuming we create a few fixed admin accounts for biab, should only be able to create ad-hoc
    if (req.body.volunteerType !== 'ad-hoc') {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    await volunteerService.addNewVolunteer(req.body as VolunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

// BY EMAIL
const getVolunteerDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const volunteerDetails = await volunteerService.getVolunteer(
      req.params.email,
    );

    if (req.user._id !== volunteerDetails._id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

// BY ID
const getVolunteerDetailsById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    if (String(req.user._id) !== req.params.id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const volunteerDetails = await volunteerService.getVolunteerById(
      req.params.id,
    );
    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const getAllVolunteerDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // handles both searching volunteers and returning all volunteers

    const volunteerType = req.query.volunteerType
      ? ((req.query.volunteerType as string).split(',')).map((volType) => volType as VolunteerType)
      : VOLUNTEER_TYPE;

    const pageNo = Number(req.query.pageNo);
    const size = Number(req.query.size);
    if (pageNo < 0 || size < 0) {
      throw new Error('Invalid page number, should start with 0');
    }
    const withPagination = !Number.isNaN(pageNo) && !Number.isNaN(size);
    const skip = withPagination ? size * pageNo : 0;
    const limit = withPagination ? size : 0;

    const volunteersDetails = await volunteerService.getAllVolunteers(
      volunteerType, req.query.name as string, req.query.sort as string, skip, limit,
    );
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
      .readCommitmentApplications(
        'pending',
      );

    const pendingVolunteersIds = pendingCommitmentApplications.map(
      (commitmentApplication) => commitmentApplication.volunteerId,
    );

    const pendingVolunteers = await volunteerService.readVolunteersByIds(
      pendingVolunteersIds,
    );

    res.status(HTTP_CODES.OK).json({ data: pendingVolunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readVolunteersByIds = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { ids } = req.body;
    const volunteers = await volunteerService.readVolunteersByIds(ids);

    res.status(HTTP_CODES.OK).json({ data: volunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    const volunteerId = req.params.id;
    if (String(req.user._id) !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const savedVolunteerData = await volunteerService.updateVolunteer(
      volunteerId, req.body.updatedVolunteerData as Partial<VolunteerData>,
    );
    res.status(HTTP_CODES.OK).json(savedVolunteerData);
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
  getVolunteerDetailsById,
  getAllVolunteerDetails,
  getPendingVolunteers,
  removeVolunteer,
  updateVolunteer,
  readVolunteersByIds,
};
