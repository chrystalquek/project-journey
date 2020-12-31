export enum GENDER {
    MALE = 'male',
    FEMALE = 'female'
}

export enum CITIZENSHIP {
    SINGAPORE = 'singapore',
    PR = 'permanent_resident',
    FOREIGNER = 'foreigner'
}

export enum RACE {
    CHINESE = 'chinese', 
    MALAY = 'malay', 
    INDIAN = 'indian', 
    CAUCASIAN = 'caucasian', 
    OTHER = 'other'
}

export enum LEADERSHIP_INTEREST {
    YES = 'yes', 
    NO = 'no', 
    MAYBE = 'maybe'
}

export enum PERSONALITY {
    INTJ_A = 'INTJ_A',
    INTJ_T = 'INTJ_T',
    INTP_A = 'INTP_A',
    INTP_T = 'INTP_T',
    ENTJ_A = 'ENTJ_A',
    ENTJ_T = 'ENTJ_T',
    ENFP_A = 'ENFP_A',
    ENFP_T = 'ENFP_T',
    ISTJ_A = 'ISTJ_A',
    ISTJ_T = 'ISTJ_T',
    ISFJ_A = 'ISFJ_A',
    ISFJ_T = 'ISFJ_T',
    ESTJ_A = 'ESTJ_A',
    ESTJ_T = 'ESTJ_T',
    ESFJ_A = 'ESFJ_A',
    ESFJ_T = 'ESFJ_T',
    ISTP_A = 'ISTP_A',
    ISTP_T = 'ISTP_T',
    ISFP_A = 'ISFP_A',
    ISFP_T = 'ISFP_T',
    ESTP_A = 'ESTP_A',
    ESTP_T = 'ESTP_T',
    ESFP_A = 'ESFP_A',
    ESFP_T = 'ESFP_T'
}

export enum SOCIAL_MEDIA_PLATFORMS {
    INSTAGRAM = 'instagram', 
    FACEBOOK = 'facebook', 
    SNAPCHAT = 'snapchat', 
    EMAIL = 'email', 
    OTHER = 'other'
}

export enum VOLUNTEER_TYPE {
    ADHOC = 'ad-hoc', 
    COMMITED = 'committed', 
    LEAD = 'lead', 
    ADMIN = 'admin'
}

export type VolunteerData = {
    _id: string,
    name: string,
    address: string,
    mobileNumber: string,
    birthday: Date,
    email: string,
    socialMediaPlatform: SOCIAL_MEDIA_PLATFORMS,
    nickname: string,
    photoUrl: string,
    matchedVolunteer: number,
    gender: GENDER,
    citizenship: CITIZENSHIP,
    race: RACE,
    orgnanization: string,
    position: string,
    volunteerType: VOLUNTEER_TYPE,
    referral: string,

    hasVolunteered: boolean,
    hasChildrenExperience: boolean,
    hasVolunteeredExternally: boolean,
    hasFirstAidCertification: boolean,

    leadershipInterest: LEADERSHIP_INTEREST,
    description: string,
    interests: string[],
    personality: PERSONALITY,
    skills: string[],
    volunteerReason: string,
    volunteerContribution: string,
    volunteerFrequency: number,

    // Remarks
    volunteerRemarks: string,
    adminRemarks: string,

    // Event count
    volunteeringSessionsCount: number,
    workshopsCount: number,
    hangoutsCount: number

    createdAt: Date, // used for member since // is snake case not camel case
    // is there a way to parse strings into dates automatically when the strings are just fetched via api?
}
