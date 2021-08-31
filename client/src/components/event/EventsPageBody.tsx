import Button from "@components/common/Button";
import SearchBar from "@components/common/SearchBar";
import EventsFilter from "@components/event/EventsFilter";
import { withFilters } from "@components/event/helpers/EventsPageBody";
import { CREATE_EVENT_FORM_ROUTE } from "@constants/routes";
import {
  Button as MuiButton,
  Drawer,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { EventData, EventFilterOptions, EventFilters } from "@type/event";
import { VolunteerData, VolunteerType } from "@type/volunteer";
import { useIsMobile } from "@utils/helpers/layout";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import EventBreadCrumbs from "./EventBreadCrumbs";
import EventsGrid from "./EventsGrid";

const useStyles = makeStyles((theme) => ({
  filterResultsBtn: {
    background: "none",
    textTransform: "none",
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      background: "none",
      textDecoration: "underline",
    },
  },
}));

type Props = {
  type: "public" | "my-upcoming-events" | "my-past-events";
  events: EventData[];
  user: VolunteerData | null;
};
const EventsPageBody = ({ type, events, user }: Props) => {
  const router = useRouter();
  const classes = useStyles();
  const isMobile = useIsMobile();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const onPressMobileFilterButton = useCallback(
    () => setIsDrawerOpen((isOpen) => !isOpen),
    []
  );

  // TODO move filters search to redux
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
  const filteredEvents = withFilters(events || [], filters);
  const [search, setSearch] = useState("");
  const filteredSearchedEvents = filteredEvents.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Grid
        container
        spacing={4}
        style={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        <Grid item xs={8} spacing={10}>
          {!isMobile && <EventBreadCrumbs />}

          <Grid item container alignItems="center" spacing={4}>
            {/* Search Bar */}
            <Grid item xs={12}>
              <SearchBar
                setFilterFunction={(searchText: string) =>
                  setSearch(searchText)
                }
              />
            </Grid>

            {/* Create New Event Button */}
            {user && user.volunteerType === VolunteerType.ADMIN && (
              <Grid item container xs={12} md={3}>
                <Button
                  disableRipple
                  onClick={() => router.push(CREATE_EVENT_FORM_ROUTE)}
                >
                  Create new event
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            spacing={4}
          >
            {/* Num Events */}
            <Grid item>
              <Typography display="inline" color="secondary">
                {filteredSearchedEvents ? filteredSearchedEvents.length : 0}
              </Typography>
              <Typography display="inline" variant="body2">
                {type !== "my-past-events"
                  ? ` Upcoming Events`
                  : ` Past Events`}
              </Typography>
            </Grid>

            {/* Filter Button (mobile) */}
            {isMobile && (
              <Grid item>
                <MuiButton
                  className={classes.filterResultsBtn}
                  onClick={onPressMobileFilterButton}
                >
                  Filter Results
                </MuiButton>
              </Grid>
            )}
          </Grid>
          {/* Events Grid */}
          <EventsGrid events={filteredSearchedEvents} type={type} />
        </Grid>

        {/* Filter - desktop */}
        {!isMobile && (
          <Grid item md={2}>
            <EventsFilter filters={filters} setFilters={setFilters} />
          </Grid>
        )}
      </Grid>

      {/* Filter - mobile */}
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
};

export default EventsPageBody;
