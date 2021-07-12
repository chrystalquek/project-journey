import { EventTypography } from "@components/common/event/EventTypography";
import {
  ALL_VOLUNTEERS_TAG,
  COMMITTED_VOLUNTEER_TAG,
} from "@components/event/index";
import { EVENTS_ROUTE, LOGIN_ROUTE } from "@constants/routes";
import { CardActions, Chip, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useAppSelector } from "@redux/store";
import { EventData } from "@type/event";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import { testEventImage3 } from "@utils/constants/imagePaths";
import { formatDateStartEndTime } from "@utils/helpers/date";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

const useStyles = makeStyles(() => ({
  card: {
    width: "25rem",
  },
  media: {
    objectFit: "cover",
    height: "12rem",
  },
  cardAction: {
    flexWrap: "wrap",
  },
  committedTag: {
    borderRadius: "10px",
    opacity: 0.85,
  },
}));

type Props = {
  event: EventData;
  CardContentInfoComponent?: () => JSX.Element;
  CardFooterComponent?: () => JSX.Element;
};

const EventCard: FC<Props> = ({
  event,
  CardContentInfoComponent,
  CardFooterComponent,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const user: VolunteerData | null = useAppSelector((state) => state.user.user);

  const dateTime = formatDateStartEndTime(
    new Date(event.startDate),
    new Date(event.endDate)
  );

  const handleCardClick = useCallback(() => {
    if (user) {
      router.push(`${EVENTS_ROUTE}/${event._id}`);
    } else {
      router.push(LOGIN_ROUTE);
    }
  }, [user, router, event._id]);

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="EventCard"
          image={event?.coverImage ?? testEventImage3}
          title={event && event.name ? event.name : "EventCard"}
        />
        <CardContent>
          <EventTypography
            gutterBottom
            fontBold
            text={event && event.name ? event.name : "No event name provided"}
          />
          <EventTypography text={dateTime || "No date provided"} />
          {CardContentInfoComponent && <CardContentInfoComponent />}
        </CardContent>
      </CardActionArea>
      {CardFooterComponent && <CardFooterComponent />}
      <CardActions className={classes.cardAction}>
        {event?.volunteerType === VolunteerType.COMMITTED && (
          <Chip
            color="secondary"
            size="small"
            label={COMMITTED_VOLUNTEER_TAG}
            className={classes.committedTag}
          />
        )}
        {event?.volunteerType === VolunteerType.ADHOC && (
          <Chip color="primary" size="small" label={ALL_VOLUNTEERS_TAG} />
        )}
      </CardActions>
    </Card>
  );
};

export default EventCard;
