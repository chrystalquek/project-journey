import React, { FC, useState } from 'react';
import { EventData, EventType } from '@type/event';
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';
import { FormSelectRow, parseRoles } from '@components/event/helpers/EventDetails/EventRegisterForm';
import { VolunteerData } from '@type/volunteer';
import { useRouter } from 'next/router';
import { EventTypography } from '@components/common/event/EventTypography';
import { EventDivider } from '@components/common/event/EventDivider';
import { EventButton } from '@components/common/event/EventButton';

type EventRegisterProps = {
  event: EventData
  user: VolunteerData
  isDisabled: boolean // true when no vacancies left in event
  formHandlers: {
    signUpAndAccept: (uid: string, eid: string, form: FormState) => void,
    signUpOnly: (uid: string, eid: string, form: FormState) => void
  }
}

export type FormState = {
  firstChoice: string,
  secondChoice: string,
  thirdChoice: string,
  additionalInfo: string,
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    textTransform: 'none',
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  positionContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const EventRegisterForm: FC<EventRegisterProps> = ({
  formHandlers, event, user, isDisabled,
}) => {
  const classes = useStyles();

  const roles: Array<FormSelectRow> = parseRoles(event.roles);
  const defaultForm: FormState = {
    firstChoice: '',
    secondChoice: '',
    thirdChoice: '',
    additionalInfo: '',
  };
  const [formState, setFormState] = useState(defaultForm);
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    switch (event.eventType) {
      case EventType.VOLUNTEERING:
        formHandlers.signUpOnly(user._id, event._id, formState);
        break;
      case EventType.HANGOUT:
      case EventType.WORKSHOP:
        formHandlers.signUpAndAccept(user._id, event._id, formState);
        break;
      default:
        console.error("You shouldn't be here!");
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <EventDivider fontBold gutterBottom>Register Here</EventDivider>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <EventTypography fontBold text="Position Interested:" />
          </Grid>

          <Grid item>
            <EventTypography text="First Choice:" gutterBottom />
            <FormControl fullWidth variant="outlined" disabled={isDisabled} className={classes.positionContainer}>
              <TextField
                select
                variant="outlined"
                label="Select Position"
                size="small"
                required
                fullWidth
                id="firstChoice"
                name="firstChoice"
                value={formState.firstChoice}
                onChange={handleChange}
              >
                {roles.map((v: FormSelectRow) => (
                  <MenuItem
                    key={v.value}
                    value={v.value}
                    disabled={v.isDisabled}
                  >
                    {v.description}

                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item>
            <EventTypography text="Second Choice: (optional)" gutterBottom />
            <FormControl fullWidth variant="outlined" disabled={isDisabled} className={classes.positionContainer}>
              <TextField
                select
                variant="outlined"
                label="Select Position"
                size="small"
                fullWidth
                id="secondChoice"
                name="secondChoice"
                value={formState.secondChoice}
                onChange={handleChange}
              >
                {roles.map((v: FormSelectRow) => (
                  <MenuItem
                    key={v.value}
                    value={v.value}
                    disabled={v.isDisabled}
                  >
                    {v.description}

                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item>
            <EventTypography text="Third Choice: (optional)" gutterBottom />
            <FormControl fullWidth variant="outlined" disabled={isDisabled} className={classes.positionContainer}>
              <TextField
                select
                variant="outlined"
                label="Select Position"
                size="small"
                fullWidth
                id="thirdChoice"
                name="thirdChoice"
                value={formState.thirdChoice}
                onChange={handleChange}
              >
                {roles.map((v: FormSelectRow) => (
                  <MenuItem
                    key={v.value}
                    value={v.value}
                    disabled={v.isDisabled}
                  >
                    {v.description}

                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item>
            <EventTypography fontBold text="Anything you would like us to know?" gutterBottom />
            <TextField
              id="additionalInfo"
              name="additionalInfo"
              fullWidth
              multiline
              rows={4}
              label="Type something here..."
              variant="outlined"
              onChange={handleChange}
              disabled={isDisabled}
            />
          </Grid>

          <Grid item>
            <Box margin={3} />
            <EventButton
              onSubmit={onFormSubmit}
              disabled={isDisabled}
              className={classes.button}
              type="submit"
            >
              Register
            </EventButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EventRegisterForm;
