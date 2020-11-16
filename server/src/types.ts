import mongoose from 'mongoose';

type SocialMediaPlatform = 'instagram' | 'facebook' | 'snapchat' | 'email' | 'other'
type CitizenshipStatus = 'singapore' | 'permanent_resident' | 'foreigner'
type VolunteerStatus = 'pending' | 'verified'
type VolunteerRole = 'editor' | 'admin'
type Race = 'chinese' | 'malay' | 'indian' | 'caucasian' | 'other'

export type VolunteerData = {
    _id: string;
    name: string;
    password: string;
    identificationNumber?: string;

    // personal details
    address: string;
    mobileNumber: string;
    birthday: Date;
    email: string;
    socialMediaPlatform: SocialMediaPlatform;
    nickname?: string;
    photoUrl?: string;
    gender: string;
    citizenship: CitizenshipStatus;
    race: Race;

    organization?: string;
    position?: string;

    // System data
    status: VolunteerStatus;
    role: VolunteerRole;

    referral?: string; // unsure why we have it here?

    hasVolunteered?: boolean;
    hasChildrenExperience?: boolean;
    hasVolunteeredOtherPlaces?: boolean;
    hasFirstAidCertification?: boolean;

    leadershipInterest: string;
    description: string;
    interests: Array<string>;
    personality: string;
    skills: Array<string>

    volunteerContribution?: string;
    volunteerReason: string;
    volunteerFrequency: number;

    volunteerRemarks: string;
    administratorRemarks: string;
};

export type VolunteerPublicData = Omit<
    VolunteerData,
    'password' |
    '_id' |
    'identificationNumber' |
    'administratorRemarks'
>

export type ResourceData = {
    name: string;
    url: string;
    type: string;
};

export type VolunteerSchemaData = {
    name: string,
    field_type: string,
    created_at: Date,
    modified_at: Date,
}

export type EnvironmentConstants = {
    port: number,
    env: string
    disableAuthentication: boolean
}

export type FormFieldType = 'String' | 'Number';

export type TeamData = {
  leader: string,
  name: string,
  members: [string]
}

export type ResponseJSON = {
    message?: string
    errors?: Array<any>
}

export interface CreateVolunteerFieldResponse extends ResponseJSON {
}

export interface GetAllVolunteersFieldsResponse extends ResponseJSON {
    data: Array<String>
}

export interface UpdateVolunteerFieldResponse extends ResponseJSON {
}

export interface DeleteVolunteerFieldResponse extends ResponseJSON {
}

export type EventData = {
    name: string;
    description: string;
    contentUrl: string;
    contentType: string;
    facilitatorName: string;
    facilitatorDescription: string;
    startDate: Date;
    endDate: Date;
    location: string;
    deadline: Date;
    additionalInformation: string;
    capacity: number;
    volunteers: Array<mongoose.Types.ObjectId>;
}

export type OpportunityData = EventData & {
    photo: string;
    positions: Array<string>
}

/**
 * Individual error type for saving in DB
 * Error type is at per field level
 * e.g: 'name', 'password'
 */
export interface MongooseSaveSubError {
    name: string
    message: string
    properties: {
        message: string
        type: string
        path: string
        value: string
    }
    kind: string
    path: string
    value: string
}

/**
 * General error type for saving in DB
 */
export type MongooseSaveError = {
    errors: Record<string, MongooseSaveSubError>
    _message: string
}
