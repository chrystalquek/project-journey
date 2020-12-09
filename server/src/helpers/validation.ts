import _ from 'lodash';
import { body } from 'express-validator/check';
import {
  CITIZENSHIP_TYPES, GENDER_TYPES, LEADERSHIP_INTEREST_TYPES,
  PERSONALITY_TYPES, RACE_TYPES, SOCIAL_MEDIA_PLATFORMS,
} from '../models/Volunteer';
import { doesUserEmailExist } from '../services/volunteer';

const LENGTH_MINIMUM_PASSWORD = 8;

/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */
const stringEnumValidator = (enumTypes: Array<string>, enumName: string, value: string) => {
  if (!_.includes(enumTypes, value)) {
    throw new Error(`${enumName}: "${value}" must be either ${enumTypes.join(', ')}`);
  }
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

const mobile = body('mobileNumber').isString().isMobilePhone('en-SG');
const birthday = body('birthday').isISO8601().toDate();
const socialMediaPlatform = body('socialMediaPlatform').isString().custom(
  (socialMedia: string) => stringEnumValidator(SOCIAL_MEDIA_PLATFORMS, 'Social Media Platform', socialMedia),
);
const gender = body('gender').custom((genderText: string) => stringEnumValidator(GENDER_TYPES, 'Gender', genderText));
const citizenship = body('citizenship').custom(
  (citizenshipType: string) => stringEnumValidator(CITIZENSHIP_TYPES, 'Citizenship', citizenshipType),
);
const race = body('race').custom((raceType: string) => stringEnumValidator(RACE_TYPES, 'Race', raceType));
const organization = body('organization').isString();
const position = body('position').isString();
const hasVolunteered = body('hasVolunteered').isBoolean();
const hasChildrenExperience = body('hasChildrenExperience').isBoolean();
const hasExternalVolunteerExperience = body('hasExternalVolunteerExperience').isBoolean();
const hasFirstAidCertification = body('hasFirstAidCertification').isBoolean();

const leadershipInterest = body('leadershipInterest').isString().custom(
  (leadershipInterestType: string) => stringEnumValidator(
    LEADERSHIP_INTEREST_TYPES, 'Leadership Interest', leadershipInterestType,
  ),
);

const description = body('description').isString();
const interests = body('interests').isArray();
const personalityType = body('personality').isString().custom(
  (personality: string) => stringEnumValidator(PERSONALITY_TYPES, 'Personality', personality),
);
const skills = body('skills').isArray();

const volunteerReason = body('volunteerReason').isString();
const volunteerFrequency = body('volunteerFrequency').isNumeric();
const volunteerContribution = body('volunteerContribution').isString();
const volunteerRemark = body('volunteerRemark').isString().optional();

export default {
  email,
  password,
  newPassword,
  name,
  address,
  mobile,
  birthday,
  socialMediaPlatform,
  gender,
  citizenship,
  race,
  organization,
  position,
  hasVolunteered,
  hasChildrenExperience,
  hasExternalVolunteerExperience,
  hasFirstAidCertification,
  leadershipInterest,
  description,
  interests,
  personalityType,
  skills,
  volunteerReason,
  volunteerFrequency,
  volunteerContribution,
  volunteerRemark,
};
