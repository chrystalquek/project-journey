import {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";

type EventDetailsUnregisteredProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsUnregistered: FC<EventDetailsUnregisteredProps> = () => {
  return (
    <div>
      HELLO WORLD!
    </div>
  )
}

export default EventDetailsUnregistered;