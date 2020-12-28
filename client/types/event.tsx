export type EventData = {
    name: string;
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
}

export interface RoleData {
    name: string;
    description: string;
    capacity: number;
    volunteers: Array<string>;
}
