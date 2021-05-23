import { body, param } from 'express-validator';
import { password, regexValidator, stringEnumValidator } from './global';
import {
  CITIZENSHIP_TYPES,
  GENDER_TYPES,
  LEADERSHIP_INTEREST_TYPES,
  RACE_TYPES,
  SOCIAL_MEDIA_PLATFORMS,
  VOLUNTEER_TYPE,
  PERSONALITY_TYPES_REGEX,
} from '../models/Volunteer';

type VolunteerValidatorMethod =
  | 'createVolunteer'
  | 'getVolunteer'
  | 'deleteVolunteer'
  | 'updateVolunteer';

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
const name = body('name').isString();
const address = body('address').isString();
const nickname = body('nickname').isString().optional();
const mobileNumber = body('mobileNumber').isString().isMobilePhone('en-SG');
const birthday = body('birthday').isISO8601().toDate();
const socialMediaPlatform = body('socialMediaPlatform')
  .isString()
  .custom((socialMedia: string) => stringEnumValidator(
    SOCIAL_MEDIA_PLATFORMS,
    'Social Media Platform',
    socialMedia,
  ));
const instagramHandle = body('instagramHandle').isString().optional();
const gender = body('gender').custom((genderText: string) => stringEnumValidator(GENDER_TYPES, 'Gender', genderText));
const citizenship = body('citizenship').custom((citizenshipType: string) => stringEnumValidator(CITIZENSHIP_TYPES, 'Citizenship', citizenshipType));
const race = body('race')
  .custom((raceType: string) => stringEnumValidator(RACE_TYPES, 'Race', raceType))
  .optional();
const organization = body('organization').isString().optional();
const position = body('position').isString().optional();

const hasVolunteered = body('hasVolunteered').isBoolean();
const biabVolunteeringDuration = body('biabVolunteeringDuration')
  .isNumeric()
  .optional();

const hasChildrenExperience = body('hasChildrenExperience')
  .isBoolean()
  .optional();
const childrenExperience = body('childrenExperience').isString().optional();

const hasVolunteeredExternally = body('hasVolunteeredExternally')
  .isBoolean()
  .optional();
const volunteeringExperience = body('volunteeringExperience')
  .isString()
  .optional();

const hasFirstAidCertification = body('hasFirstAidCertification')
  .isBoolean()
  .optional();

const leadershipInterest = body('leadershipInterest')
  .isString()
  .custom((leadershipInterestType: string) => stringEnumValidator(
    LEADERSHIP_INTEREST_TYPES,
    'Leadership Interest',
    leadershipInterestType,
  ))
  .optional();

const description = body('description').isString().optional();
const interests = body('interests').isString().optional();
const personality = body('personality')
  .isString()
  .custom((personalityType: string) => regexValidator(PERSONALITY_TYPES_REGEX, 'Personality', personalityType))
  .optional();
const strengths = body('strengths').isArray().optional();
const languages = body('languages').isArray().optional();
const skills = body('skills').isArray().optional();

const referralSources = body('referralSources').isArray();

const volunteerReason = body('volunteerReason').isString();
const volunteerFrequency = body('volunteerFrequency').isNumeric().optional();
const volunteerContribution = body('volunteerContribution').isString().optional();
const volunteerType = body('volunteerType').isString().custom(
  (type: string) => stringEnumValidator(VOLUNTEER_TYPE, 'Volunteer Type', type),
);
const volunteeringOpportunityInterest = body('volunteeringOpportunityInterest').isString().optional();

// Medical Information
const hasMedicalNeeds = body('hasMedicalNeeds').isBoolean().optional();
const medicalNeeds = body('medicalNeeds').isString().optional();
const hasAllergies = body('hasAllergies').isBoolean().optional();
const allergies = body('allergies').isString().optional();
const hasMedicationDuringDay = body('hasMedicationDuringDay').isBoolean().optional();

// Emergency contact
const emergencyContactName = body('emergencyContactName').isString();
const emergencyContactNumber = body('emergencyContactNumber').isString();
const emergencyContactEmail = body('emergencyContactEmail').isString();
const emergencyContactRelationship = body(
  'emergencyContactRelationship',
).isString();

const volunteerRemarks = body('volunteerRemarks').isString();
const administratorRemarks = body('administratorRemarks').isString();

const getValidations = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [
        // Login details
        email(true),
        password,
        // Personal details
        name,
        nickname,
        gender,
        citizenship,
        birthday,
        address,
        mobileNumber,
        socialMediaPlatform,
        instagramHandle,
        organization,
        position,
        race,
        referralSources,
        languages,
        volunteerType,
        // Boolean responses
        hasVolunteered,
        biabVolunteeringDuration,
        hasChildrenExperience,
        childrenExperience,
        hasVolunteeredExternally,
        volunteeringExperience,
        hasFirstAidCertification,
        // Enum responses
        leadershipInterest,
        description,
        interests,
        personality,
        skills,
        strengths,
        volunteeringOpportunityInterest,
        // Volunteering related
        volunteerReason, // Categorize answers
        volunteerFrequency, // Frequency per month
        volunteerContribution,
        // Medical Information
        hasMedicalNeeds,
        medicalNeeds,
        hasAllergies,
        allergies,
        hasMedicationDuringDay,
        // Emergency Contact
        emergencyContactEmail,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactRelationship,

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
        email(false),
        password.optional(),
        name.optional(),
        address.optional(),
        mobileNumber.optional(),

        socialMediaPlatform.optional(),
        organization.optional(),
        position.optional(),
        leadershipInterest.optional(),
        volunteerType.optional(),

        interests.optional(),
        personality.optional(),
        skills.optional(),
        administratorRemarks.optional(),
        volunteerRemarks.optional(),
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
