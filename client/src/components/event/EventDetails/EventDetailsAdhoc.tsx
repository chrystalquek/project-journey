import { FC } from 'react';
import { EventData } from '@type/event';
import { VolunteerData } from '@type/volunteer';

type EventDetailsAdhocProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsAdhoc: FC<EventDetailsAdhocProps> = () => (
  <div>
    HELLO WORLD!
  </div>
);

export default EventDetailsAdhoc;
