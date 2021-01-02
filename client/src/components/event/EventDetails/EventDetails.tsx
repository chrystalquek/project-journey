import {EventData} from "@type/event";
import React, {FC} from "react";
import {Volunteer, VOLUNTEER_TYPE, VolunteerData} from "@type/volunteer";
import EventDetailsUnregistered from "@components/event/EventDetails/EventDetailsUnregistered";
import EventDetailsCommitted from "@components/event/EventDetails/EventDetailsCommitted";
import EventDetailsAdhoc from "@components/event/EventDetails/EventDetailsAdhoc";

type EventDetailsProps = {
  event: EventData,
  user: VolunteerData
}

const EventDetails: FC<EventDetailsProps> = ({ event, user }) => {
  const renderDetails = (volunteerType: VOLUNTEER_TYPE): React.ReactNode => {
    console.log(volunteerType)
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