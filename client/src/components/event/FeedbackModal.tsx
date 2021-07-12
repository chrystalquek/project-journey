import {
  Button,
  IconButton,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import React, { FC, useCallback, useEffect, useState } from "react";
import { testEventImage1 } from "@utils/constants/imagePaths";
import { EventButton } from "@components/common/event/EventButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import dayjs from "dayjs";
import Checkbox from "@material-ui/core/Checkbox";
import { useAppDispatch, useAppSelector } from "@redux/store";
import {
  getEventFeedbackFormQuestions,
  submitEventFeedbackFormQuestions,
} from "@redux/actions/form";
import FormGenerator from "@components/form/FormGenerator";

export type FEEDBACK_STATE = "prompt" | "fields" | "success";

type FeedbackModalProps = {
  title: string;
  imageUrl: string;
  eventDate: Date;
  description: string;
  isOpen: boolean;
  eventId: string;
  initialState: FEEDBACK_STATE;
  onClose: () => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    maxWidth: "100%",
    height: "500px",
    maxHeight: "100%",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    background: "white",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    display: "flex",
    flex: 1,
    padding: "54px 86px 54px 86px",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  title: {
    marginBottom: theme.spacing(8),
    textAlign: "left",
  },
  imageContainer: {
    marginBottom: theme.spacing(3),
  },
  dateTimeContainer: {
    marginBottom: theme.spacing(6),
  },
  feedbackButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "16px",
    textTransform: "none",
    padding: "6px 16px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    width: "270px",
  },
  footer: {
    marginTop: theme.spacing(5),
    alignSelf: "center",
  },
  submitFeedback: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  textBoxTitle: {
    marginBottom: theme.spacing(3),
  },
  textBox: {
    width: "100%",
  },
  submittedRoot: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkIcon: {
    fontSize: "100px",
    color: theme.palette.primary.main,
  },
  image: {
    width: "100%",
    height: "250px",
    borderRadius: "10px",
  },
}));

const FeedbackModal: FC<FeedbackModalProps> = ({
  title,
  imageUrl,
  eventDate,
  description,
  isOpen,
  initialState,
  eventId,
  onClose,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [feedbackState, setFeedbackState] =
    useState<FEEDBACK_STATE>(initialState);
  const [checked, setChecked] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user.user);
  const questions = useAppSelector((state) => state.form.questions);

  // Load form when opening modal
  useEffect(() => {
    dispatch(getEventFeedbackFormQuestions(eventId));
  }, [dispatch, eventId]);

  const navigateToFeedback = () => {
    setFeedbackState("fields");
  };

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      const answers = Object.keys(values).map((key) => ({
        questionId: key,
        userId: user._id,
        content: values[key],
      }));

      dispatch(
        submitEventFeedbackFormQuestions({
          answers,
          eventId,
        })
      );

      setFeedbackState("success");
    },
    [user, eventId, dispatch]
  );

  const date = dayjs(eventDate).format("ddd, DD MMMM YYYY");
  const time = dayjs(eventDate).format("h.mma");

  const renderModalContent = (stateFeedback: FEEDBACK_STATE) => {
    switch (stateFeedback) {
      case "prompt":
        return (
          <div className={classes.root}>
            <Button className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </Button>
            <div className={classes.title}>
              <Typography variant="h2" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </div>
            <div className={classes.imageContainer}>
              <img
                src={imageUrl ?? testEventImage1}
                className={classes.image}
                alt="imagecover"
              />
            </div>
            <div className={classes.dateTimeContainer}>
              <Typography style={{ fontWeight: "bold" }}>
                Date:
                {` ${date}`}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Time:
                {` ${time}`}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">{description}</Typography>
            </div>
            <div className={classes.footer}>
              <Typography
                style={{ fontWeight: "bold" }}
                className={classes.submitFeedback}
              >
                How was the event?
              </Typography>
              <EventButton
                onClick={navigateToFeedback}
                className={classes.feedbackButton}
                type="submit"
              >
                Submit Feedback
              </EventButton>
            </div>
          </div>
        );
      case "fields":
        return (
          <form onSubmit={() => {}}>
            <div className={classes.root}>
              <div className={classes.title}>
                <Typography variant="h2" style={{ fontWeight: "bold" }}>
                  Submitting Feedback for: {title}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" className={classes.textBoxTitle}>
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  I would like to submit my feedback annonymously
                </Typography>
              </div>
              <FormGenerator
                handleSubmit={handleSubmit}
                questionsList={questions}
                validationObj={{}}
              />
            </div>
          </form>
        );
      case "success":
        return (
          <div className={classes.root}>
            <div className={classes.submittedRoot}>
              <IconButton>
                <CheckCircleOutlineIcon className={classes.checkIcon} />
              </IconButton>
              <div>
                <Typography
                  variant="h2"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Your Feedback has been submitted! Thank you for your feedback
                </Typography>
              </div>
              <div>
                <EventButton
                  onClick={onClose}
                  className={classes.feedbackButton}
                >
                  Back Home
                </EventButton>
              </div>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        overflow: "scroll",
      }}
    >
      {renderModalContent(feedbackState)}
    </Modal>
  );
};

export default FeedbackModal;
