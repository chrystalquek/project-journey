import React, { FC, useEffect, useState } from 'react';
import {
  TextField, makeStyles, MenuItem, Typography, Grid, Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import PaddedGrid from '@components/common/PaddedGrid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import DropZoneCard from '@components/common/DropZoneCard';
import { useDispatch } from 'react-redux';
import { postEvent } from '@redux/actions/event';

const eventTypes = [
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Hangout', label: 'Hangout' },
  { value: 'Volunteering', label: 'Volunteering' },
];

// TODO: update types
const volunteerTypes = [
  { value: 'Committed Only', label: 'Committed Only' },
  { value: 'Ad-hoc', label: 'Ad-hoc' },
];

const getEventTypePlaceholder = (eventType) => {
  switch (eventType) {
    case 'Workshop': return 'eg. Workshop: Facilitation 101';
    case 'Hangout': return 'eg. Hangout Session';
    case 'Volunteering': return 'eg. Volunteering: Session 4';
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

const combineDateAndTime = (date: Date, time: string): Date => {
  console.log(date);
  console.log(date.toString());
  console.log(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateString = `${month}/${day}/${year}`;
  console.log(dateString);
  console.log(new Date(`${dateString} ${time}`));
  return new Date(`${dateString} ${time}`).toJSON();
};
type AdminEventFormProps = {}

const AdminEventForm: FC<AdminEventFormProps> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [eventType, setEventType] = useState('Workshop');
  const [dateAndTime, setDateAndTime] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    timeFrom: '00:00',
    timeTo: '00:00',
  });

  const [formData, setFormData] = useState({
    name: '',
    coverImage: '',
    volunteerType: 'Committed Only',
    startDateAndTime: new Date(),
    endDateAndTime: new Date(),
    deadline: new Date(),
    vacancies: 0,
    description: '',
    facilitatorName: '',
    facilitatorPhoto: '',
    facilitatorDescription: '',
    roles: [],
    contentUrl: null,
    contentType: 'pdf', // TODO: fix this
    location: '',
  });

  const {
    name, coverImage, volunteerType, deadline,
    vacancies, description, facilitatorName, facilitatorPhoto,
    facilitatorDescription, roles, contentUrl, contentType,
  } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
    const startDateAndTime = combineDateAndTime(dateAndTime.dateFrom, dateAndTime.timeFrom);
    const endDateAndTime = combineDateAndTime(dateAndTime.dateTo, dateAndTime.timeTo);

    setFormData({ ...formData, startDateAndTime, endDateAndTime });
    dispatch(postEvent(formData));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // TODO: connect with backend
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    const config = {
      header: { 'Content-Type': 'multipart/form-data' },
    };
    form.append('file', file);
    // hit api
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaddedGrid>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h1">Create Event</Typography>
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
                onChange={(e) => setEventType(e.target.value)}
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="date-from"
                  name="dateFrom"
                  value={dateAndTime.dateFrom}
                  onChange={(dateFrom) => setDateAndTime({ ...dateAndTime, dateFrom })}
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
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="date-to"
                  name="dateTo"
                  value={dateAndTime.dateTo}
                  onChange={(dateTo) => setDateAndTime({ ...dateAndTime, dateTo })}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  color="secondary"
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

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
                name="timeFrom"
                fullWidth
                value={dateAndTime.timeFrom}
                margin="dense"
                onChange={(e) => setDateAndTime({ ...dateAndTime, timeFrom: e.target.value })}
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
                name="timeTo"
                fullWidth
                value={dateAndTime.timeTo}
                margin="dense"
                onChange={(e) => setDateAndTime({ ...dateAndTime, timeTo: e.target.value })}
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item container>
              <Grid item xs={12}>
                <Typography variant="h4">Sign-up Deadline</Typography>
              </Grid>
              <Grid item xs={12}>
                <KeyboardDateTimePicker
                  variant="inline"
                  inputVariant="outlined"
                  ampm={false}
                  margin="dense"
                  value={deadline}
                  onChange={(date) => setFormData({ ...formData, deadline: date.toJSON })}
                  disablePast
                  format="dd/MM/yyyy HH:mm"
                  color="secondary"
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

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

          {eventType !== 'Volunteering' && (
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
                  <DropZoneCard isBig={false} onUploadImage={handleImageUpload} />
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
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              <Typography variant="body1"> Create Event</Typography>
            </Button>
          </Grid>
        </Grid>
      </PaddedGrid>
    </form>
  );
};

export default AdminEventForm;
