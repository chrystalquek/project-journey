import React, { FC, useEffect, useState } from 'react';
import {
  TextField, makeStyles, MenuItem, Typography, Grid, Button,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import PaddedGrid from '@components/common/PaddedGrid';
import DropZoneCard from '@components/common/DropZoneCard';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getEvent, editEvent } from '@redux/actions/event';
import dayjs from 'dayjs';
import { StoreState } from '@redux/store';
import { useFormik } from 'formik';

/** TO BE REPLACED - START */
const toCamel = (str) => str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const isObject = function (obj) {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
};

const keysToCamel = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(obj[k]);
      });

    return n;
  } if (Array.isArray(obj)) {
    return obj.map((i) => keysToCamel(i));
  }

  return obj;
};
/** TO BE REPLACED - END */

type AdminEventFormProps = {
  id: string,
  isNew: boolean,
}

const eventTypes = [
  { value: 'workshop', label: 'Workshop' },
  { value: 'hangout', label: 'Hangout' },
  { value: 'volunteering', label: 'Volunteering' },
];

const volunteerTypes = [
  { value: 'committed', label: 'Committed' },
  { value: 'ad-hoc', label: 'Ad-hoc' },
  { value: 'lead', label: 'Lead' },
  { value: 'admin', label: 'Admin' },
];

const getEventTypePlaceholder = (eventType) => {
  switch (eventType) {
    case 'workshop': return 'eg. Workshop: Facilitation 101';
    case 'hangout': return 'eg. Hangout Session';
    case 'volunteering': return 'eg. Volunteering: Session 4';
    default: throw new Error();
  }
};

const useStyles = makeStyles(() => ({
  coverImage: {
    width: '1010px',
    height: '369px',
  },
  facilPhotograph: {
    width: '215px',
    height: '225px',
  },
  button: {
    borderRadius: '20px',
    textTransform: 'none',
  },
}));

/**
 * Combine date and time as JSON string
 * @param date Date object representing date
 * @param time string representing time
 */
const getCombinedDateAndTimeString = (dateDayJs: dayjs.Dayjs, time: string): string => {
  const dateDayJsWithoutTime = dateDayJs.format('YYYY-MM-DD');
  return dayjs(`${dateDayJsWithoutTime} ${time}`).toISOString();
};

const validate = ({
  name, eventType, volunteerType, deadline, vacancies, description, facilitatorName,
  facilitatorPhoto, facilitatorDescription, roles, startDate, endDate,
}) => {
  const errors: any = {};

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!eventType) {
    errors.eventType = 'Event type is required';
  }

  if (!volunteerType) {
    errors.volunteerType = 'Volunteer type is required';
  }

  if (!deadline) {
    errors.deadline = 'Deadline is required';
  }

  if (!vacancies) {
    errors.deadline = 'Vacancies is required';
  }

  if (!description) {
    errors.description = 'Description is required';
  }

  if (eventType !== 'volunteering') {
    if (!facilitatorName) {
      errors.facilitatorName = 'Facilitator name is required';
    }

    if (!facilitatorDescription) {
      errors.facilitatorDescription = 'Facilitator description is required';
    }

    if (!facilitatorPhoto) {
      errors.facilitatorPhoto = 'Facilitator photo is required';
    }
  }

  if (!startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!endDate) {
    errors.endDate = 'End date is required';
  } else if (startDate < endDate) {
    errors.endDate = 'End date should be later than start date';
  }

  if (eventType === 'volunteering' && !roles) {
    errors.roles = 'Roles is required';
  } else if (roles.length <= 0) {
    errors.roles = 'Roles should be greater than 0.';
  }
};

const AdminEventForm: FC<AdminEventFormProps> = ({ id, isNew }) => {
  const classes = useStyles();
  const eventForm = useSelector((state: StoreState) => state.event.form);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getEvent(id));
    }
  }, [id]);

  const [initialValues, setInitialValues] = useState({
    name: '',
    coverImage: '',
    eventType: 'workshop',
    volunteerType: 'committed',
    deadline: dayjs().toISOString(),
    vacancies: 0,
    description: '',
    facilitatorName: '',
    facilitatorPhoto: '',
    facilitatorDescription: '',
    roles: [],
    contentUrl: '',
    contentType: 'pdf',
    location: '',
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
  });

  useEffect(() => {
    if (eventForm) {
      const camelCaseEventForm = keysToCamel(eventForm);
      const newFormData = {
        ...camelCaseEventForm,
        deadline: camelCaseEventForm.deadline,
        startDate: camelCaseEventForm.startDate,
        endDate: camelCaseEventForm.endDate,
      };
      setInitialValues(newFormData);
    }
  }, [eventForm]);

  const onSubmit = (values) => {
    if (isNew) {
      dispatch(createEvent(values));
      alert('Event Created!');
    } else {
      dispatch(editEvent({ data: values, id }));
      alert('Event Edited!');
    }
    // TODO: Confirm with designers what happens?
    // I think this should redirect on success to the Event Details page
  };

  const {
    errors, handleChange, handleSubmit, isSubmitting, setFieldValue, setValues, values,
  } = useFormik({ initialValues, validate, onSubmit });

  const {
    name, coverImage, eventType, volunteerType, deadline,
    vacancies, description, facilitatorName, facilitatorPhoto,
    facilitatorDescription, roles, contentUrl, contentType, startDate, endDate,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <PaddedGrid>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h1">{isNew ? 'Create Event' : 'Edit Event'}</Typography>
          </Grid>

          {/* Type of event */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Type of Event</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                select
                variant="outlined"
                margin="dense"
                id="type"
                type="text"
                fullWidth
                color="secondary"
                name="eventType"
                value={eventType}
                onChange={handleChange}
                helperText={errors.eventType}
              >
                {eventTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Cover Image */}
          <Grid item container>
            <div className={classes.coverImage}>
              <DropZoneCard isBig />
            </div>
          </Grid>

          {/* Name of event */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Name of Event</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="name"
                placeholder={getEventTypePlaceholder(eventType)}
                type="text"
                fullWidth
                color="secondary"
                name="name"
                value={name}
                onChange={handleChange}
                helperText={errors.name}
              />
            </Grid>
          </Grid>

          {/* Volunteer Type */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Volunteer Type</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                select
                variant="outlined"
                margin="dense"
                id="type"
                type="text"
                fullWidth
                color="secondary"
                name="volunteerType"
                value={volunteerType}
                onChange={handleChange}
                helperText={errors.volunteerType}
              >
                {volunteerTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Date - From & To */}
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Date</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={2}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-from"
                name="fromDate"
                value={dayjs(startDate)}
                onChange={(date) => setFieldValue('startDate', getCombinedDateAndTimeString(date, dayjs(startDate).format('HH:mm')))}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={2}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-to"
                name="toDate"
                value={dayjs(endDate)}
                onChange={(date) => setFieldValue('endDate', getCombinedDateAndTimeString(date, dayjs(endDate).format('HH:mm')))}
                color="secondary"
              />
            </Grid>
          </Grid>

          {/* Time - From & To */}
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Time</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="time"
                variant="outlined"
                name="fromTime"
                fullWidth
                value={dayjs(startDate).format('HH:mm')}
                margin="dense"
                onChange={(e) => setFieldValue('startDate', getCombinedDateAndTimeString(dayjs(startDate), e.target.value))}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                color="secondary"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="time"
                variant="outlined"
                name="toTime"
                fullWidth
                value={dayjs(endDate).format('HH:mm')}
                margin="dense"
                onChange={(e) => setFieldValue('endDate', getCombinedDateAndTimeString(dayjs(endDate), e.target.value))}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                color="secondary"
              />
            </Grid>
          </Grid>

          {/* Sign-up Deadline */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Sign-up Deadline</Typography>
            </Grid>
            <Grid item xs={12}>
              <KeyboardDateTimePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                margin="dense"
                value={deadline}
                onChange={handleChange}
                disablePast
                format="DD/MM/YYYY HH:mm"
                color="secondary"
              />
            </Grid>
          </Grid>

          {/* Number of Vacancies */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Number of Vacancies</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="type"
                placeholder="eg.20"
                type="text"
                fullWidth
                color="secondary"
                name="vacancies"
                value={vacancies}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Event Description */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Event Description</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="type"
                placeholder="Type something here..."
                type="text"
                fullWidth
                color="secondary"
                name="description"
                value={description}
                onChange={handleChange}
                multiline
                rows={15}
              />
            </Grid>
          </Grid>

          {eventType !== 'volunteering' && (
          <>
            <Grid item container>
              <Grid item xs={12}>
                <Typography variant="h4"> Name of Facilitator</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="type"
                  placeholder="eg. Ms Anna Soh"
                  type="text"
                  fullWidth
                  color="secondary"
                  name="facilitatorName"
                  value={facilitatorName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item container>
              <div className={classes.facilPhotograph}>
                <DropZoneCard isBig={false} onUploadImage={console.log('TODO')} />
              </div>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography variant="h4">Description of Facilitator</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="type"
                  placeholder="Type something here..."
                  type="text"
                  fullWidth
                  color="secondary"
                  name="facilitatorDescription"
                  value={facilitatorDescription}
                  onChange={handleChange}
                  multiline
                  rows={15}
                />
              </Grid>
            </Grid>
          </>
          )}

          {/* Create Event Button */}
          <Grid item container direction="row" justify="flex-end">
            <Button
              variant="contained"
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className={classes.button}
            >
              <Typography variant="body1">{isNew ? 'Create Event' : 'Edit Event'}</Typography>
            </Button>
          </Grid>
        </Grid>
      </PaddedGrid>
    </form>
  );
};

export default AdminEventForm;
