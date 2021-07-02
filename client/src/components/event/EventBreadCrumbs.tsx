import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { FC } from "react";
import { EVENTS_ROUTE } from "@utils/constants/routes";
import { EventData } from "@type/event";
import { getStoreEvent } from "@components/event/helpers";

type EventBreadCrumbsProps = {
  eid?: string;
};

const EventBreadCrumbs: FC<EventBreadCrumbsProps> = ({ eid }) => {
  const event: EventData | null = getStoreEvent(eid);

  return (
    <Breadcrumbs separator=">" color="textPrimary" aria-label="breadcrumb">
      <Typography>Events</Typography>
      <Link color="textPrimary" href={EVENTS_ROUTE}>
        Search events
      </Link>
      {event ? <Typography>{event.name}</Typography> : null}
    </Breadcrumbs>
  );
};

export default EventBreadCrumbs;
