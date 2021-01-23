export type QueryParams = {
    skip?: number,
    limit?: number,
    [field: string]: any
} // query parameters for GET

type SocialMediaPlatform = 'instagram' | 'facebook' | 'snapchat' | 'email' | 'other'
type CitizenshipStatus = 'singapore' | 'permanent_resident' | 'foreigner'
export type VolunteerType = 'ad-hoc' | 'committed' | 'admin'
export type Race = 'chinese' | 'malay' | 'indian' | 'caucasian' | 'other'
export type SignUpStatus = 'pending' | ['accepted', string] | 'rejected'
export type SignUpIdType = 'eventId' | 'userId' | 'signUpId'
export type EventSearchType = 'all' | 'upcoming' | 'past'
export type FormQuestionType = 'shortAnswer' | 'mcq' | 'checkboxes'
export type EventType = 'workshop' | 'hangout' | 'volunteering'
export type Gender = 'male' | 'female'

export interface RoleData {
    name: string;
    description: string;
    capacity: number;
    volunteers: Array<string>;
}

export type VolunteerData = {
    // System data
    _id: string;
    volunteerType: VolunteerType;

    name: string;
    password: string;

    // personal details
    nickname?: string;
    gender: Gender;
    citizenship: CitizenshipStatus;
    birthday: Date;
    address: string;
    mobileNumber: string;
    photoUrl: string;
    email: string;

    socialMediaPlatform: SocialMediaPlatform;
    instagramHandle?: string;

    organization?: string;
    position?: string;
    race?: Race;

    languages: Array<string>;
    referralSources: Array<string>;

    hasVolunteered: boolean;
    biabVolunteeringDuration?: number; // Number of months

    hasVolunteeredExternally: boolean;
    volunteeringExperience?: string;

    hasChildrenExperience: boolean;
    childrenExperience?: string;

    sessionsPerMonth?: number
    sessionPreference?: string // pre-defined session committment

    hasFirstAidCertification?: boolean;
    leadershipInterest?: string;
    interests?: string; // short-ans

    skills?: Array<string>;

    personality?: string; // Myers-Briggs
    strengths?: Array<string>;
    volunteeringOpportunityInterest?: string;

    volunteerReason: string; // Essay
    volunteerContribution?: string

    // WCA Registration: Medical Information
    hasMedicalNeeds: boolean
    medicalNeeds?: string
    hasAllergies: boolean
    allergies?: string
    hasMedicationDuringDay: boolean

    // WCA Registration: Emergency Contact
    emergencyContactName: string
    emergencyContactNumber: string
    emergencyContactEmail: string
    emergencyContactRelationship: string

    // Remarks
    volunteerRemarks: string;
    administratorRemarks: string;

    // Event count
    volunteeringSessionsCount: number;
    workshopsCount: number;
    hangoutsCount: number;

    // Past Events
    pastEventIds: Array<string>

    // Submitted Commitment Application
    commitmentApplicationIds: Array<string>
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
    displayText: string;
    type: FormQuestionType;
    isRequired: boolean;
    name: string;
    options: Array<{ content: string }>
}

export type AnswerData = {
    questionId: string;
    userId: string;
    content: string;
    formId?: string;
}

export interface CreateFormQuestionsRequest {
    eventId: string,
    questions: Array<QuestionsOptionsRequestData>
}

export interface AnswerFormQuestionsRequest {
    eventId: string
    answers: Array<AnswerData>
}
// TODO: delete if we are following FE
// export type EventData = {
//     name: string;
//     description: string;
//     contentUrl: string;
//     contentType: string;
//     facilitatorName: string;
//     facilitatorDescription: string;
//     startDate: Date;
//     endDate: Date;
//     location: string;
//     deadline: Date;
//     additionalInformation: string;
//     roles: Array<RoleData>;
// }

export type EventData = {
    name: string;
    coverImage?: string; // TODO: change to appropriate type
    eventType: EventType;
    volunteerType: VolunteerType;
    startDate: Date;
    endDate: Date;
    deadline: Date;
    vacancies: number;
    description: string;
    facilitatorName?: string;
    facilitatorPhoto?: string;
    facilitatorDescription?: string;
    roles?: Array<RoleData>;
    contentUrl?: string;
    contentType?: string;
    location: string;
    isCancelled: boolean;
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
    eventId: string;
}

export type QuestionData = {
    id: string;
    displayText: string;
    type: FormQuestionType;
    formId: string;
    name?: string;
    isRequired: boolean;
}

export type OptionData = {
    id: string
    questionId: string;
    text: string;
}

export type OptionClientData = {
    value: string;
    label: string;
}

export type QuestionItem = {
  name: string;
  displayText: string[];
  type: FormFieldType;
  options?: Array<OptionClientData>;
  isRequired: boolean;
};

export type ImageData = {
    email: String,
    imageName: String
}

export type ImageResponse = {
    email: String,
    imageName: String,
    url: String
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

export type CommitmentApplicationStatus = 'pending' | 'accepted' | 'rejected'

export type CommitmentApplicationData = {
    _id: string,
    volunteerId: string
    status: CommitmentApplicationStatus,
    createdAt: Date,

    // List of questions in the application form
    // yet to be determined, waiting for BD team
}
