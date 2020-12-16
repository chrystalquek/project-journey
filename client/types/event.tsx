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
  volunteers: Array<any>;
}