import React, { FC, useEffect, useState } from 'react';
import {
  TextField, makeStyles, MenuItem, Typography, Grid, Button,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import PaddedGrid from '@components/common/PaddedGrid';
import DropZoneCard from '@components/common/DropZoneCard';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getEvent, editEvent } from '@redux/actions/event';
import { uploadImage } from '@redux/actions/image';
import dayjs from 'dayjs';
import { StoreState } from '@redux/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import keysToCamel from '@utils/helpers/keysToCamel';

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

const validationSchema = yup.object({
  eventType: yup
    .string()
    .required('Event type is required'),
  name: yup
    .string()
    .required('Name is required'),
  volunteerType: yup
    .string()
    .required('Volunteer type is required'),
  deadline: yup
    .date()
    .required('Deadline is required'),
  vacancies: yup
    .number()
    .required('Vacancies is required'),
  description: yup
    .string()
    .required('Description is required'),
  startDate: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .required('Start date is required')
    .when('startDate', (startDate, schema) => startDate && schema.min(startDate, 'End date should be later than start date')),
  facilitatorName: yup
    .string()
    .when('eventType', {
      is: 'volunteering',
      then: yup.string().required('Facilitator name is required'),
    }),
  facilitatorDescription: yup
    .string()
    .when('eventType', {
      is: 'volunteering',
      then: yup.string().required('Facilitator description is required'),
    }),
  roles: yup
    .array()
    .when('eventType', {
      is: 'volunteering',
      then: yup.array().required('Roles is required'),
    }),
});

const emptyForm = {
  name: '',
  coverImage: '',
  eventType: 'workshop',
  volunteerType: 'committed',
  deadline: dayjs().toISOString(),
  vacancies: '',
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
};

const AdminEventForm: FC<AdminEventFormProps> = ({ id, isNew }) => {
  const classes = useStyles();
  const eventForm: any = useSelector((state: StoreState) => state.event.form);
  // TODO: remove any typing after all is changed to camel
  const user = useSelector((state:StoreState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const imageState = useSelector((state: StoreState) => state.image);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getEvent(id));
    }
  }, [id]);

  useEffect(() => {

  }, [imageState]);

  const onUploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', user.user.email);

    const response = await dispatch(uploadImage(formData));
    return response;
  };

  const {
    errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue, values,
  } = useFormik({
    initialValues: eventForm ? keysToCamel(eventForm) : emptyForm,
    validationSchema,
    onSubmit: async (formValues) => {
      const form = formValues;

      // Upload and get cover image URL
      if (formValues.coverImage && typeof formValues.coverImage !== 'string') {
        const res = await onUploadImage(formValues.coverImage);
        // @ts-ignore type exists
        form.coverImage = res?.payload.url;
      }

      // Upload and get facilitator photo URL
      if (formValues.facilitatorPhoto && typeof formValues.facilitatorPhoto !== 'string') {
        const res = await onUploadImage(formValues.facilitatorPhoto);
        // @ts-ignore type exists
        form.facilitatorPhoto = res?.payload.url;
      }

      const response = await dispatch(isNew ? createEvent(form) : editEvent({ data: form, id }));

      // @ts-ignore type exists
      if (response?.type === 'event/createEvent/fulfilled' || response?.type === 'event/editEvent/fulfilled') {
        alert('Success');
        router.push('/event');
      }
    },
    enableReinitialize: true,
  });

  const onChangeImage = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setFieldValue(fieldName, image);
      return URL.createObjectURL(image);
    }
  };

  const {
    name, eventType, volunteerType, deadline,
    vacancies, description, facilitatorName, facilitatorDescription,
    startDate, endDate,
  } = values;

  if (id !== 'new' && eventForm === null) { return <h1>Loading</h1>; }
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
            <Grid item xs={6} md={2}>
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
                error={touched.eventType && Boolean(errors.eventType)}
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
              <DropZoneCard
                id="coverImage"
                initialUrl={eventForm?.cover_image}
                isBig
                onChangeImage={(e) => onChangeImage(e, 'coverImage')}
              />
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
                error={touched.name && Boolean(errors.name)}
              />
            </Grid>
          </Grid>

          {/* Volunteer Type */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Volunteer Type</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
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
                error={touched.volunteerType && Boolean(errors.volunteerType)}
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
            <Grid item xs={2} md="auto">
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
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
                helperText={errors.startDate}
                error={touched.startDate && Boolean(errors.startDate)}
              />
            </Grid>
            <Grid item xs={12} md="auto" />
            <Grid item xs={2} md="auto">
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
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
                helperText={errors.endDate}
                error={touched.endDate && Boolean(errors.endDate)}
              />
            </Grid>
          </Grid>

          {/* Time - From & To */}
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Time</Typography>
            </Grid>
            <Grid item xs={2} md="auto">
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
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
                helperText={errors.startDate}
                error={touched.startDate && Boolean(errors.startDate)}
              />
            </Grid>
            <Grid item xs={12} md="auto" />
            <Grid item xs={2} md="auto">
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
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
                helperText={errors.endDate}
                error={touched.endDate && Boolean(errors.endDate)}
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
                value={dayjs(deadline)}
                onChange={(date) => setFieldValue('deadline', date)}
                disablePast
                format="DD/MM/YYYY HH:mm"
                color="secondary"
                helperText={errors.deadline}
                error={touched.deadline && Boolean(errors.deadline)}
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
                helperText={errors.vacancies}
                error={touched.vacancies && Boolean(errors.vacancies)}
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
                helperText={errors.description}
                error={touched.description && Boolean(errors.description)}
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
                  helperText={errors.facilitatorName}
                  error={touched.facilitatorName && Boolean(errors.facilitatorName)}
                />
              </Grid>
            </Grid>

            <Grid item container>
              <div className={classes.facilPhotograph}>
                <DropZoneCard
                  id="facilitatorPhoto"
                  initialUrl={eventForm?.facilitator_photo}
                  isBig={false}
                  onChangeImage={(e) => onChangeImage(e, 'facilitatorPhoto')}
                />
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
                  helperText={errors.facilitatorDescription}
                  error={touched.facilitatorDescription && Boolean(errors.facilitatorDescription)}
                />
              </Grid>
            </Grid>
          </>
          )}

          {/* Create Event Button */}
          <Grid item container direction="row" justify="flex-end">
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
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
