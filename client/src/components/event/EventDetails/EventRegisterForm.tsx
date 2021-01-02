import React, {FC, useState} from "react";
import {EventData, VolunteerRole} from "@type/event";
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

type EventRegisterProps = {
  event: EventData
}

type FormState = {
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

const EventRegisterForm: FC<EventRegisterProps> = ({ event }) => {
  const classes = useStyles();

  const roles: Array<FormSelectRow> = parseRoles(event.roles);
  const defaultForm: FormState = {
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
    additionalInfo: "",
  }
  const [formState, setFormState] = useState(defaultForm);
  const handleChange = (event) => {
    console.log({ ...formState, [event.target.name]: event.target.value })
    console.log(event.target)
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  return (
    <>
      <form>
        <Box fontWeight="bold" fontSize="h3.fontSize">Register Here</Box>
        <Box fontWeight="bold">Position Interested:</Box>
        <Box>First Choice:</Box>
        <FormControl fullWidth variant="outlined">
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
        <FormControl fullWidth variant="outlined">
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
        <FormControl fullWidth variant="outlined">
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
                   fullWidth multiline rows={4}
                   label="Type something here..."
                   onChange={handleChange}
                   variant="outlined"
        />

        <Button className={classes.button} type="submit">Register</Button>
      </form>
    </>
  )
}

export default EventRegisterForm;