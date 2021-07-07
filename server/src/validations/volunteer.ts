import { body, param, query } from 'express-validator';
import {
  newEmailValidator, existingEmailValidator, passwordValidator, regexValidator, stringEnumValidator,
} from './global';
import {
  CITIZENSHIP,
  GENDER,
  LEADERSHIP_INTEREST,
  RACE,
  SOCIAL_MEDIA_PLATFORM,
  VOLUNTEER_TYPE,
  PERSONALITY_TYPES_REGEX,
} from '../models/Volunteer';

type VolunteerValidatorMethod =
  | 'createVolunteer'
  | 'getVolunteer'
  | 'deleteVolunteer'
  | 'updateVolunteer'
  | 'getVolunteers';

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */

const name = body('name', 'name is not a string').isString();
const address = body('address', 'address is not a string').isString();
const nickname = body('nickname', 'nickname is not a string').isString().optional({ checkFalsy: true });
const mobileNumber = body('mobileNumber', 'mobile number is not from SG').isString().isMobilePhone('en-SG');
const birthday = body('birthday', 'birthday is not a date').isISO8601().toDate();
const socialMediaPlatform = body('socialMediaPlatform', 'social media platform is not valid')
  .isString()
  .custom((socialMedia: string) => stringEnumValidator(
    SOCIAL_MEDIA_PLATFORM,
    'Social Media Platform',
    socialMedia,
  ));
const instagramHandle = body('instagramHandle', 'instagram handle is not a string').isString().optional();
const gender = body('gender', 'gender is not valid').custom((genderText: string) => stringEnumValidator(GENDER, 'Gender', genderText));
const citizenship = body('citizenship', 'citizenship is not valid').custom((citizenshipType: string) => stringEnumValidator(CITIZENSHIP, 'Citizenship', citizenshipType));
const race = body('race', 'race is not valid')
  .custom((raceType: string) => stringEnumValidator(RACE, 'Race', raceType))
  .optional();
const organization = body('organization', 'organization is not a string').isString().optional();
const position = body('position', 'position is not a string').isString().optional();

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
    LEADERSHIP_INTEREST,
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
const volunteeringSessionsCount = body('volunteeringSessionsCount').isInt();
const workshopsCount = body('workshopsCount').isInt();
const hangoutsCount = body('hangoutsCount').isInt();
const sessionsPerMonth = body('sessionsPerMonth').isInt().optional();
const sessionPreference = body('sessionPreference').isString().optional();

const getValidations = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case 'createVolunteer': {
      return [
        // Login details
        newEmailValidator,
        passwordValidator,
        // Personal details
        body('name', 'name is required').exists(),
        name,
        nickname,
        body('gender', 'gender is required').exists(),
        gender,
        body('citizenship', 'citizenship is required').exists(),
        citizenship,
        birthday,
        address,
        body('mobileNumber', 'mobile number is required').exists(),
        mobileNumber,
        body('socialMediaPlatform', 'social media platform is required').exists(),
        socialMediaPlatform,
        instagramHandle,
        organization,
        position,
        race,
        referralSources,
        languages,
        body('volunteerType', 'volunteer type is required').exists(),
        volunteerType,
        // Boolean responses
        body('hasVolunteered', 'existance of past volunteer experience is required').exists(),
        hasVolunteered,
        biabVolunteeringDuration,
        body('hasChildrenExperience', 'existance of past volunteer experience with children is required').exists(),
        hasChildrenExperience,
        childrenExperience,
        body('hasVolunteeredExternally', 'existance of past external volunteer experience is required').exists(),
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
        volunteeringSessionsCount,
        workshopsCount,
        hangoutsCount,
        sessionsPerMonth,
        sessionPreference,

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
    case 'getVolunteers': {
      return [
        query(['pageNo', 'size']).isInt({ min: 0 }).optional(),
        query(['name', 'sort']).isString().optional(),
        query('volunteerType').isArray().custom((volTypes: string[]) => volTypes.every((volType: string) => stringEnumValidator(VOLUNTEER_TYPE, 'volunteer type', volType))).optional()
      ]
    }
    case 'deleteVolunteer': {
      return [body('email').isEmail()];
    }
    case 'updateVolunteer': {
      return [
        existingEmailValidator(),
        passwordValidator.optional(),
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
