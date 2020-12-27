export type EventSearchType = 'all' | 'upcoming' | 'past';

export type RoleData = {
    name: string;
    description: string;
    capacity: number;
    volunteers: Array<string>;
}

export type EventData = {
    _id: string,
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