import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '@redux/actions/event';
import { VolunteerData } from '@type/volunteer';
import { StoreState } from '@redux/store';
import { EventData } from '@type/event';
import EventDetailsRegistered from '@components/event/EventDetails/EventDetailsRegistered/eventDetails';
import EventDetailsUnregistered from '@components/event/EventDetails/EventDetailsUnregistered';
import {
  AppBar, CircularProgress, Grid, IconButton, Toolbar,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import { useRouter } from 'next/router';
import { EventDetailsWrapper } from '@components/event/EventDetails/EventDetailsWrapper';
import Loading from '@components/common/Loading';

type EventDetailsProps = {
  eid: string,
}

const EventDetails: FC<EventDetailsProps> = ({ eid }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(String(eid)));
    }
  }, [eid]);

  const userData: VolunteerData = useSelector((state: StoreState) => state.user.user);
  const eventData: EventData | null = useSelector((state: StoreState) => state.event.form);

  if (userData && eventData) {
    return (
      <EventDetailsWrapper event={eventData}>
        <EventDetailsRegistered user={userData} event={eventData} />
      </EventDetailsWrapper>
    );
  } if (eventData) {
    return (
      <EventDetailsWrapper event={eventData}>
        <EventDetailsUnregistered user={userData} event={eventData} />
        ;
      </EventDetailsWrapper>
    );
  }
  return <Loading />;
};

export { EventDetails };
