import { Grid, makeStyles } from '@material-ui/core';
import Event from '@components/event/Event';
import { FC, useEffect } from 'react';
import { EventData } from '@type/event';

type AdminEventsProps = {
  events: Array<EventData>,
};

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
});

const Events: FC<AdminEventsProps> = ({ events }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      {events?.map((event) => (
        <Grid item className={classes.card} xs={12} sm={6} md={4}>
          <Event key={event.name + event.description} event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;
