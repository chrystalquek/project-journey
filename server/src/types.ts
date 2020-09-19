export type VolunteerData = {
    fullName: string;
    password: string;
    identificationNumber: string;
    homeAddress: string;
    mobileNumber: string;
    dob: string;
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
    created_at: string;
    resource_type: string;
};
