import Header from "@components/common/Header";
import SearchBar from "@components/common/SearchBar";
import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import EventsFilter from "@components/event/EventsFilter";
import { withFilters } from "@components/event/helpers/EventsPageBody";
import {
  Button,
  Drawer,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getSignedUpEventsUpcomingEvent } from "@redux/actions/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventData, EventFilterOptions, EventFilters } from "@type/event";
import { VolunteerData } from "@type/volunteer";
import React, { FC, useEffect, useState } from "react";
import EventsGrid from "../EventsGrid";

const useStyles = makeStyles((theme) => ({
  box: {
    marginBottom: "1rem",
    lineHeight: "2rem",
  },
  card: {
    display: "flex",
  },
  filterResultsBtn: {
    background: "none",
    textTransform: "none",
    color: theme.palette.secondary.main,
  },
  drawer: {
    padding: "16px",
  },
}));

const UpcomingEvents: FC<{}> = () => {
  const theme = useTheme();
  const classes = useStyles();
  const screenSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const events: Array<EventData> = useAppSelector((state) =>
    state.event.event.upcomingEvent.ids
      .map((eid) => state.event.event.data[eid])
      .filter((event) => event)
  );
  const user: VolunteerData | null = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(
      getSignedUpEventsUpcomingEvent({
        eventType: "upcoming",
        userId: user?._id,
      })
    );
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
  const [search, setSearch] = useState("");
  const filteredSearchedEvents = filteredEvents.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  if (screenSm) {
    return (
      <>
        <Header title="Upcoming Events" />
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <SearchBar
              setFilterFunction={(searchText: string) => setSearch(searchText)}
            />
          </Grid>
          <Grid item container xs={12} justify="space-between">
            <Grid item>
              <Box className={classes.box} fontWeight="bold">
                <Typography display="inline" color="secondary">
                  {events ? events.length : 0}
                </Typography>
                <Typography display="inline" variant="body2">
                  {" "}
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
          <EventsGrid
            events={filteredSearchedEvents}
            type="my-upcoming-events"
          />
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
      <Header title="Upcoming Events" />
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <EventBreadCrumbs />
        </Grid>
        <Grid item container sm={12} alignItems="center" spacing={4}>
          <Grid item sm={9}>
            <SearchBar
              setFilterFunction={(searchText: string) => setSearch(searchText)}
            />
          </Grid>
        </Grid>
        <Grid item container sm={9} spacing={4}>
          <Grid item sm={12}>
            <Box className={classes.box} fontWeight="bold">
              <Typography display="inline" color="secondary">
                {events ? events.length : 0}
              </Typography>
              <Typography display="inline" variant="body2">
                {" "}
                Upcoming Events
              </Typography>
            </Box>
          </Grid>
          <EventsGrid
            events={filteredSearchedEvents}
            type="my-upcoming-events"
          />
        </Grid>
        <Grid item sm={3}>
          <div style={{ width: "100%" }}>
            <EventsFilter filters={filters} setFilters={setFilters} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UpcomingEvents;
