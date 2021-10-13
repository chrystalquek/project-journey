import { CreateSignUpRequest } from "@api/request";
import Button from "@components/common/Button";
import TypographyWithUnderline from "@components/common/data-display/TypographyWithUnderline";
import { getFormData } from "@components/event/helpers/EventDetails/EventDetails";
import {
  FormSelectRow,
  parseRoles,
} from "@components/event/helpers/EventDetails/EventRegisterForm";
import {
  Box,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { createAndAcceptSignUp, createSignUp } from "@redux/actions/signUp";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventData, EventType } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import { VolunteerData } from "@type/volunteer";
import { useSnackbar } from "notistack";
import React, { FC, useState } from "react";

type EventRegisterProps = {
  event: EventData;
  user: VolunteerData;
  isDisabled: boolean; // true when no vacancies left in event
};

export type FormState = {
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  additionalInfo: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "16px",
    textTransform: "none",
    padding: "6px 16px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  positionContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const EventRegisterForm: FC<EventRegisterProps> = ({
  event,
  user,
  isDisabled,
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const signUpFetchStatus = useAppSelector((state) => state.signUp.status);
  const { enqueueSnackbar } = useSnackbar();

  const roles: Array<FormSelectRow> = parseRoles(event.roles);
  const defaultForm: FormState = {
    firstChoice: "",
    secondChoice: "",
    thirdChoice: "",
    additionalInfo: "",
  };
  const [formState, setFormState] = useState(defaultForm);
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const request: CreateSignUpRequest = {
      ...getFormData(user._id, event._id, formState),
      status: SignUpStatus.PENDING,
    };

    switch (event.eventType) {
      case EventType.VOLUNTEERING:
        dispatch(createSignUp(request));
        break;
      case EventType.HANGOUT:
      case EventType.WORKSHOP:
        dispatch(createAndAcceptSignUp({ request, form: formState }));
        break;
      default:
        throw new Error("You shouldn't be here!");
    }

    if (signUpFetchStatus === "rejected") {
      enqueueSnackbar("Sign up creation failed.", {
        variant: "error",
      });
    } else if (signUpFetchStatus === "fulfilled") {
      enqueueSnackbar("Successfully Signed Up!", {
        variant: "success",
      });
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <TypographyWithUnderline fontSize="h1" fontWeight="fontWeightBold">
          Register Here
        </TypographyWithUnderline>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Typography style={{ fontWeight: "bold" }}>
              Position Interested:
            </Typography>
          </Grid>

          <Grid item>
            <Typography>First Choice:</Typography>
            <FormControl
              fullWidth
              variant="outlined"
              disabled={isDisabled}
              className={classes.positionContainer}
            >
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
            <Typography>Second Choice: (optional)</Typography>
            <FormControl
              fullWidth
              variant="outlined"
              disabled={isDisabled}
              className={classes.positionContainer}
            >
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
            <Typography>Third Choice: (optional)</Typography>
            <FormControl
              fullWidth
              variant="outlined"
              disabled={isDisabled}
              className={classes.positionContainer}
            >
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
            <Typography style={{ fontWeight: "bold" }}>
              Anything you would like us to know?
            </Typography>
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
            <Button
              onSubmit={onFormSubmit}
              disabled={isDisabled}
              className={classes.button}
              type="submit"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EventRegisterForm;
