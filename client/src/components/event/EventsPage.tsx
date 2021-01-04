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
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import Event from '@components/event/Event';
import EventsFilter from '@components/event/EventsFilter';
import { withFilters } from '@utils/helpers/EventsPage';

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

const EventsPage: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));

  const eventFilters: EventFilterOptions = {
    [EventFilters.DATE]: null,
    [EventFilters.VOLUNTEERTYPE]: {
      [EventFilters.ADHOC]: false,
      [EventFilters.COMMITTED]: false,
    },
    [EventFilters.EVENTTYPE]: {
      [EventFilters.HANGOUTS]: false,
      [EventFilters.WORKSHOPS]: false,
      [EventFilters.VOLUNTEERING]: false,
    },
  };
  const [filters, setFilters] = useState<EventFilterOptions>(eventFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filteredEvents = withFilters(events || [], filters);

  useEffect(() => {
    getAdminEvents(); // TODO need to put volunteerType
    // http://localhost:5000/volunteer/?pageNo=0&size=10&volunteerType=%2Cad-hoc%2Ccommitted%2Clead%2Cadmin
  }, []);

  if (screenSmall) {
    return (
      <Container fixed>
        <Grid container>
          <Grid item sm={12}><SearchBar setFilterFunction={() => console.log('TODO')} /></Grid>
          <Grid item container sm={12} direction="row" justify="center" alignItems="center">
            <Button disableRipple className={classes.createEventBtn} onClick={() => router.push('/form')}>Create new event</Button>
          </Grid>
          <Grid item container sm={12} justify="space-between">
            <Grid item>
              <Box className={classes.box} fontWeight="bold">
                <Typography display="inline" color="secondary">
                  {
                    events ? events.length : 0
                  }
                </Typography>
                <Typography display='inline' variant='body2'>
                  {' '}
                  Upcoming Events
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
          <Grid container spacing={4}>
            {filteredEvents?.map((event) => (
              <Grid item className={classes.card} sm={6} md={4}>
                <Event key={event.name + event.description} event={event} />
              </Grid>
            ))}
          </Grid>
          <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <Box m={8}>
              <EventsFilter filters={filters} setFilters={setFilters} />
            </Box>
          </Drawer>
        </Grid>
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
              <Typography display='inline' variant='body2'>
                {' '}
                Upcoming Events
              </Typography>
            </Box>
          </Grid>
          <Grid item container sm={12} spacing={2}>
            {filteredEvents?.map((event) => (
              <Grid key={JSON.stringify(event)} item className={classes.card} sm={6} md={4}>
                <Event key={JSON.stringify(event)} event={event} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Box mb={4}>
            <Button disableRipple className={classes.createEventBtn} onClick={() => router.push('/admin/create-event')}>Create new event</Button>
          </Box>
          <EventsFilter filters={filters} setFilters={setFilters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventsPage;
