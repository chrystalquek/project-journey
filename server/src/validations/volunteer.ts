import { body, param, query } from 'express-validator';
import {
  newEmailValidator, existingEmailValidator, passwordValidator, regexValidator, stringEnumValidator, stringArrayValidator
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
  | 'getVolunteerDetailByEmail'
  | 'deleteVolunteer'
  | 'updateVolunteer'
  | 'getVolunteers';

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
// Personal information
// Compulsory
const userId = body('userId')
  .exists().withMessage('User ID is required')
  .isString().withMessage('User ID must be a string');
const name = body('name')
  .exists().withMessage('Name is required')
  .isString().withMessage('Name must be a string');
const mobileNumber = body('mobileNumber')
  .exists().withMessage('Mobile number is required')
  .isString().withMessage('Mobile number must be a string')
  .isMobilePhone('en-SG').withMessage('Mobile number is not from SG');
const address = body('address', 'Address must be a string').isString();
const nickname = body('nickname', 'Nickname must be a string').isString();
const birthday = body('birthday', 'birthday must be a date').isISO8601();

// Organisation information
const organization = body('organization', 'Organization is not a string').isString();
const position = body('position', 'Position is not a string').isString();

// Social media information
const socialMediaPlatform = body('socialMediaPlatform')
  .exists().withMessage('Social media platform is required')
  .isString().withMessage('Social media platform must be a string')
  .custom((socialMedia: string) => stringEnumValidator(
    SOCIAL_MEDIA_PLATFORM,
    'Social Media Platform',
    socialMedia,
  )).withMessage('Social media platform is invalid');
const instagramHandle = body('instagramHandle', 'instagram handle is not a string').isString();

// Enum field
const gender = body('gender')
  .exists().withMessage('Gender is required')
  .custom((genderText: string) => stringEnumValidator(GENDER, 'Gender', genderText)).withMessage('Gender is invalid');
const citizenship = body('citizenship')
  .exists().withMessage('Citizenship is required')
  .custom((citizenshipType: string) => stringEnumValidator(CITIZENSHIP, 'Citizenship', citizenshipType)).withMessage('Citizenship is invalid');
const race = body('race', 'Race is not valid')
  .custom((raceType: string) => stringEnumValidator(RACE, 'Race', raceType));

// Volunteer experience
const hasVolunteered = body('hasVolunteered')
  .exists().withMessage('hasVolunteered is required')
  .isBoolean().withMessage('hasVolunteered must be a boolean value');
const biabVolunteeringDuration = body('biabVolunteeringDuration')
  .exists().withMessage('Past volunteer duration is required');

// External volunteering
const hasVolunteeredExternally = body('hasVolunteeredExternally')
  .exists().withMessage('hasVolunteeredExternally is required')
  .isBoolean().withMessage('hasVolunteeredExternally must be a boolean value');
const volunteeringExperience = body('volunteeringExperience', 'volunteeringExperience must be a string').isString();

// Volunteering with childrean
const hasChildrenExperience = body('hasChildrenExperience')
  .isBoolean()
  .optional();
const childrenExperience = body('childrenExperience').isString().optional();

// First Aid 
const hasFirstAidCertification = body('hasFirstAidCertification', 'hasFirstAidCertification must be a boolean value').isBoolean();

// Leadership
const leadershipInterest = body('leadershipInterest')
  .isString().withMessage('leadershipInterest must be a string')
  .custom((leadershipInterestType: string) => stringEnumValidator(
    LEADERSHIP_INTEREST,
    'Leadership Interest',
    leadershipInterestType,
  )).withMessage('leadershipInterest is invalid');

const interests = body('interests', 'interest must be a string').isString();
const personality = body('personality')
  .isString().withMessage('Personality must be a string')
  .custom((personalityType: string) => regexValidator(PERSONALITY_TYPES_REGEX, 'Personality', personalityType))
  .withMessage('Personality is invalid');
const strengths = body('strengths')
  .isArray().withMessage('strengths must be an array')
  .custom((strengths: Array<any>) => stringArrayValidator(strengths))
  .withMessage('Strengths must be an array of string');
const languages = body('languages')
  .isArray().withMessage('languages must be an array')
  .custom((languages: Array<any>) => stringArrayValidator(languages))
  .withMessage('Languages must be an array of string');
const skills = body('skills')
  .isArray().withMessage('Skills must be an array')
  .custom((skills: Array<any>) => stringArrayValidator(skills))
  .withMessage('Skills must be an array of string');

const referralSources = body('referralSources')
  .isArray().withMessage('Referral Sources must be an array')
  .custom((referralSources: Array<any>) => stringArrayValidator(referralSources))
  .withMessage('Referral Sources must be an array of string');

// Volunteering related
const volunteerReason = body('volunteerReason')
  .exists().withMessage('Volunteer reason is required')
  .isString().withMessage('Volunteer reason must be a string');

// const volunteerFrequency = body('volunteerFrequency').isNumeric().optional();
const volunteerContribution = body('volunteerContribution', 'Volunteer contribution must be a string').isString();
const volunteerType = body('volunteerType')
  .exists().withMessage('Volunteer type is required')
  .isString().withMessage('Volunteer type must be a string')
  .custom((type: string) => stringEnumValidator(VOLUNTEER_TYPE, 'Volunteer Type', type))
  .withMessage('Volunteer type is invalid');

const volunteeringOpportunityInterest = body('volunteeringOpportunityInterest', 'Volunteering opportunity interest must be a string').isString();

// Medical Information
const hasMedicalNeeds = body('hasMedicalNeeds')
  .exists().withMessage('hasMedicalNeeds is required')
  .isBoolean().withMessage('hasMedicalNeeds must be a boolean value');
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

// 
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
        userId,
        name,
        gender,
        mobileNumber,
        citizenship,
        nickname.optional(),
        address.optional(),
        birthday.optional(),
        race.optional(),

        // Soical media
        socialMediaPlatform,
        instagramHandle.optional(),

        // Organization
        organization.optional(),
        position.optional(),

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
        existingEmailValidator,
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
