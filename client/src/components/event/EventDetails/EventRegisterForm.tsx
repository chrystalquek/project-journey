import React, { FC, useState } from 'react';
import { EventData, Event } from '@type/event';
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { FormSelectRow, parseRoles } from '@utils/helpers/event/EventDetails/EventRegisterForm';
import { VolunteerData } from '@type/volunteer';
import { useRouter } from 'next/router';
import {EventTypography} from '@components/common/event/EventTypography';
import {EventDivider} from '@components/common/event/EventDivider';
import {EventButton} from '@components/common/event/EventButton';

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
}));

const EventRegisterForm: FC<EventRegisterProps> = ({
  formHandlers, event, user, isDisabled,
}) => {
  const classes = useStyles();
  const router = useRouter();

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
      case Event.Volunteering:
        formHandlers.signUpOnly(user._id, event._id, formState);
        break;
      case Event.Hangout:
      case Event.Workshop:
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
        <EventTypography fontBold text="Position Interested:" />
        <EventTypography text="First Choice:" />
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="first-choice">Select Position</InputLabel>
          <Select
            required
            fullWidth
            labelId="first-choice"
            id="firstChoice"
            name="firstChoice"
            value={formState.firstChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <EventTypography text="Second Choice: (optional)" />
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="second-choice">Select Position</InputLabel>
          <Select
            fullWidth
            labelId="second-choice"
            id="secondChoice"
            name="secondChoice"
            value={formState.secondChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <EventTypography text="Third Choice: (optional)" />
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="third-choice">Select Position</InputLabel>
          <Select
            fullWidth
            labelId="third-choice"
            id="thirdChoice"
            name="thirdChoice"
            value={formState.thirdChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <EventTypography fontBold text="Anything you would like us to know?" />
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
        <Box margin={3} />

        <EventButton
          onSubmit={onFormSubmit}
          disabled={isDisabled}
          className={classes.button}
          type="submit"
        >
          Register
        </EventButton>
      </form>
    </>
  );
};

export default EventRegisterForm;
