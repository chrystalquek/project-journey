import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
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
import AdminEvent from '@components/admin/AdminEvent';
import AdminEventsFilter from '@components/admin/AdminEventsFilter';

import dayjs from 'dayjs';

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

const AdminEventsPage: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const theme = useTheme();
  const classes = useStyles();
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

  useEffect(() => {
    getAdminEvents();
  }, []);

  if (screenSmall) {
    return (
      <Container fixed>
        <Grid container>
          <Grid item sm={12}><SearchBar setFilterFunction={() => console.log('TODO')} /></Grid>
          <Grid item container sm={12} direction="row" justify="center" alignItems="center">
            <Button disableRipple className={classes.createEventBtn}>Create new event</Button>
          </Grid>
          <Grid item container sm={12} justify="space-between">
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
          <Grid container spacing={4}>
            {events?.map((event) => (
              <Grid item className={classes.card} sm={6} md={4}>
                <AdminEvent key={event.name + event.description} event={event} />
              </Grid>
            ))}
          </Grid>
          <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <Box m={8}>
              <AdminEventsFilter filters={filters} setFilters={setFilters} />
            </Box>
          </Drawer>
        </Grid>
      </Container>
    );
  }
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item sm={12}><AdminBreadCrumbs /></Grid>
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
            {events?.map((event) => (
              <Grid key={JSON.stringify(event)} item className={classes.card} sm={6} md={4}>
                <AdminEvent key={JSON.stringify(event)} event={event} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Box mb={4}>
            <Button disableRipple className={classes.createEventBtn}>Create new event</Button>
          </Box>
          <AdminEventsFilter filters={filters} setFilters={setFilters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminEventsPage;
