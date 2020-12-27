import Container from '@material-ui/core/Container';
import AdminBreadCrumbs from '@components/admin/AdminBreadCrumbs';
import SearchBar from '@components/common/SearchBar';
import AdminEvents from '@components/admin/AdminEvents';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {EventData, EventFilterOptions} from "@type/event";
import {FC, useEffect, useState} from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from '@material-ui/core/styles';
import AdminEvent from "@components/admin/AdminEvent";
import AddIcon from '@material-ui/icons/Add';
import AdminEventsFilter from "@components/admin/AdminEventsFilter";
import {EventFilters} from '@type/event'
import dayjs from "dayjs";

type AdminEventsPageProps = {
  events: Array<EventData>,
  getAdminEvents: () => any,
};

const useStyles = makeStyles(theme => ({
  box: {
    marginBottom: '1rem',
    lineHeight: '2rem'
  },
  card: {
    display: 'flex'
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    textTransform: 'none',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    },
    marginBottom: '2rem',
  }
}))

const AdminEventsPage: FC<AdminEventsPageProps> = ({ events, getAdminEvents }) => {
  const theme = useTheme();
  const classes = useStyles();
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));

  // Event filters
  const eventFilters: EventFilterOptions = {
    [EventFilters.DATE]: dayjs(new Date()),
    [EventFilters.VOLUNTEERTYPE]: {
      [EventFilters.ADHOC]: false,
      [EventFilters.COMMITTED]: false,
    },
    [EventFilters.EVENTTYPE]: {
      [EventFilters.HANGOUTS]: false,
      [EventFilters.WORKSHOPS]: false,
      [EventFilters.VOLUNTEERING]: false
    }
  };
  const [filters, setFilters] = useState<EventFilterOptions>(eventFilters);

  useEffect(() => {
    getAdminEvents()
  }, [])

  if (screenSmall) {
    return (
      <Container fixed>
        <AdminBreadCrumbs />
        <SearchBar />
        <Button variant="contained">Click me!</Button>
        <Box className={classes.box} fontWeight='bold'>
          <Typography display='inline' color='secondary'>{
            events ? events.length : 0}
          </Typography> Upcoming Events
        </Box>
        <Grid container spacing={4}>
          {events?.map((event) => (
            <Grid item className={classes.card} sm={6} md={4}>
              <AdminEvent key={event.name+event.description} event={event} />
            </Grid>
          ))}
        </Grid>
        {/*// TODO: The pull out drawer*/}
      </Container>
    )
  } else {
    return (
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item sm={12}><AdminBreadCrumbs/></Grid>
          <Grid item container sm={9}>
            <Grid item sm={12}><SearchBar/></Grid>
            <Grid item sm={12}>
              <Box className={classes.box} fontWeight='bold'>
                <Typography display='inline' color='secondary'>{
                  events ? events.length : 0}
                </Typography> Upcoming Events
              </Box>
            </Grid>
            <Grid item container sm={12} spacing={2}>
              {events?.map((event) => (
                <Grid  key={JSON.stringify(event)} item className={classes.card} sm={6} md={4}>
                  <AdminEvent key={JSON.stringify(event)} event={event} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item sm={3}>
            <Button disableRipple className={classes.button}>Create new event</Button>
            <AdminEventsFilter filters={filters} setFilters={setFilters} />
          </Grid>
        </Grid>

      </Container>
    );
  }
};

export default AdminEventsPage;
