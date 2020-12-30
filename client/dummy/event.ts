import { EventData } from '../types/event';

const dummyEvent: EventData = {
  name: 'Volunteering: Regular Session [Committed]',
  volunteerType: 'Committed Only',
  description: 'event1',
  contentUrl: 'www.event1.com',
  contentType: 'pdf',
  facilitatorName: 'event 1 facil',
  facilitatorDescription: 'desc',
  startDate: JSON.stringify(new Date('2021-12-12T00:00:00.000Z')),
  endDate: JSON.stringify(new Date('2021-12-12T00:00:00.000Z')),
  deadline: JSON.stringify(new Date()),
  roles: [{
    volunteers: ['5fdcb0f2332e9c2a4d5bb7bb'],
    name: 'cameraman',
    description: 'desc cameraman',
    capacity: 2,
  }],
  vacancies: 0, // TODO: clarify diff between vacancies and capacity
  location: 'Jakarta',
};

export default dummyEvent;

// {"name": "event1",
// "description": "event1",
// "contentUrl": "www.event1.com",
// "contentType": "pdf",
// "facilitatorName": "event 1 facil",
// "facilitatorDescription": "desc",
// "startDate": "2021-01-01",
// "endDate": "2021-02-02",
// "location": "Jakarta",
// "deadline": "2021-12-12",
// "additionalInformation": "info",
// "roles": [{"name": "cameraman", "description": "desc cameraman", "capacity": 2, "volunteers": []},
//           {"name": "chef", "description": "desc chef", "capacity": 1, "volunteers": []}]
// }
