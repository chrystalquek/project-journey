import React, { FC, useEffect, useState } from 'react';
import {
  TextField, makeStyles, MenuItem, Typography, Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import PaddedGrid from '@components/common/PaddedGrid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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

const useStyles = makeStyles({});

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
    eventType, name, volunteerType, dateFrom, dateTo, timeFrom, timeTo, deadline,
    vacancies, description, facilitatorName, facilitatorPhotograph,
    facilitatorDescription,
  } = formData;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaddedGrid>
        <Grid container direction="column" spacing={2}>
          {/* Type of event */}
          <Grid item container xs={12}>
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

          {/* Name of event */}
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography variant="h4">Name of Event</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="name"
                placeholder="eg. Workshop: Facilitation 101"
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
          <Grid item container xs={12}>
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
            <Grid item container xs={12} direction="row" alignItems="center" spacing={2}>
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
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          {/* Time - From & To */}
          <Grid item container xs={12} direction="row" alignItems="center" spacing={2}>
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
              />
            </Grid>
          </Grid>

          {/* Sign-up Deadline */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item container xs={12}>
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
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          {/* Number of Vacancies */}
          <Grid item container xs={12}>
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
          <Grid item container xs={12}>
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
                rows={5}
              />
            </Grid>
          </Grid>

          {/* Name of Facilitator */}
          <Grid item container xs={12}>
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

          {/* Description of Facilitator */}
          <Grid item container xs={12}>
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
              />
            </Grid>
          </Grid>
        </Grid>
      </PaddedGrid>
    </form>
  );
};

export default AdminCreateEventForm;
