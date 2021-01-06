import React, {FC, useEffect, useState} from "react";
import {EventData, Event} from "@type/event";
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  Button,
  makeStyles
} from "@material-ui/core";
import {FormSelectRow, parseRoles} from "@utils/helpers/event/EventDetails/EventRegisterForm";
import {VolunteerData} from "@type/volunteer";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getSignUps} from "@redux/actions/signUp";
import {SignUpIdType, SignUpStatus} from "@type/signUp";
import {StoreState} from "@redux/store";

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
  }
}));

const EventRegisterForm: FC<EventRegisterProps> = ({ formHandlers, event, user, isDisabled }) => {
  const classes = useStyles();
  const router = useRouter();

  const roles: Array<FormSelectRow> = parseRoles(event.roles);
  const defaultForm: FormState = {
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
    additionalInfo: "",
  }
  const [formState, setFormState] = useState(defaultForm);
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }
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
        console.error("You shouldn't be here!")
    }
    router.reload();
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Box fontWeight="bold" fontSize="h3.fontSize">Register Here</Box>
        <Box fontWeight="bold">Position Interested:</Box>
        <Box>First Choice:</Box>
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="first-choice">Select Position</InputLabel>
          <Select
            required fullWidth
            labelId="first-choice" id="firstChoice"
            name="firstChoice" value={formState.firstChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>Second Choice: <Box component="span" color="text.secondary">(optional)</Box></Box>
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="second-choice">Select Position</InputLabel>
          <Select
            fullWidth labelId="second-choice"
            id="secondChoice" name="secondChoice"
            value={formState.secondChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>Third Choice: <Box component="span" color="text.secondary">(optional)</Box></Box>
        <FormControl fullWidth variant="outlined" disabled={isDisabled}>
          <InputLabel id="third-choice">Select Position</InputLabel>
          <Select
            fullWidth labelId="third-choice"
            id="thirdChoice" name="thirdChoice"
            value={formState.thirdChoice}
            onChange={handleChange}
          >
            {roles.map((v: FormSelectRow) => (
              <MenuItem key={v.id} value={v.value} disabled={v.isDisabled}>{v.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box fontWeight="bold">Anything you would like us to know?</Box>
        <TextField id="additionalInfo" name="additionalInfo"
                   fullWidth multiline
                   rows={4}
                   label="Type something here..."
                   variant="outlined"
                   onChange={handleChange}
                   disabled={isDisabled}
        />

        <Button onSubmit={onFormSubmit}
                disabled={isDisabled}
                className={classes.button}
                type="submit">Register</Button>
      </form>
    </>
  )
}

export default EventRegisterForm;