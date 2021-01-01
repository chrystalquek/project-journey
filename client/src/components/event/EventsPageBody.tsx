import Container from '@material-ui/core/Container';
import EventBreadCrumbs from '@components/event/EventBreadCrumbs';
import SearchBar from '@components/common/SearchBar';
import {
  Button,
  Drawer,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { EventData, EventFilterOptions, EventFilters } from '@type/event';
import { FC, useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import EventCard from '@components/event/EventCard';
import EventsFilter from '@components/event/EventsFilter';
import {withFilters} from "@utils/helpers/EventsPageBody";
import {useRouter} from "next/router";

type AdminEventsPageProps = {
  events: Array<EventData>,
  getAdminEvents: () => any,
};

const useStyles = makeStyles((theme) => ({
  box: {
    marginBottom: '1rem',
    lineHeight: '2rem',
  },
  card: {
    display: 'flex',
  },
  createEventBtn: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    textTransform: 'none',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  filterResultsBtn: {
    background: 'none',
    textTransform: 'none',
    color: theme.palette.secondary.main,
  },
  drawer: {
    padding: '16px',
  },
}));

const EventsPageBody: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const theme = useTheme();
  const router = useRouter();
  const classes = useStyles();
  const screenXs = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));

  const eventFilters: EventFilterOptions = {
    [EventFilters.DATE]: null,
    [EventFilters.VOLUNTEERTYPE]: {
      [EventFilters.ADHOC]: true,
      [EventFilters.COMMITTED]: true,
    },
    [EventFilters.EVENTTYPE]: {
      [EventFilters.HANGOUTS]: true,
      [EventFilters.WORKSHOPS]: true,
      [EventFilters.VOLUNTEERING]: true,
    },
  };
  const [filters, setFilters] = useState<EventFilterOptions>(eventFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filteredEvents = withFilters(events ? events : [], filters);

  useEffect(() => {
    getAdminEvents();
  }, []);

  if (screenXs || screenSm) {
    return (
      <Container fixed>
        <Grid container>
          <Grid item xs={12}><SearchBar setFilterFunction={() => console.log('TODO')} /></Grid>
          <Grid item container xs={12} direction="row" justify="center" alignItems="center">
            <Button disableRipple className={classes.createEventBtn}>Create new event</Button>
          </Grid>
          <Grid item container xs={12} justify="space-between">
            <Grid item>
              <Box className={classes.box} fontWeight="bold">
                <Typography display="inline" color="secondary">
                  {
                  events ? events.length : 0
}
                </Typography>
                {' '}
                Upcoming Events
              </Box>
            </Grid>
            <Grid item>
              <Button
                className={classes.filterResultsBtn}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                Filter Results
              </Button>
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={4}>
            {filteredEvents?.map((event) => (
              <Grid key={event._id} item className={classes.card} sm={6} md={4}>
                <EventCard key={event._id}
                           event={event}
                           onCardClick={() => router.push(`/event/${event._id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box m={8}>
            <EventsFilter filters={filters} setFilters={setFilters} />
          </Box>
        </Drawer>
      </Container>
    );
  }
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item sm={12}><EventBreadCrumbs /></Grid>
        <Grid item container sm={9}>
          <Grid item sm={12}><SearchBar setFilterFunction={() => console.log('TODO')} /></Grid>
          <Grid item sm={12}>
            <Box className={classes.box} fontWeight="bold">
              <Typography display="inline" color="secondary">
                {
                  events ? events.length : 0
}
              </Typography>
              {' '}
              Upcoming Events
            </Box>
          </Grid>
          <Grid item container sm={12} spacing={2}>
            {filteredEvents?.map((event) => (
              <Grid key={event._id} item className={classes.card} sm={6} md={4}>
                <EventCard key={event._id}
                           event={event}
                           onCardClick={() => router.push(`/event/${event._id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Box mb={4}>
            <Button disableRipple className={classes.createEventBtn}>Create new event</Button>
          </Box>
          <EventsFilter filters={filters} setFilters={setFilters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventsPageBody;
