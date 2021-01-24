import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FC } from 'react';
import { StoreState } from '@redux/store';
import { useSelector } from 'react-redux';
import { EVENTS_ROUTE } from '@constants/routes';
import { EventData } from '@type/event';
import {getStoreEvent} from "@utils/helpers/event";

type EventBreadCrumbsProps = {
  eid?: string
}

const useStyles = makeStyles({
  linkColor: {
    color: '#595858',
    lineHeight: '2rem',
  },
});

const EventBreadCrumbs: FC<EventBreadCrumbsProps> = ({ eid }) => {
  const classes = useStyles();
  const event: EventData | null = getStoreEvent(eid);

  return (
    <Breadcrumbs separator=">" className={classes.linkColor} aria-label="breadcrumb">
      <Link href={EVENTS_ROUTE}>Events</Link>
      <Typography>Search events</Typography>
      {event ? <Typography>{event.name}</Typography> : null}
    </Breadcrumbs>
  );
};

export default EventBreadCrumbs;
