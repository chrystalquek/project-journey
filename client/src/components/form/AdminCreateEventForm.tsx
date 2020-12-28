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
const useStyles = makeStyles({
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
});

const AdminCreateEventForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    eventType: 'Workshop',
    name: '',
    volunteerType: 'Committed Only',
    dateFrom: new Date(),
    dateTo: new Date(),
    timeFrom: '00:00',
    timeTo: '00:00',
    deadline: new Date(),
    vacancies: '',
    description: '',
    facilitatorName: '',
    facilitatorPhotograph: '',
    facilitatorDescription: '',
  });

  const {
    eventType, coverImage, name, volunteerType, dateFrom, dateTo, timeFrom, timeTo, deadline,
    vacancies, description, facilitatorName, facilitatorPhotograph,
    facilitatorDescription,
  } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
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
                onChange={handleChange}
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
                  value={dateFrom}
                  onChange={(date) => setFormData({ ...formData, dateFrom: date })}
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
                  value={dateTo}
                  onChange={(date) => setFormData({ ...formData, dateTo: date })}
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
                value={timeFrom}
                margin="dense"
                onChange={handleChange}
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
                value={timeTo}
                margin="dense"
                onChange={handleChange}
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
                  onChange={(date) => setFormData({ ...formData, deadline: date })}
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
            >
              <Typography variant="body1"> Create Event</Typography>
            </Button>
          </Grid>
        </Grid>
      </PaddedGrid>
    </form>
  );
};

export default AdminCreateEventForm;
