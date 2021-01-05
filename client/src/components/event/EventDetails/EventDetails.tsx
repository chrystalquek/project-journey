import {EventData} from "@type/event";
import React, {FC} from "react";
import {VOLUNTEER_TYPE, VolunteerData} from "@type/volunteer";
import EventDetailsUnregistered from "@components/event/EventDetails/EventDetailsUnregistered";
import EventDetailsCommitted from "@components/event/EventDetails/EventDetailsCommitted";
import EventDetailsAdhoc from "@components/event/EventDetails/EventDetailsAdhoc";

type EventDetailsProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetails: FC<EventDetailsProps> = ({ event, user }) => {
  const renderDetails = (volunteerType: VOLUNTEER_TYPE): React.ReactNode => {
    switch (volunteerType) {
      case VOLUNTEER_TYPE.ADHOC:
        return <EventDetailsAdhoc event={event} user={user} />
      case VOLUNTEER_TYPE.COMMITED:
      case VOLUNTEER_TYPE.ADMIN:
        return <EventDetailsCommitted event={event} user={user} />
      default:
        // unregistered
        return <EventDetailsUnregistered event={event} user={user} />
    }
  }

  return (
    <>
      {renderDetails(user.volunteerType)}
    </>
  )
};

export default EventDetails;