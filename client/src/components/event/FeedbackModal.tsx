import {
  Button, makeStyles, Modal, Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { testEventImage1 } from '@constants/imagePaths';
import { EventButton } from '@components/common/event/EventButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import dayjs from 'dayjs';

export type FEEDBACK_STATE = 'prompt' | 'fields' | 'success'

type FeedbackModalProps = {
  title: string
  imageUrl: string
  eventDate: Date
  description: string
  isOpen: boolean
  onClose: () => void
  // onSubmitFeedback: () => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    maxWidth: '100%',
    height: '500px',
    maxHeight: '100%',
    borderRadius: '10px',
    top: '50%',
    left: '50%',
    background: 'white',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    display: 'flex',
    flex: 1,
    padding: '54px 86px 54px 86px',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing(8),
    textAlign: 'left',
  },
  imageContainer: {
    marginBottom: theme.spacing(3),
  },
  dateTimeContainer: {
    marginBottom: theme.spacing(6),
  },
  feedbackButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    textTransform: 'none',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    width: '270px',
  },
  footer: {
    marginTop: theme.spacing(5),
    alignSelf: 'center',
  },
  submitFeedback: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textBoxTitle: {
    marginBottom: theme.spacing(3),
  },
  textBox: {
    width: '100%',
  },
}));

const FeedbackModal: FC<FeedbackModalProps> = ({
  title,
  imageUrl,
  eventDate,
  description,
  isOpen,
  onClose,
  // onSubmitFeedback,
}) => {
  const classes = useStyles();
  const [feedbackState, setFeedbackState] = useState<FEEDBACK_STATE>('prompt');
  const [starRating, setStarRating] = useState<number>(0);

  const navigateToFeedback = () => {
    setFeedbackState('fields');
  };

  const handleSubmit = () => {
    setFeedbackState('success');
    console.log('success');
  };

  const date = dayjs(eventDate).format('ddd, DD MMMM YYYY');
  const time = dayjs(eventDate).format('h.mma');

  const renderModalContent = (stateFeedback: FEEDBACK_STATE) => {
    switch (stateFeedback) {
      case 'prompt':
        return (
          <div className={classes.root}>
            <Button
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </Button>
            <div className={classes.title}>
              <Typography variant="h2">
                {title}
              </Typography>
            </div>
            <div className={classes.imageContainer}>
              <img
                src={imageUrl ?? testEventImage1}
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '10px',
                }}
                alt="imagecover"
              />
            </div>
            <div className={classes.dateTimeContainer}>
              <Typography variant="h4">
                Date:
                {` ${date}`}
              </Typography>
              <Typography variant="h4">
                Time:
                {` ${time}`}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                {description}
              </Typography>
            </div>
            <div className={classes.footer}>
              <Typography variant="h4" className={classes.submitFeedback}>
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
      case 'fields':
        return (
          <form onSubmit={() => {}}>
            <div className={classes.root}>
              <div className={classes.title}>
                <Typography variant="h2">
                  Submitting Feedback for:
                  {' '}
                  {title}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" className={classes.textBoxTitle}>
                  How would you rate the event?
                </Typography>
                <Rating
                  name="rating"
                  value={starRating}
                  onChange={(_, newValue) => {
                    setStarRating(newValue);
                  }}
                  className={classes.textBoxTitle}
                />
              </div>
              <div>
                <Typography variant="body2" className={classes.textBoxTitle}>
                  How can we improve?
                </Typography>
                <TextField
                  id="improvement"
                  multiline
                  rows={4}
                  variant="filled"
                  className={classes.textBox}
                />
              </div>
              <div>
                <Typography variant="body2" className={classes.textBoxTitle}>
                  Additional Remarks
                </Typography>
                <TextField
                  id="remarks"
                  multiline
                  rows={4}
                  variant="filled"
                  className={classes.textBox}
                />
              </div>
              <div
                className={classes.footer}
                style={{
                  alignSelf: 'flex-end',
                }}
              >
                <EventButton
                  onSubmit={() => {
                    setFeedbackState('success');
                    console.log('success');
                  }}
                  onClick={handleSubmit}
                  className={classes.feedbackButton}
                  // type="submit"
                >
                  Submit
                </EventButton>
              </div>
            </div>
          </form>

        );
      case 'success':
        return (
          <div className={classes.root}>
            <div style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            >
              <IconButton
                iconStyle={styles.largeIcon}
              >
                <CheckCircleOutlineIcon fontSize="large" />
              </IconButton>
              <div>
                <CheckCircleOutlineIcon fontSize="large" />
              </div>
              <div>
                Your Feedback has been submitted!
                Thank you for your feedback
              </div>
              <div>
                <EventButton
                  onSubmit={handleSubmit}
                  className={classes.feedbackButton}
                  type="submit"
                >
                  Submit
                </EventButton>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <></>
        );
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      {renderModalContent(feedbackState)}
    </Modal>
  );
};

export default FeedbackModal;
