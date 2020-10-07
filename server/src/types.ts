export type VolunteerData = {
    fullName: string;
    password: string;
    identificationNumber: string;
    homeAddress: string;
    mobileNumber: string;
    dob: string;
    email: string;
    socialMediaPlatform: string;
    nickname?: string;
    photoUrl: string;
    gender: string;
    citizenship: string;
    organization: string;
    position: string;
    status: string;
    role: string;
    referral?: string;
    hasVolunteered?: boolean;
    hasChildrenExperience?: boolean;
    hasVolunteeredOtherPlaces?: boolean;
    hasFirstAidCertification?: boolean;
    leadershipInterest: string;
    description: string;
    interests: string;
    personality: string;
    reason: string;
    contribution?: string; // ??
    volunteer_length: string;
    sessions_per_month: number;
};

export type ResourceData = {
    name: string;
    url: string;
    type: string;
};

export type VolunteerSchemaData = {
    name: String,
    field_type: String,
    created_at: Date,
    modified_at: Date,
}

export type FormFieldType = String
