import { EventData } from '../types';

const dummyEvent: EventData = {
  name: 'Volunteering: Regular Session [Committed]',
  eventType: 'workshop',
  volunteerType: 'committed',
  description: 'event1',
  contentUrl: 'www.event1.com',
  contentType: 'pdf',
  facilitatorName: 'event 1 facil',
  facilitatorDescription: 'desc',
  startDate: new Date('2021-12-12T00:00:00.000Z'),
  endDate: new Date('2021-12-12T00:00:00.000Z'),
  deadline: new Date(),
  roles: [{
    volunteers: ['5fdcb0f2332e9c2a4d5bb7bb'],
    name: 'cameraman',
    description: 'desc cameraman',
    capacity: 2,
  }],
  vacancies: 0, // TODO: clarify diff between vacancies and capacity
  location: 'Jakarta',
  isCancelled: false,
};

export default () => (dummyEvent);
