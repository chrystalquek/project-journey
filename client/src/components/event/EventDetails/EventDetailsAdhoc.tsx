import {FC} from "react";
import {EventData} from "@type/event";
import {VolunteerData} from "@type/volunteer";

type EventDetailsAdhocProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetailsAdhoc: FC<EventDetailsAdhocProps> = () => {
  return (
    <div>
      HELLO WORLD!
    </div>
  )
}

export default EventDetailsAdhoc;