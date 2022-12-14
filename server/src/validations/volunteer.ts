import { body, query } from "express-validator";
import {
  newEmailValidator,
  passwordValidator,
  regexValidator,
  stringEnumValidator,
  stringArrayValidator,
  idInParam,
} from "./global";
import {
  CITIZENSHIP,
  GENDER,
  LEADERSHIP_INTEREST,
  RACE,
  SOCIAL_MEDIA_PLATFORM,
  VOLUNTEER_TYPE,
  PERSONALITY_TYPES_REGEX,
} from "../models/Volunteer";

type VolunteerValidatorMethod =
  | "createVolunteer"
  | "getAllVolunteers"
  | "getVolunteerById"
  | "getVolunteersById"
  | "deleteVolunteer"
  | "updateVolunteer";

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
// Personal information
// Compulsory
const name = () =>
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string");
const mobileNumber = () =>
  body("mobileNumber")
    .exists({ checkFalsy: true })
    .withMessage("Mobile number is required")
    .isString()
    .withMessage("Mobile number must be a string");
const address = () => body("address", "Address must be a string").isString();
const nickname = () => body("nickname", "Nickname must be a string").isString();
const birthday = () => body("birthday", "birthday must be a date").isISO8601();

// Organisation information
const organization = () =>
  body("organization", "Organization is not a string").isString();
const position = () => body("position", "Position is not a string").isString();

// Social media information
const socialMediaPlatform = () =>
  body("socialMediaPlatform")
    .exists()
    .withMessage("Social media platform is required")
    .isString()
    .withMessage("Social media platform must be a string")
    .custom((value: string) =>
      stringEnumValidator(SOCIAL_MEDIA_PLATFORM, "Social Media Platform", value)
    )
    .withMessage("Social media platform is invalid");
const instagramHandle = () =>
  body("instagramHandle", "instagram handle is not a string").isString();

// Enum field
const gender = () =>
  body("gender")
    .exists()
    .withMessage("Gender is required")
    .custom((value: string) => stringEnumValidator(GENDER, "Gender", value))
    .withMessage("Gender is invalid");
const citizenship = () =>
  body("citizenship")
    .exists()
    .withMessage("Citizenship is required")
    .custom((value: string) =>
      stringEnumValidator(CITIZENSHIP, "Citizenship", value)
    )
    .withMessage("Citizenship is invalid");
const race = () =>
  body("race", "Race is not valid").custom((value: string) =>
    stringEnumValidator(RACE, "Race", value)
  );

// Volunteer experience
const hasVolunteered = () =>
  body("hasVolunteered")
    .exists()
    .withMessage("hasVolunteered is required")
    .isBoolean()
    .withMessage("hasVolunteered must be a boolean value");
const biabVolunteeringDuration = () =>
  body("biabVolunteeringDuration")
    .exists()
    .withMessage("Past volunteer duration is required")
    .isNumeric()
    .withMessage("Past volunteer duration must be a number");

// External volunteering
const hasVolunteeredExternally = () =>
  body("hasVolunteeredExternally")
    .exists()
    .withMessage("hasVolunteeredExternally is required")
    .isBoolean()
    .withMessage("hasVolunteeredExternally must be a boolean value");
const volunteeringExperience = () =>
  body(
    "volunteeringExperience",
    "volunteeringExperience must be a string"
  ).isString();

// Volunteering with childrean
const hasChildrenExperience = () =>
  body("hasChildrenExperience").isBoolean().optional();
const childrenExperience = () =>
  body("childrenExperience").isString().optional();

// First Aid
const hasFirstAidCertification = () =>
  body(
    "hasFirstAidCertification",
    "hasFirstAidCertification must be a boolean value"
  ).isBoolean();

// Leadership
const leadershipInterest = () =>
  body("leadershipInterest")
    .isString()
    .withMessage("leadershipInterest must be a string")
    .custom((value: string) =>
      stringEnumValidator(LEADERSHIP_INTEREST, "Leadership Interest", value)
    )
    .withMessage("leadershipInterest is invalid");

const interests = () =>
  body("interests", "interest must be a string").isString();
const personality = () =>
  body("personality")
    .isString()
    .withMessage("Personality must be a string")
    .custom((value: string) =>
      regexValidator(PERSONALITY_TYPES_REGEX, "Personality", value)
    )
    .withMessage("Personality is invalid");
const strengths = () =>
  body("strengths")
    .isArray()
    .withMessage("strengths must be an array")
    .custom((value: any[]) => stringArrayValidator(value))
    .withMessage("Strengths must be an array of string");
const languages = () =>
  body("languages")
    .isArray()
    .withMessage("languages must be an array")
    .custom((value: any[]) => stringArrayValidator(value))
    .withMessage("Languages must be an array of string");
const skills = () =>
  body("skills")
    .isArray()
    .withMessage("Skills must be an array")
    .custom((value: any[]) => stringArrayValidator(value))
    .withMessage("Skills must be an array of string");
const referralSources = () =>
  body("referralSources")
    .isArray()
    .withMessage("Referral Sources must be an array")
    .custom((value: any[]) => stringArrayValidator(value))
    .withMessage("Referral Sources must be an array of string");

// Volunteering related
const volunteerReason = () =>
  body("volunteerReason")
    .exists({ checkFalsy: true })
    .withMessage("Volunteer reason is required")
    .isString()
    .withMessage("Volunteer reason must be a string");
const volunteerContribution = () =>
  body(
    "volunteerContribution",
    "Volunteer contribution must be a string"
  ).isString();
const volunteerType = () =>
  body("volunteerType")
    .exists()
    .withMessage("Volunteer type is required")
    .isString()
    .withMessage("Volunteer type must be a string")
    .custom((value: string) =>
      stringEnumValidator(VOLUNTEER_TYPE, "Volunteer Type", value)
    )
    .withMessage("Volunteer type is invalid");
const volunteeringOpportunityInterest = () =>
  body(
    "volunteeringOpportunityInterest",
    "Volunteering opportunity interest must be a string"
  ).isString();

// Medical Information
const hasMedicalNeeds = () =>
  body("hasMedicalNeeds")
    .exists()
    .withMessage("hasMedicalNeeds is required")
    .isBoolean()
    .withMessage("hasMedicalNeeds must be a boolean value");
const medicalNeeds = () =>
  body("medicalNeeds", "Medical needs must be a string").isString();
const hasAllergies = () =>
  body("hasAllergies")
    .exists()
    .withMessage("hasAllergies is required")
    .isBoolean()
    .withMessage("hasAllergies must be a boolean value");
const allergies = () =>
  body("allergies", "Allergies must be a string").isString();
const hasMedicationDuringDay = () =>
  body("hasMedicationDuringDay")
    .exists()
    .withMessage("hasMedicationDuringDay is required")
    .isBoolean()
    .withMessage("hasMedicationDuringDay must be a boolean value");

// Emergency contact
const emergencyContactName = () =>
  body("emergencyContactName")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact name is required")
    .isString()
    .withMessage("Emergency contact name must be a string");
const emergencyContactNumber = () =>
  body("emergencyContactNumber")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact number is required")
    .isString()
    .withMessage("Emergency contact number must be a string");
const emergencyContactEmail = () =>
  body("emergencyContactEmail")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact email is required")
    .isString()
    .withMessage("Emergency contact email must be a string");
const emergencyContactRelationship = () =>
  body("emergencyContactRelationship")
    .exists({ checkFalsy: true })
    .withMessage("Emergency contact relationship is required")
    .isString()
    .withMessage("Emergency contact relationship must be a string");

// Remarks
const volunteerRemarks = () =>
  body("volunteerRemarks", "Volunteer remarks must be a string").isString();

// Session related
const sessionsPerMonth = () =>
  body("sessionsPerMonth", "Sessions per month must be an integer").isInt({
    min: 0,
  });
const sessionPreference = () =>
  body("sessionPreference", "Session preference must be a string").isString();

// Photo URL
const photoUrl = () =>
  body("photoUrl")
    .exists({ checkFalsy: true })
    .withMessage("Photo URL is required")
    .isString()
    .withMessage("Photo URL must be a string")
    .isURL()
    .withMessage("Photo URL must be a URL");

// hasCriminalRecord
const hasCriminalRecord = () =>
  body("hasCriminalRecord")
    .exists()
    .withMessage("hasCriminalRecord is required")
    .isBoolean()
    .withMessage("hasCriminalRecord must be a boolean value");

// Submitted Commitment Application

// volunteer type in query can be single string, array or empty
const volunteerTypeInQuery = () =>
  query("volunteerType")
    .optional()
    .custom((value) => {
      // if it's an array, check the type of each item in the array
      if (Array.isArray(value)) {
        return value.every((element) =>
          stringEnumValidator(VOLUNTEER_TYPE, "Volunteer type", element)
        );
      }
      // if it's a single string
      return (
        typeof value === "string" &&
        stringEnumValidator(VOLUNTEER_TYPE, "Volunteer type", value)
      );
    })
    .withMessage("Volunteer type in query must be a string or array");

const getValidations = (method: VolunteerValidatorMethod) => {
  switch (method) {
    case "createVolunteer": {
      return [
        // Login details
        newEmailValidator(),
        passwordValidator(),
        // Personal details
        name(),
        gender(),
        mobileNumber(),
        citizenship(),
        languages(),
        nickname().optional(),
        address().optional(),
        birthday().optional(),
        race().optional(),
        // Additional details
        referralSources(),
        hasFirstAidCertification().optional(),
        leadershipInterest().optional(),
        interests().optional(),
        personality().optional(),
        skills().optional(),
        strengths().optional(),
        volunteeringOpportunityInterest().optional(),
        // Soical media
        socialMediaPlatform(),
        instagramHandle().optional(),
        // Organization
        organization().optional(),
        position().optional(),
        // Volunteering experience
        hasVolunteered(),
        biabVolunteeringDuration().optional(),
        // Children experience
        hasChildrenExperience(),
        childrenExperience().optional(),
        // External volunteering
        hasVolunteeredExternally(),
        volunteeringExperience().optional(),
        // Other volunteering related
        volunteerType(),
        volunteerReason(), // Categorize answers
        volunteerContribution().optional(),
        // Session related
        sessionsPerMonth(),
        sessionPreference(),
        // Medical Information
        hasMedicalNeeds(),
        medicalNeeds().optional(),
        hasAllergies(),
        allergies().optional(),
        hasMedicationDuringDay(),
        // Emergency Contact
        emergencyContactEmail(),
        emergencyContactName(),
        emergencyContactNumber(),
        emergencyContactRelationship(),
        // Photo URL
        photoUrl(),
        // Criminal Record
        hasCriminalRecord(),
        // Remark
        volunteerRemarks().optional(),
      ];
    }
    case "getVolunteerById": {
      return [idInParam()];
    }
    case "getVolunteersById": {
      return [
        body("ids")
          .isArray()
          .custom((value: any[]) => stringArrayValidator(value)),
      ];
    }
    case "getAllVolunteers": {
      return [
        query(["pageNo", "size"]).isInt({ min: 0 }).optional(),
        query(["name", "sort"]).isString().optional(),
        volunteerTypeInQuery(),
      ];
    }
    case "deleteVolunteer": {
      return [idInParam()];
    }
    case "updateVolunteer": {
      return [
        // check id in request param
        idInParam(),
        // update email address
        newEmailValidator().optional(),
        // update password
        passwordValidator().optional(),
        // Personal details
        name().optional(),
        gender().optional(),
        mobileNumber().optional(),
        citizenship().optional(),
        languages().optional(),
        nickname().optional(),
        address().optional(),
        birthday().optional(),
        race().optional(),
        // Additional details
        referralSources().optional(),
        hasFirstAidCertification().optional(),
        leadershipInterest().optional(),
        interests().optional(),
        personality().optional(),
        skills().optional(),
        strengths().optional(),
        volunteeringOpportunityInterest().optional(),
        // Soical media
        socialMediaPlatform().optional(),
        instagramHandle().optional(),
        // Organization
        organization().optional(),
        position().optional(),
        // Volunteering experience
        hasVolunteered().optional(),
        biabVolunteeringDuration().optional(),
        // Children experience
        hasChildrenExperience().optional(),
        childrenExperience().optional(),
        // External volunteering
        hasVolunteeredExternally().optional(),
        volunteeringExperience().optional(),
        // Other volunteering related
        volunteerType().optional(),
        volunteerReason().optional(), // Categorize answers
        volunteerContribution().optional(),
        // Session related
        sessionsPerMonth().optional(),
        sessionPreference().optional(),
        // Medical Information
        hasMedicalNeeds().optional(),
        medicalNeeds().optional(),
        hasAllergies().optional(),
        allergies().optional(),
        hasMedicationDuringDay().optional(),
        // Emergency Contact
        emergencyContactEmail().optional(),
        emergencyContactName().optional(),
        emergencyContactNumber().optional(),
        emergencyContactRelationship().optional(),
        // Photo URL
        photoUrl().optional(),
        // Criminal Record
        hasCriminalRecord().optional(),
        // Remark
        volunteerRemarks().optional(),
      ];
    }
    default:
      return [];
  }
};

export default getValidations;
