import { EventData } from '../types';

const dummyEvent: EventData = {
  name: 'Volunteering: Regular Session [Committed]',
  description: 'event1',
  contentUrl: 'www.event1.com',
  contentType: 'pdf',
  facilitatorName: 'event 1 facil',
  facilitatorDescription: 'desc',
  startDate: new Date('2021-12-12T00:00:00.000Z'),
  endDate: new Date('2021-12-12T00:00:00.000Z'),
  location: 'Jakarta',
  deadline: new Date(),
  additionalInformation: 'info',
  roles: [{
    volunteers: ['5fdcb0f2332e9c2a4d5bb7bb'],
    name: 'cameraman',
    description: 'desc cameraman',
    capacity: 2,
  }],
};

export default () => (dummyEvent);
