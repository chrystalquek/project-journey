import _ from 'lodash';
import { body, validationResult, ValidationChain } from 'express-validator';
import express from 'express';
import { checkIfAccepted } from '../services/signUp';
import {
  CITIZENSHIP_TYPES, GENDER_TYPES, LEADERSHIP_INTEREST_TYPES,
  PERSONALITY_TYPES, RACE_TYPES, SOCIAL_MEDIA_PLATFORMS, VOLUNTEER_TYPE,
} from '../models/Volunteer';
import HTTP_CODES from '../constants/httpCodes';
import { doesUserEmailExist } from '../services/volunteer';
import {
  AnswerData, QuestionsOptionsRequestData, RoleData, SignUpStatus,
} from '../types';

const LENGTH_MINIMUM_PASSWORD = 8;

/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */
export const stringEnumValidator = (enumTypes: Array<string>, enumName: string, value: string) => {
  if (!_.includes(enumTypes, value)) {
    throw new Error(`${enumName}: "${value}" must be either ${enumTypes.join(', ')}`);
  }
  return true;
};

const checkIfStatusValid = (value: SignUpStatus) => {
  const isPending = value === 'pending';
  const isRejected = value === 'rejected';
  const isAccepted = checkIfAccepted(value);

  return isPending || isRejected || isAccepted;
};

export const signUpStatusValidator = (value: SignUpStatus) => {
  if (checkIfStatusValid(value)) {
    return true;
  }
  throw new Error('status must be either "pending", "rejected", or ["accepted": <acceptedRole>]');
};

export const roleCapacityValidator = (roles: Array<RoleData>) => {
  for (let i = 0; i < roles.length; i += 1) {
    const currRole = roles[i];
    if (currRole.capacity < currRole.volunteers.length) {
      return false;
    }
  }
  return true;
};

const questionValidator = (questions: Array<QuestionsOptionsRequestData>) => {
  // eslint-disable-next-line no-restricted-syntax
  questions.forEach((question) => {
    if (question.isRequired === undefined
      || question.text?.length === 0
      || question.type?.length === 0) {
      throw new Error('Question Options data is not as expected');
    }
  });
  return true;
};

const answersValidator = (answers: Array<AnswerData>) => {
  answers.forEach((answer) => {
    if (!answer.questionId || !answer.content || !answer.userId) {
      throw new Error('Answers form data is not as expected');
    }
  });

  return true;
};

const email = (emailMustBeUnique: boolean) => body('email').isEmail().normalizeEmail().custom(async (emailString: string) => {
  const isNewEmailUnique = await doesUserEmailExist(emailString);
  if (!isNewEmailUnique && emailMustBeUnique) {
    throw new Error('E-mail is already in use');
  }

  if (isNewEmailUnique && !emailMustBeUnique) {
    throw new Error(`E-mail: ${emailString} does not exist in the system`);
  }

  return true;
});

const password = body('password').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});
const newPassword = body('newPassword').isString().isLength({
  min: LENGTH_MINIMUM_PASSWORD,
});

const name = body('name').isString();

const address = body('address').isString();
const nickname = body('nickname').isString().optional();
const mobileNumber = body('mobileNumber').isString().isMobilePhone('en-SG');
const birthday = body('birthday').isISO8601().toDate();
const socialMediaPlatform = body('socialMediaPlatform').isString().custom(
  (socialMedia: string) => stringEnumValidator(SOCIAL_MEDIA_PLATFORMS, 'Social Media Platform', socialMedia),
);
const instagramHandle = body('').isString().optional();
const gender = body('gender').custom((genderText: string) => stringEnumValidator(GENDER_TYPES, 'Gender', genderText));
const citizenship = body('citizenship').custom(
  (citizenshipType: string) => stringEnumValidator(CITIZENSHIP_TYPES, 'Citizenship', citizenshipType),
);
const race = body('race').custom((raceType: string) => stringEnumValidator(RACE_TYPES, 'Race', raceType));
const organization = body('organization').isString().optional();
const position = body('position').isString().optional();
const referralSources = body('referral').isArray();

const hasVolunteered = body('hasVolunteered').isBoolean();
const biabVolunteeringDuration = body('biabVolunteeringDuration').isString().optional();

const hasChildrenExperience = body('hasChildrenExperience').isBoolean();
const childrenExperience = body('childrenExperience').isString().optional();

const hasVolunteeredExternally = body('hasVolunteeredExternally').isBoolean();
const volunteeringExperience = body('volunteeringExperience').isString().optional();

const sessionsPerMonth = body('sessionsPerMonth').isInt().optional();
const sessionPreference = body('sessionPreference').isString().optional();

const hasFirstAidCertification = body('hasFirstAidCertification').isBoolean().optional();

const leadershipInterest = body('leadershipInterest').isString().custom(
  (leadershipInterestType: string) => stringEnumValidator(
    LEADERSHIP_INTEREST_TYPES, 'Leadership Interest', leadershipInterestType,
  ),
).optional();

const description = body('description').isString();
const interests = body('interests').isString().optional();
const personality = body('personality').isString().custom(
  (personalityType: string) => stringEnumValidator(PERSONALITY_TYPES, 'Personality', personalityType),
).optional();
const strengths = body('strengths').isArray().optional();
const languages = body('languages').isArray();
const skills = body('skills').isArray().optional();

const volunteerReason = body('volunteerReason').isString();
const volunteerFrequency = body('volunteerFrequency').isNumeric();
const volunteerContribution = body('volunteerContribution').isString().optional();
const volunteerType = body('volunteerType').isString().custom(
  (type: string) => stringEnumValidator(VOLUNTEER_TYPE, 'Volunteer Type', type),
);
const volunteeringOpportunityInterest = body('volunteeringOpportunityInterest').isString().optional();

// Medical Information
const hasMedicalNeeds = body('hasMedicalNeeds').isBoolean();
const medicalNeeds = body('medicalNeeds').isString().optional();
const hasAllergies = body('hasAllergies').isBoolean();
const allergies = body('allergies').isString().optional();
const hasMedicationDuringDay = body('hasMedicationDuringDay').isBoolean();

// Emergency contact
const emergencyContactName = body('emergencyContactName').isString();
const emergencyContactNumber = body('emergencyContactNumber').isString();
const emergencyContactEmail = body('emergencyContactEmail').isString();
const emergencyContactRelationship = body('emergencyContactRelationship').isString();

const volunteerRemarks = body('volunteerRemarks').isString();
const administratorRemarks = body('administratorRemarks').isString();

const volunteeringSessionsCount = body('volunteeringSessionsCount').isInt();
const workshopsCount = body('workshopsCount').isInt();
const hangoutsCount = body('hangoutsCount').isInt();

const pastEventIds = body('pastEventIds').isArray()

export const validate = (validations: ValidationChain[]) => async (
  req: express.Request, res: express.Response, next: Function) => {
  await Promise.all(validations.map((validation: ValidationChain) => validation.run(req)));

  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({ errors: validationErrors.array() });
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
  pastEventIds
};
