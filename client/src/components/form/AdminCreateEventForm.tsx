import React, { FC, useEffect, useState } from 'react';
import {
  TextField, makeStyles, MenuItem, Typography, Grid, InputLabel,
} from '@material-ui/core';
import PaddedGrid from '@components/common/PaddedGrid';

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
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    deadline: '',
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
