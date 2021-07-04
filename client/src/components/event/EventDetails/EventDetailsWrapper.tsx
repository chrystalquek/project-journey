import EventBreadCrumbs from "@components/event/EventBreadCrumbs";
import SideNav from "@components/event/EventDetails/SideNav";
import {
  AppBar,
  Box,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import theme from "@styles/theme";
import { EventData } from "@type/event";
import React, { FC } from "react";

type EventDetailsWrapperProps = {
  event: EventData;
};

const useStyles = makeStyles({
  appBar: {
    boxShadow: "none",
    backgroundColor: "white",
  },
  toolbar: {
    paddingLeft: 0,
  },
});

const EventDetailsWrapper: FC<EventDetailsWrapperProps> = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { event, children } = props;

  return (
    <Container fixed>
      <Grid container direction="row" wrap="nowrap">
        {isDesktop && (
          <Grid item xs={1}>
            <SideNav selected="details" />
          </Grid>
        )}
        <Grid
          item
          xs={isDesktop ? 10 : 12}
          style={{
            paddingLeft: isDesktop ? theme.spacing(9) : 0,
            paddingRight: isDesktop ? theme.spacing(10) : 0,
          }}
        >
          <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
              <EventBreadCrumbs eid={event._id} />
            </Toolbar>
          </AppBar>
          <Box>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export { EventDetailsWrapper };
