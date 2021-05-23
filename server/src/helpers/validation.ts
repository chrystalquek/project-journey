import _ from 'lodash';
import { body, validationResult, ValidationChain } from 'express-validator';
import express from 'express';
import { checkIfAccepted } from '../services/signUp';
import HTTP_CODES from '../constants/httpCodes';
import {
  RoleData,
  SignUpStatus,
} from '../types';

const newPassword = body('newPassword').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

const volunteeringSessionsCount = body('volunteeringSessionsCount').isInt();
const workshopsCount = body('workshopsCount').isInt();
const hangoutsCount = body('hangoutsCount').isInt();

const pastEventIds = body('pastEventIds').isArray();

const sessionsPerMonth = body('sessionsPerMonth').isInt().optional();
const sessionPreference = body('sessionPreference').isString().optional();

export const roleCapacityValidator = (roles: Array<RoleData>) => {
  for (let i = 0; i < roles.length; i += 1) {
    const currRole = roles[i];
    if (currRole.capacity < currRole.volunteers.length) {
      return false;
    }
  }
  return true;
};

export const validate = (validations: ValidationChain[]) => async (
  req: express.Request,
  res: express.Response,
  next: Function,
  // eslint-disable-next-line consistent-return
) => {
  await Promise.all(
    validations.map((validation: ValidationChain) => validation.run(req)),
  );

  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  res
    .status(HTTP_CODES.UNPROCESSABLE_ENTITIY)
    .json({ errors: validationErrors.array() });
};

export default {
  email,
  password,
  newPassword,
  name,
  nickname,
  address,
  mobileNumber,
  instagramHandle,
  languages,
  referralSources,
  biabVolunteeringDuration,
  sessionsPerMonth,
  sessionPreference,
  hasMedicalNeeds,
  medicalNeeds,
  hasAllergies,
  allergies,
  hasMedicationDuringDay,
  emergencyContactName,
  emergencyContactNumber,
  emergencyContactEmail,
  emergencyContactRelationship,
  birthday,
  socialMediaPlatform,
  gender,
  citizenship,
  race,
  organization,
  position,
  hasVolunteered,
  hasChildrenExperience,
  hasVolunteeredExternally,
  volunteeringExperience,
  childrenExperience,
  hasFirstAidCertification,
  leadershipInterest,
  description,
  interests,
  personality,
  strengths,
  volunteeringOpportunityInterest,
  skills,
  volunteerReason,
  volunteerFrequency,
  volunteerContribution,
  volunteerType,
  volunteerRemarks,
  administratorRemarks,
  questionValidator,
  answersValidator,
  volunteeringSessionsCount,
  workshopsCount,
  hangoutsCount,
  pastEventIds,
};
