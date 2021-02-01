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
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import EventsFilter from '@components/event/EventsFilter';
import { withFilters } from '@utils/helpers/event/EventsPageBody';
import { useRouter } from 'next/router';
import { VolunteerData } from '@type/volunteer';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedUpEventsPastEvent } from '@redux/actions/event';
import { StoreState } from '@redux/store';
import { EVENTS_ROUTE, LOGIN_ROUTE } from '@constants/routes';
import PastEventCard from './PastEventCard';

const useStyles = makeStyles((theme) => ({
  box: {
    marginBottom: '1rem',
    lineHeight: '2rem',
  },
  card: {
    display: 'flex',
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

const PastEventsPageBody: FC<{}> = () => {
  const theme = useTheme();
  const router = useRouter();
  const classes = useStyles();
  const screenSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const events: Array<EventData> = useSelector((state: StoreState) => state.event.pastEvent.ids
    .map((eid) => state.event.data[eid])
    .filter((event) => event));
  const user: VolunteerData | null = useSelector((state: StoreState) => state.user.user);

  useEffect(() => {
    dispatch(getSignedUpEventsPastEvent({ userId: user._id, eventType: "past" }));
  }, []);

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
  const filteredEvents = withFilters(events || [], filters);

  // TODO move filters search to redux
  const [search, setSearch] = useState('');
  const filteredSearchedEvents = filteredEvents.filter((event) => event.name.toLowerCase().includes(search.toLowerCase()));

  const handleCardClick = useCallback((eventId: string) => {
    if (user) {
      router.push(`${EVENTS_ROUTE}/${eventId}`);
    } else {
      router.push(LOGIN_ROUTE);
    }
  }, [user]);

  if (screenSm) {
    return (
      <>
        <Grid
          container
          spacing={4}
        >
          <Grid item xs={12}>
            <SearchBar setFilterFunction={(searchText: string) => setSearch(searchText)} />
          </Grid>
          <Grid item container xs={12} justify="space-between">
            <Grid item>
              <Box className={classes.box} fontWeight="bold">
                <Typography display="inline" color="secondary">
                  {events ? events.length : 0}
                </Typography>
                <Typography display="inline" variant="body2">
                  {' '}
                  Past Events
                </Typography>
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
            {filteredSearchedEvents?.map((event) => (
              <Grid key={event._id} item className={classes.card} sm={6} md={4}>
                <PastEventCard
                  key={event._id}
                  event={event}
                  onCardClick={() => handleCardClick(event._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box m={8}>
            <EventsFilter filters={filters} setFilters={setFilters} />
          </Box>
        </Drawer>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        spacing={4}
      >
        <Grid item sm={12}>
          <EventBreadCrumbs />
        </Grid>
        <Grid item container sm={12} alignItems="center" spacing={4}>
          <Grid item sm={9}>
            <SearchBar setFilterFunction={(searchText: string) => setSearch(searchText)} />
          </Grid>
        </Grid>
        <Grid item container sm={9} spacing={4}>
          <Grid item sm={12}>
            <Box className={classes.box} fontWeight="bold">
              <Typography display="inline" color="secondary">
                {events ? events.length : 0}
              </Typography>
              <Typography display="inline" variant="body2">
                {' '}
                Past Events
              </Typography>
            </Box>
          </Grid>
          <Grid item container sm={12} spacing={2}>
            {filteredSearchedEvents?.map((event) => (
              <Grid key={event._id} item className={classes.card} sm={6} md={4}>
                <PastEventCard
                  key={event._id}
                  event={event}
                  onCardClick={() => router.push(`/event/${event._id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <div style={{ width: '100%' }}>
            <EventsFilter filters={filters} setFilters={setFilters} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PastEventsPageBody;
