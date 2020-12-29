export type EventData = {
    name: string;
    coverImage?: string; // TODO: change to appropriate type
    volunteerType: string;
    startDateAndTime: Date;
    endDateAndTime: Date;
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
}

export interface RoleData {
    name: string;
    description: string;
    capacity: number;
    volunteers: Array<string>;
}
