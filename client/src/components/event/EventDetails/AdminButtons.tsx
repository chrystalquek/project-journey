import Button from "@components/common/Button";
import { EDIT_EVENT_FORM_ROUTE } from "@constants/routes";
import { Box, Dialog, makeStyles, Typography } from "@material-ui/core";
import { cancelEvent } from "@redux/actions/event";
import { useAppDispatch } from "@redux/store";
import theme from "@styles/theme";
import { EventData } from "@type/event";
import router from "next/router";
import React, { useCallback, useState } from "react";
import { getEventVacancies } from "../helpers/EventsPageBody";

type Props = {
  event: EventData;
};

const useStyles = makeStyles({
  button: {
    textTransform: "none",
    marginRight: theme.spacing(5),
    minWidth: 120,
  },
  dialog: {
    padding: theme.spacing(10),
    textAlign: "center",
  },
  greyText: {
    color: "rgba(0, 0, 0, 0.5)",
  },
});

const AdminButtons = ({ event }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const hasSignUps = getEventVacancies(event).filled === 0;
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isEventCancelled, setIsEventCancelled] = useState(false);

  const handleCancelEvent = useCallback(() => {
    dispatch(cancelEvent(event._id));
    setIsEventCancelled(true);
    setTimeout(() => {
      setIsCancelModalOpen(false);
    }, 3000);
  }, [dispatch, event._id]);

  return (
    <>
      <Button
        className={classes.button}
        onClick={() => router.push(EDIT_EVENT_FORM_ROUTE(event._id))}
      >
        Edit Event
      </Button>

      <Button
        className={classes.button}
        onClick={() => setIsCancelModalOpen(true)}
      >
        Cancel Event
      </Button>

      <Dialog
        onClose={() => setIsCancelModalOpen(false)}
        open={isCancelModalOpen}
      >
        <Box className={classes.dialog}>
          {!isEventCancelled ? (
            // eslint-disable-next-line
            <UnconfirmedModalContent {...{ event, hasSignUps }} />
          ) : (
            // eslint-disable-next-line
            <ConfirmedModalContent {...{ event, hasSignUps }} />
          )}

          {!isEventCancelled && (
            <Box mt={4}>
              <Button
                className={classes.button}
                onClick={() => setIsCancelModalOpen(false)}
              >
                No
              </Button>
              <Button
                className={`${classes.button}`}
                onClick={handleCancelEvent}
                secondary
              >
                Confirm
              </Button>
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
};

const UnconfirmedModalContent = ({
  event,
  hasSignUps,
}: Props & { hasSignUps: boolean }) => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography>Are you sure you want to cancel</Typography>
        <Typography style={{ fontWeight: "bold" }}>{event.name}</Typography>
      </Box>

      <Box mt={6}>
        {!hasSignUps ? (
          <Typography>Cancellation of event cannot be undone.</Typography>
        ) : (
          <>
            <Typography style={{ fontWeight: "bold" }}>
              Volunteers have already signed up for the event.
            </Typography>
            <Typography className={classes.greyText}>
              *Cancellation notification email will be sent to these volunteers
              upon cancellation
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

const ConfirmedModalContent = ({
  event,
  hasSignUps,
}: Props & { hasSignUps: boolean }) => (
  <>
    <Box>
      <Typography>You have successfully cancelled</Typography>
      <Typography style={{ fontWeight: "bold" }}>{event.name}</Typography>
    </Box>

    {hasSignUps && (
      <Box mt={6}>
        <Typography>
          Signed up volunteers will be automatically notified via email.{" "}
        </Typography>
      </Box>
    )}
  </>
);

export default AdminButtons;
