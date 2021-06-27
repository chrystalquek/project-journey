import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { deleteEvent } from "@redux/actions/event";
import { useAppDispatch } from "@redux/store";
import { EDIT_EVENT_FORM_ROUTE } from "@constants/routes";

const useStyles = makeStyles((theme) => ({
  editButton: {
    borderRadius: "20px",
    textTransform: "none",
  },
  deleteButton: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
    },
    borderRadius: "20px",
    textTransform: "none",
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const EventDetailsAdminButtons = ({ event }) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteEvent = async () => {
    dispatch(deleteEvent(event._id));
    router.push("/event");
  };

  return (
    <Grid item container direction="row" justify="flex-start" spacing={5}>
      <Grid item>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={() => router.push(EDIT_EVENT_FORM_ROUTE(event._id))}
          className={classes.editButton}
        >
          <Typography variant="body1">Edit Event</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={() => handleDeleteEvent()}
          className={classes.deleteButton}
        >
          <Typography variant="body1">Delete Event</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventDetailsAdminButtons;
