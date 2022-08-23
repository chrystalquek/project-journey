import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { FC } from "react";
import { EVENTS_ROUTE } from "@utils/constants/routes";

type EventBreadCrumbsProps = {
  name?: string;
};

const EventBreadCrumbs: FC<EventBreadCrumbsProps> = ({ name }) => (
  <Breadcrumbs separator=">" color="textPrimary" aria-label="breadcrumb">
    <Typography>Events</Typography>
    <Link color="textPrimary" href={EVENTS_ROUTE}>
      Search events
    </Link>
    {name && <Typography>{name}</Typography>}
  </Breadcrumbs>
);
export default EventBreadCrumbs;
