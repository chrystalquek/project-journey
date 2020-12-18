export type EventData = {
  name: string;
  description: string;
  content_url: string;
  content_type: string;
  facilitator_name: string;
  facilitator_description: string;
  start_date: Date;
  end_date: Date;
  location: string;
  deadline: Date;
  additional_information: string;
  capacity: number;
  volunteers: Array<any>;
  roles: Array<{
    volunteers: Array<any>,
    name: string,
    description: string,
    capacity: number,
  }>
}