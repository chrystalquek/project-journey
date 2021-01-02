export type QueryParams = {
    skip: number,
    limit: number,
    [field: string]: any
} // query parameters for GET

type SocialMediaPlatform = 'instagram' | 'facebook' | 'snapchat' | 'email' | 'other'
type CitizenshipStatus = 'singapore' | 'permanent_resident' | 'foreigner'
type VolunteerStatus = 'pending' | 'verified'
export type VolunteerRole = 'editor' | 'admin' | 'lead'
type Race = 'chinese' | 'malay' | 'indian' | 'caucasian' | 'other'
export type SignUpStatus = 'pending' | ['accepted', string] | 'rejected'
export type SignUpIdType = 'eventId' | 'userId' | 'signUpId'
export type EventSearchType = 'all' | 'upcoming' | 'past'
export type FormQuestionType = 'short-answer' | 'mcq' | 'check-box'
export interface RoleData {
    name: string;
    description: string;
    capacity: number;
    volunteers: Array<string>;
}

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
    volunteerType: string;

    organization?: string;
    position?: string;

    // System data
    status: VolunteerStatus;
    role: VolunteerRole;

    referral?: string; // unsure why we have it here?

    hasVolunteered?: boolean;
    hasChildrenExperience?: boolean;
    hasExternalVolunteerExperience?: boolean;
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

// TODO: Remove this
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

export type QuestionsOptionsRequestData = {
    text: string;
    type: FormQuestionType;
    isRequired: boolean;
    options: Array<{ content: string }>
}

export type AnswerData = {
    questionId: string;
    userId: string;
    content: string;
    formId: string;
}

export interface CreateFormQuestionsRequest {
    eventId: string,
    questions: Array<QuestionsOptionsRequestData>
}

export interface AnswerFormQuestionsRequest {
    eventId: string
    answers: Array<AnswerData>
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
    roles: Array<RoleData>;
}

export type OpportunityData = EventData & {
    photo: string;
    positions: Array<string>
}

export type SignUpData = {
    signUpId: string,
    eventId: string,
    userId: string,
    status: SignUpStatus,
    preferences: Array<string>,
    isRestricted: boolean,
}

export type FormData = {
    name: string;
    description: string;
    eventId: string;
}

export type QuestionData = {
    id: string;
    text: string;
    type: FormQuestionType;
    formId: string;
    isRequired: boolean;
}

export type OptionData = {
    id: string
    questionId: string;
    text: string;
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
