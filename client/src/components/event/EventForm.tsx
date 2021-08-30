import DropZoneCard from "@components/common/DropZoneCard";
import Header from "@components/common/Header";
import { LoginRedirect } from "@components/user/LoginRedirect";
import { UNAUTHORIZED } from "@constants/routes";
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { createEvent, editEvent, getEvent } from "@redux/actions/event";
import { resetEventStatus } from "@redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventData, EventType } from "@type/event";
import { SignUpStatus } from "@type/signUp";
import { VolunteerType } from "@type/volunteer";
import { uploadAndGetFileUrl } from "@utils/helpers/uploadAndGetFileUrl";
import dayjs from "dayjs";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { FC, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import FormQuestionMapper from "../form/generator/FormQuestionMapper";

type AdminEventFormProps = {
  id: string;
  isNew: boolean;
};

const eventTypes = [
  { value: "workshop", label: "Workshop" },
  { value: "hangout", label: "Hangout" },
  { value: "volunteering", label: "Volunteering" },
];

const volunteerTypes = [
  { value: "committed", label: "Committed" },
  { value: "ad-hoc", label: "Ad-hoc" },
  { value: "lead", label: "Lead" },
  { value: "admin", label: "Admin" },
];

const getEventTypePlaceholder = (eventType) => {
  switch (eventType) {
    case "workshop":
      return "eg. Workshop: Facilitation 101";
    case "hangout":
      return "eg. Hangout Session";
    case "volunteering":
      return "eg. Volunteering: Session 4";
    default:
      return "";
  }
};

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: "100%",
    height: "369px",
  },
  facilPhotograph: {
    width: "215px",
    height: "225px",
  },
  submitButton: {
    borderRadius: "20px",
    textTransform: "none",
  },
  addNewFieldButton: {
    backgroundColor: "white",
    borderRadius: "16px",
    textTransform: "none",
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "6px 16px",
    width: "255px",
    marginTop: theme.spacing(2),
  },
  questionStyle: {
    fontWeight: 500,
    marginTop: theme.spacing(3),
    flex: 1,
  },
  optionStyle: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
  },
  isRequiredStyle: {
    marginTop: theme.spacing(2),
  },
}));

// Feedback form types
// TODO should rename this
type QuestionData = {
  type: "shortAnswer" | "mcq" | "checkboxes";
  displayText: string;
  options?: Array<string>;
  isRequired: boolean;
};

type KeyType = "type" | "displayText" | "options" | "isRequired";

// @ts-ignore Some yup type errors.
const validationSchema: yup.SchemaOf<EventData> = yup.object({
  name: yup.string().required("Name is required"),
  coverImage: yup.string().optional(),
  eventType: yup.mixed<EventType>().required("Event type is required"),
  volunteerType: yup
    .mixed<VolunteerType>()
    .required("Volunteer type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  deadline: yup.date().required("Deadline is required"),
  description: yup.string().required("Description is required"),
  facilitatorName: yup.string().when("eventType", {
    is: "workshop",
    then: yup.string().required("Facilitator name is required"),
  }),
  facilitatorPhoto: yup.string().optional(),
  facilitatorDescription: yup.string().when("eventType", {
    is: "workshop",
    then: yup.string().required("Facilitator description is required"),
  }),
  roles: yup.array().required("Roles is required"),
  contentUrl: yup.string().optional(),
  location: yup.string().required("Location is required"),
});

const emptyForm: Omit<EventData, "_id" | "createdAt"> = {
  name: "",
  eventType: EventType.WORKSHOP,
  volunteerType: VolunteerType.COMMITTED,
  deadline: dayjs().toISOString(),
  description: "",
  roles: [],
  location: "",
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
};

const AdminEventForm: FC<AdminEventFormProps> = ({ id, isNew }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const event = useAppSelector((state) => state.event.event);
  const eventForm = useAppSelector((state) => state.event.event.form);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Store feedback event form
  const [feedbackFormEventQuestions, setFeedbackFormEventQuestions] = useState<
    Array<QuestionData>
  >([]);

  // Feedback form helper functions
  const handleAddQuestion = useCallback(() => {
    const newQuestion: QuestionData = {
      type: "shortAnswer",
      displayText: "",
      isRequired: true,
      options: [],
    };
    setFeedbackFormEventQuestions([...feedbackFormEventQuestions, newQuestion]);
  }, [feedbackFormEventQuestions]);

  const handleChangeQuestion = useCallback(
    (value: string | Array<string> | boolean, key: KeyType, index: number) => {
      const newQuestion: QuestionData = {
        ...feedbackFormEventQuestions[index],
        [key]: value,
      };

      if (key === "type") {
        newQuestion.displayText = "";
        newQuestion.options = [];
      }

      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        newQuestion,
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions]
  );

  const handleAddOption = useCallback(
    (index: number) => {
      const newOption: Array<string> = [
        ...feedbackFormEventQuestions[index].options,
        "",
      ];
      handleChangeQuestion(newOption, "options", index);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions]
  );

  const handleRemoveOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const currentOption = feedbackFormEventQuestions[questionIndex].options;
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, "options", questionIndex);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  const handleChangeOption = useCallback(
    (value: string, questionIndex: number, optionIndex: number) => {
      const currentOption: Array<string> =
        feedbackFormEventQuestions[questionIndex].options;
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        value,
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, "options", questionIndex);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  useEffect(() => {
    if (id && id !== "new") {
      dispatch(getEvent(id));
    }
  }, [dispatch, id]);

  useEffect(() => () => dispatch(resetEventStatus()), [dispatch]);

  useEffect(() => {
    if (event.status === SignUpStatus.REJECTED) {
      enqueueSnackbar("Event creation failed.", {
        variant: "error",
      });
    } else if (event.status === "fulfilled") {
      const message = isNew
        ? "Successfully Created Event!"
        : "Successfully Edited Event!";
      enqueueSnackbar(message, {
        variant: "success",
      });

      router.push("/event");
    }
  }, [event, isNew, router, enqueueSnackbar]);

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setFieldError,
    values,
  } = useFormik({
    initialValues: eventForm || emptyForm,
    validationSchema,
    onSubmit: async (formValues) => {
      const form = formValues;

      // Upload and get cover image URL
      if (formValues.coverImage && typeof formValues.coverImage !== "string") {
        form.coverImage = await uploadAndGetFileUrl(
          formValues.coverImage,
          "image"
        );
      }

      // Upload and get facilitator photo URL
      if (
        formValues.facilitatorPhoto &&
        typeof formValues.facilitatorPhoto !== "string"
      ) {
        form.facilitatorPhoto = await uploadAndGetFileUrl(
          formValues.facilitatorPhoto,
          "image"
        );
      }

      if (isNew) {
        dispatch(
          createEvent({
            ...form,
            // @ts-ignore TODO: Many type errors here. Ignoring now as backend doesn't support
            // questions yet.
            questions: feedbackFormEventQuestions.map((element) => ({
              ...element,
              name: element.displayText,
            })),
          })
        );
      } else {
        dispatch(editEvent({ data: form, _id: id }));
      }
    },
    enableReinitialize: true,
  });

  const onChangeImage = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile: File = e.target.files[0];
      setFieldValue(fieldName, imageFile);
      return URL.createObjectURL(imageFile);
    }
    return null;
  };

  const {
    name,
    eventType,
    volunteerType,
    deadline,
    description,
    facilitatorName,
    facilitatorDescription,
    startDate,
    endDate,
    location,
  } = values;

  if (!user) {
    return LoginRedirect();
  }

  if (user && user.volunteerType !== "admin") {
    router.push(UNAUTHORIZED);
  }

  if (id !== "new" && eventForm === null) {
    return <h1>Loading</h1>;
  }

  return (
    <Grid container xs={8}>
      <Header title={isNew ? "Create Event" : "Edit Event"} />
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={10}>
          <Grid item>
            <Typography variant="h1">
              {isNew ? "Create Event" : "Edit Event"}
            </Typography>
          </Grid>

          {/* Type of event */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: "bold" }}>
                Type of Event
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                variant="outlined"
                margin="dense"
                id="type"
                type="text"
                fullWidth
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
                initialUrl={eventForm?.coverImage}
                onChangeImage={(e) => onChangeImage(e, "coverImage")}
              />
            </div>
          </Grid>

          {/* Name of event */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: "bold" }}>
                Name of Event
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="name"
                placeholder={getEventTypePlaceholder(eventType)}
                type="text"
                fullWidth
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
              <Typography style={{ fontWeight: "bold" }}>
                Volunteer Type
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                variant="outlined"
                margin="dense"
                id="type"
                type="text"
                fullWidth
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
              <Typography style={{ fontWeight: "bold" }}>Date</Typography>
            </Grid>
            <Grid item xs={2} md="auto">
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={10} md={3}>
              <KeyboardDateTimePicker
                fullWidth
                clearable
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                margin="dense"
                value={dayjs(startDate)}
                onError={(error) => {
                  if (error !== errors.startDate) {
                    setFieldError("startDate", error.toLocaleString());
                  }
                }}
                onChange={(date) => setFieldValue("startDate", date)}
                disablePast
                format="dd/MM/yyyy HH:mm"
                helperText={errors.startDate}
                error={touched.startDate && Boolean(errors.startDate)}
                minDate={deadline}
                minDateMessage="Start date should not be before deadline"
              />
            </Grid>
            <Grid item xs={12} md="auto" />
            <Grid item xs={2} md="auto">
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={10} md={3}>
              <KeyboardDateTimePicker
                fullWidth
                clearable
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                margin="dense"
                value={dayjs(endDate)}
                onError={(error) => {
                  if (error !== errors.endDate) {
                    setFieldError("endDate", error.toLocaleString());
                  }
                }}
                onChange={(date) => setFieldValue("endDate", date)}
                disablePast
                format="dd/MM/yyyy HH:mm"
                helperText={errors.endDate}
                error={touched.endDate && Boolean(errors.endDate)}
                minDate={startDate}
                minDateMessage="End date should not be before start date"
              />
            </Grid>
          </Grid>

          {/* Sign-up Deadline */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: "bold" }}>
                Sign-up Deadline
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <KeyboardDateTimePicker
                fullWidth
                clearable
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                margin="dense"
                value={dayjs(deadline)}
                onError={(error) => {
                  if (error !== errors.deadline) {
                    setFieldError("deadline", error.toLocaleString());
                  }
                }}
                onChange={(date) => setFieldValue("deadline", date)}
                disablePast
                format="dd/MM/yyyy HH:mm"
                helperText={errors.deadline}
                error={touched.deadline && Boolean(errors.deadline)}
              />
            </Grid>
          </Grid>

          {/* Event Location */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Location</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="location"
                placeholder="Type something here..."
                type="text"
                fullWidth
                color="secondary"
                name="location"
                value={location}
                onChange={handleChange}
                helperText={errors.location}
                error={touched.location && Boolean(errors.location)}
              />
            </Grid>
          </Grid>

          {/* Event Description */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: "bold" }}>
                Event Description
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="dense"
                id="type"
                placeholder="Type something here..."
                type="text"
                fullWidth
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

          {/* Facilitator Information */}
          {(eventType === "workshop" || eventType === "hangout") && (
            <>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Name of Facilitator
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    id="type"
                    placeholder="eg. Ms Anna Soh"
                    type="text"
                    fullWidth
                    name="facilitatorName"
                    value={facilitatorName}
                    onChange={handleChange}
                    helperText={errors.facilitatorName}
                    error={
                      touched.facilitatorName && Boolean(errors.facilitatorName)
                    }
                  />
                </Grid>
              </Grid>

              <Grid item container>
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Photograph of Facilitator
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.facilPhotograph}>
                    <DropZoneCard
                      id="facilitatorPhoto"
                      initialUrl={eventForm?.facilitatorPhoto}
                      onChangeImage={(e) =>
                        onChangeImage(e, "facilitatorPhoto")
                      }
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Description of Facilitator
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    id="type"
                    placeholder="Type something here..."
                    type="text"
                    fullWidth
                    name="facilitatorDescription"
                    value={facilitatorDescription}
                    onChange={handleChange}
                    multiline
                    rows={15}
                    helperText={errors.facilitatorDescription}
                    error={
                      touched.facilitatorDescription &&
                      Boolean(errors.facilitatorDescription)
                    }
                  />
                </Grid>
              </Grid>
            </>
          )}

          <Grid item>
            <Formik initialValues={{}} onSubmit={() => {}} enableReinitialize>
              {() => (
                <>
                  <div>
                    <Typography variant="h1">
                      Volunteer Response Form
                    </Typography>
                  </div>

                  {/* Feedback form generator based on redux state */}
                  {feedbackFormEventQuestions.map(
                    (question: QuestionData, index: number) => (
                      <div key={String(index)}>
                        <div style={{ display: "flex" }}>
                          <Typography className={classes.questionStyle}>
                            Question {index + 1}
                          </Typography>
                          <IconButton
                            onClick={() => handleRemoveQuestion(index)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </div>

                        <FormQuestionMapper
                          type="mcq"
                          name={`type${String(index)}`}
                          options={[
                            { value: "shortAnswer", label: "Short Answer" },
                            { value: "checkboxes", label: "Check Box" },
                            { value: "mcq", label: "MCQ" },
                          ]}
                          props={{
                            style: { width: "200px" },
                            value: question.type,
                            onChange: (e) =>
                              handleChangeQuestion(
                                e.target.value,
                                "type",
                                index
                              ),
                          }}
                        />
                        <FormQuestionMapper
                          type="shortAnswer"
                          name={question.displayText + String(index)}
                          props={{
                            value: question.displayText,
                            placeholder: "Type question here...",
                            onChange: (e) =>
                              handleChangeQuestion(
                                e.target.value,
                                "displayText",
                                index
                              ),
                          }}
                        />

                        {question.type === "mcq" ||
                        question.type === "checkboxes" ? (
                          <Formik
                            initialValues={{}}
                            onSubmit={() => {}}
                            enableReinitialize
                          >
                            {() => (
                              <>
                                <Typography className={classes.optionStyle}>
                                  Options:{" "}
                                </Typography>
                                {question.options.map((option, optionIndex) => (
                                  <div
                                    key={option}
                                    style={{
                                      display: "flex",
                                      alignContent: "center",
                                    }}
                                  >
                                    <FormQuestionMapper
                                      type="shortAnswer"
                                      name={String(optionIndex)}
                                      key={option}
                                      props={{
                                        style: {
                                          width: "500px",
                                        },
                                        placeholder: "Type option here...",
                                        value: option,
                                        onChange: (e) =>
                                          handleChangeOption(
                                            e.target.value,
                                            index,
                                            optionIndex
                                          ),
                                      }}
                                    />
                                    <IconButton
                                      onClick={() =>
                                        handleRemoveOption(index, optionIndex)
                                      }
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </div>
                                ))}
                                <Button
                                  className={classes.addNewFieldButton}
                                  onClick={() => handleAddOption(index)}
                                >
                                  + Add another option
                                </Button>
                              </>
                            )}
                          </Formik>
                        ) : null}
                        <div className={classes.isRequiredStyle}>
                          <Typography style={{ display: "inline-block" }}>
                            Is question required?
                          </Typography>
                          <Switch
                            checked={question.isRequired}
                            onChange={(e) =>
                              handleChangeQuestion(
                                e.target.checked,
                                "isRequired",
                                index
                              )
                            }
                          />
                        </div>
                      </div>
                    )
                  )}
                  <Button
                    className={classes.addNewFieldButton}
                    onClick={handleAddQuestion}
                  >
                    + Add another question
                  </Button>
                </>
              )}
            </Formik>
          </Grid>
          {/* Create Event Button */}
          <Grid item container direction="row" justify="flex-end">
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
              // onClick={(_) => handleSubmit()}
              className={classes.submitButton}
            >
              <Typography variant="body1">
                {isNew ? "Create Event" : "Edit Event"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default AdminEventForm;
