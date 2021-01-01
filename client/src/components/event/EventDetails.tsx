import {EventData} from "@type/event";
import React, {FC} from "react";
import {Volunteer, VOLUNTEER_TYPE, VolunteerData} from "@type/volunteer";
import EventDetailsUnregistered from "@components/event/EventDetailsUnregistered";
import EventDetailsCommitted from "@components/event/EventDetailsCommitted";
import EventDetailsAdhoc from "@components/event/EventDetailsAdhoc";

type EventDetailsProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetails: FC<EventDetailsProps> = ({ event, user }) => {
  const renderDetails = (volunteerType: VOLUNTEER_TYPE): React.ReactNode => {
    switch (volunteerType) {
      case Volunteer.Adhoc:
        return <EventDetailsAdhoc event={event} user={user} />
      case Volunteer.Committed:
      case Volunteer.Admin:
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