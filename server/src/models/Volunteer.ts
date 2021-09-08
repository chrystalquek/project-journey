import { Type, createSchema, ExtractProps } from "ts-mongoose";
import mongoose from "mongoose";
import { UserData } from "./User";

export const GENDER = ["male", "female"] as const;
export type Gender = typeof GENDER[number];

export const CITIZENSHIP = [
  "singapore",
  "permanent_resident",
  "foreigner",
] as const;
export type Citizenship = typeof CITIZENSHIP[number];

export const RACE = ["chinese", "malay", "indian", "caucasian", "other"];
export type Race = typeof RACE[number];

export const LEADERSHIP_INTEREST = ["yes", "no", "maybe"] as const;
export type LeadershipInterest = typeof LEADERSHIP_INTEREST[number];

export const PERSONALITY_TYPES_REGEX = /(I|E)(N|S)(F|T)(J|P)-(A|T)/;

export const SOCIAL_MEDIA_PLATFORM = [
  "instagram",
  "facebook",
  "snapchat",
  "email",
  "other",
] as const;
export type SocialMediaPlatform = typeof SOCIAL_MEDIA_PLATFORM[number];

export const VOLUNTEER_TYPE = ["ad-hoc", "committed", "admin"];
export type VolunteerType = typeof VOLUNTEER_TYPE[number];

export const VolunteerSchema = createSchema({
  name: Type.string({ required: true }),
  mobileNumber: Type.string({ required: true }),
  address: Type.string({ required: false }),
  nickname: Type.string({ required: false }),
  birthday: Type.date({ required: false }),
  userId: Type.objectId({
    required: true,
    ref: "User",
  }),
  volunteerType: Type.string({
    required: true,
    enum: VOLUNTEER_TYPE,
  }),
  gender: Type.string({
    required: true,
    enum: GENDER,
  }),
  race: Type.string({
    required: false,
    enum: RACE,
  }),
  citizenship: Type.string({
    required: true,
    enum: CITIZENSHIP,
  }),
  photoUrl: Type.string({ required: true }), // Process on server side - not immediately available
  email: Type.string({ required: true }),

  socialMediaPlatform: Type.string({
    required: true,
    enum: SOCIAL_MEDIA_PLATFORM,
  }),
  instagramHandle: Type.string({ required: false }),

  orgnanization: Type.string({ required: false }),
  position: Type.string({ required: false }),

  languages: Type.array({
    required: true,
    default: [],
  }).of(Type.string({ required: true })),

  referralSources: Type.array({
    required: true,
    default: [],
  }).of(Type.string({ required: true })),

  hasVolunteered: Type.boolean({ required: true }),
  biabVolunteeringDuration: Type.number({ required: false }), // Number of months

  hasVolunteeredExternally: Type.boolean({ required: true }),
  volunteeringExperience: Type.string({ required: false }),

  hasChildrenExperience: Type.boolean({ required: true }),
  childrenExperience: Type.string({ required: false }),

  sessionsPerMonth: Type.number({ required: false }),
  sessionPreference: Type.string({ required: false }), // pre-defined session committment

  hasFirstAidCertification: Type.boolean({ required: false }),
  leadershipInterest: Type.string({
    required: false,
    enum: LEADERSHIP_INTEREST,
  }),
  interests: Type.string({ required: false }), // short-ans

  skills: Type.array({ required: false }).of(Type.string({ required: true })),

  personality: Type.string({
    required: false,
    validate: PERSONALITY_TYPES_REGEX,
  }), // Myers-Briggs
  strengths: Type.array({ required: false }).of(
    Type.string({ required: true })
  ),
  volunteeringOpportunityInterest: Type.string({ required: false }),

  volunteerReason: Type.string({ required: true }), // Essay
  volunteerContribution: Type.string({ required: false }),
  hasCriminalRecord: Type.boolean({ required: true }),

  // WCA Registration: Medical Information
  hasMedicalNeeds: Type.boolean({ required: true }),
  medicalNeeds: Type.string({ required: false }),
  hasAllergies: Type.boolean({ required: true }),
  allergies: Type.string({ required: false }),
  hasMedicationDuringDay: Type.boolean({ required: true }),

  // WCA Registration: Emergency Contact
  emergencyContactName: Type.string({ required: true }),
  emergencyContactNumber: Type.string({ required: true }),
  emergencyContactEmail: Type.string({ required: true }),
  emergencyContactRelationship: Type.string({ required: true }),

  // Remarks
  volunteerRemarks: Type.string({ required: false }),

  // Event count
  volunteeringSessionsCount: Type.number({
    required: true,
    default: 0,
  }),
  workshopsCount: Type.number({
    required: true,
    default: 0,
  }),
  hangoutsCount: Type.number({
    required: true,
    default: 0,
  }),

  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),

  // Buddy
  buddyId: Type.string({ required: false }),
});

export type VolunteerData = Omit<
  ExtractProps<typeof VolunteerSchema>,
  "__v" | "_id" | "userId"
> & { _id: string; userId: string }; // whats retrieved from db

export type GetVolunteerData = Omit<VolunteerData, "userId"> & {
  administratorRemarks?: string;
};
// whats retrieved from db + adminRemarks - userId

export type NewVolunteerData = Omit<
  VolunteerData & UserData,
  "_id" | "createdAt" | "userId"
>;

type VolunteerModel = VolunteerData & mongoose.Document;
export default mongoose.model<VolunteerModel>("Volunteer", VolunteerSchema);
