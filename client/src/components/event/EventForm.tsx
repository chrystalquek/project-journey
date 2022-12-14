import Header from "@components/common/Header";
import LoadingIndicator from "@components/common/LoadingIndicator";
import { LoginRedirect } from "@components/user/LoginRedirect";
import { UNAUTHORIZED } from "@constants/routes";
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { createEvent, editEvent, getEvent } from "@redux/actions/event";
import { selectEventById } from "@redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { EventData, EventType, RoleData } from "@type/event";
import { VolunteerType } from "@type/volunteer";
import { objectFilter } from "@utils/helpers/objectFilter";
import { uploadAndGetFileUrl } from "@utils/helpers/uploadAndGetFileUrl";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useRef } from "react";
import * as yup from "yup";
import FormQuestionMapper from "../form/generator/FormQuestionMapper";
import {
  QuestionData,
  useFeedbackForm,
  useVolunteerRoles,
  VolunteerRoleData,
} from "./helpers/eventForm";

type AdminEventFormProps = {
  eid?: string;
  isEdit?: boolean;
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
  facilitatorName: undefined,
  facilitatorDescription: undefined,
};

const AdminEventForm: FC<AdminEventFormProps> = ({ eid, isEdit }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const eventStatus = useAppSelector((state) => state.event.status);
  const event = useAppSelector((state) => selectEventById(state, eid ?? ""));
  const user = useAppSelector((state) => state.session.user);
  const {
    feedbackFormEventQuestions,
    handleAddQuestion,
    handleChangeQuestion,
    handleAddOption,
    handleRemoveQuestion,
    handleRemoveOption,
    handleChangeOption,
  } = useFeedbackForm();
  const {
    volunteerRoles,
    handleAddVolunteerRole,
    handleChangeVolunteerRoleInfo,
  } = useVolunteerRoles();

  useEffect(() => {
    if (eid) {
      dispatch(getEvent(eid));
    }
  }, [dispatch, eid]);

  const hasPressedSubmit = useRef(false);
  useEffect(() => {
    if (!hasPressedSubmit.current) {
      return;
    }

    if (eventStatus === "rejected") {
      enqueueSnackbar("Event creation failed.", {
        variant: "error",
      });
    } else if (eventStatus === "fulfilled") {
      const message = !isEdit
        ? "Successfully Created Event!"
        : "Successfully Edited Event!";
      enqueueSnackbar(message, {
        variant: "success",
      });

      router.push("/event");
    }
  }, [eventStatus, isEdit, router, enqueueSnackbar]);

  const handleSubmit = async (formValues) => {
    hasPressedSubmit.current = true;
    const form = objectFilter(formValues, (key) => key !== undefined);

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

    if (isEdit && eid) {
      dispatch(editEvent({ data: form, _id: eid }));
    } else {
      dispatch(
        createEvent({
          ...form,
          roles: volunteerRoles.map<RoleData>((role) => ({
            name:
              role.roleType === "custom" ? role.roleTitle ?? "" : role.roleType,
            description: role.description,
            capacity: role.capacity ?? 0,
            volunteers: [],
          })),
          // @ts-ignore TODO: Many type errors here. Ignoring now as backend doesn't support
          // questions yet.
          questions: feedbackFormEventQuestions.map((element) => ({
            ...element,
            name: element.displayText,
          })),
        })
      );
    }
  };

  if (!user) {
    return LoginRedirect();
  }

  if (user && user.volunteerType !== "admin") {
    router.push(UNAUTHORIZED);
  }

  if (eventStatus === "pending") {
    return <LoadingIndicator />;
  }

  return (
    <Grid container xs={8}>
      <Header title={!isEdit ? "Create Event" : "Edit Event"} />
      <Formik
        initialValues={event ?? emptyForm}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Grid container direction="column" spacing={10}>
              <Grid item>
                <Typography variant="h1">
                  {!isEdit ? "Create Event" : "Edit Event"}
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
                  <FormQuestionMapper
                    name="eventType"
                    type="mcq"
                    options={eventTypes}
                  />
                </Grid>
              </Grid>

              {/* Cover Image */}
              <Grid item container>
                <div className={classes.coverImage}>
                  <FormQuestionMapper
                    name="coverImage"
                    type="image"
                    props={{ width: "100%", height: "100%" }}
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
                  <FormQuestionMapper
                    name="name"
                    type="shortAnswer"
                    props={{
                      placeholder: getEventTypePlaceholder(values.eventType),
                    }}
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
                  <FormQuestionMapper
                    name="volunteerType"
                    type="mcq"
                    options={volunteerTypes}
                  />
                </Grid>
              </Grid>

              {/* Date - From & To */}
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: "bold" }}>Date</Typography>
                </Grid>
                <Grid item xs={2} md="auto">
                  <Typography variant="body1">From</Typography>
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormQuestionMapper
                    name="startDate"
                    type="datetime"
                    props={{
                      disablePast: true,
                      minDate: values.deadline,
                      minDateMessage:
                        "Start date should not be before deadline",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md="auto" />
                <Grid item xs={2} md="auto">
                  <Typography variant="body1">To</Typography>
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormQuestionMapper
                    name="endDate"
                    type="datetime"
                    props={{
                      disablePast: true,
                      minDate: values.startDate,
                      minDateMessage:
                        "End date should not be before start date",
                    }}
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
                  <FormQuestionMapper
                    name="deadline"
                    type="datetime"
                    props={{
                      disablePast: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Event Location */}
              <Grid item container>
                <Grid item xs={12}>
                  <Typography variant="h4">Location</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormQuestionMapper
                    name="location"
                    type="shortAnswer"
                    props={{
                      placeholder: "Type something here...",
                    }}
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
                  <FormQuestionMapper
                    name="description"
                    type="longAnswer"
                    props={{
                      placeholder: "Type something here...",
                      rows: 15,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Type of Volunteer Roles */}
              {values.eventType === EventType.VOLUNTEERING && (
                <Grid item>
                  <Formik
                    initialValues={{}}
                    onSubmit={() => {}}
                    enableReinitialize
                  >
                    {() => (
                      <>
                        <div>
                          <Typography style={{ fontWeight: "bold" }}>
                            Types of Volunteer Roles
                          </Typography>
                        </div>

                        {/* Feedback form generator based on redux state */}
                        {volunteerRoles.map(
                          (volunteerRole: VolunteerRoleData, index: number) => (
                            <div key={String(index)}>
                              <div style={{ display: "flex" }}>
                                <Typography className={classes.questionStyle}>
                                  Role {index + 1}
                                </Typography>
                                <IconButton
                                  onClick={() => handleRemoveQuestion(index)}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </div>

                              <Grid container spacing={2}>
                                <Grid item>
                                  <FormQuestionMapper
                                    type="mcq"
                                    name={`role${index}`}
                                    options={[
                                      { value: "driver", label: "Driver" },
                                      { value: "custom", label: "Custom" },
                                    ]}
                                    props={{
                                      style: { width: "200px" },
                                      value: volunteerRole.roleType,
                                      onChange: (e) =>
                                        handleChangeVolunteerRoleInfo(
                                          e.target.value,
                                          "roleType",
                                          index
                                        ),
                                    }}
                                  />
                                </Grid>

                                {volunteerRole.roleType === "custom" && (
                                  <Grid item>
                                    <FormQuestionMapper
                                      type="shortAnswer"
                                      name={`roleTitle${index}`}
                                      props={{
                                        style: { width: "500px" },
                                        placeholder: "eg, Food Distributor",
                                        value: volunteerRole.roleTitle,
                                        onChange: (e) =>
                                          handleChangeVolunteerRoleInfo(
                                            e.target.value,
                                            "roleTitle",
                                            index
                                          ),
                                      }}
                                    />
                                  </Grid>
                                )}
                              </Grid>

                              <FormQuestionMapper
                                type="shortAnswer"
                                name={`description-${index}`}
                                props={{
                                  value: volunteerRole.description,
                                  placeholder: "Type job description here...",
                                  onChange: (e) =>
                                    handleChangeVolunteerRoleInfo(
                                      e.target.value,
                                      "description",
                                      index
                                    ),
                                }}
                              />

                              <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                  <Typography>
                                    Number of vacancies available
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <FormQuestionMapper
                                    type="number"
                                    name={`vacancies-${index}`}
                                    props={{
                                      value: volunteerRole.capacity,
                                      placeholder: "eg, 3",
                                      onChange: (e) =>
                                        handleChangeVolunteerRoleInfo(
                                          e.target.value,
                                          "capacity",
                                          index
                                        ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          )
                        )}
                        <Button
                          className={classes.addNewFieldButton}
                          onClick={handleAddVolunteerRole}
                        >
                          + Add another role
                        </Button>
                      </>
                    )}
                  </Formik>
                </Grid>
              )}

              {/* Facilitator Information */}
              {(values.eventType === EventType.WORKSHOP ||
                values.eventType === EventType.HANGOUT) && (
                <>
                  <Grid item container>
                    <Grid item xs={12}>
                      <Typography style={{ fontWeight: "bold" }}>
                        Name of Facilitator
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormQuestionMapper
                        name="facilitatorName"
                        type="shortAnswer"
                        props={{
                          placeholder: "eg. Ms Anna Soh",
                        }}
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
                        <FormQuestionMapper
                          name="facilitatorPhoto"
                          type="image"
                          props={{ width: "100%", height: "100%" }}
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
                      <FormQuestionMapper
                        name="facilitatorDescription"
                        type="longAnswer"
                        props={{
                          placeholder: "Type something here...",
                          rows: 15,
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Volunteer Response Form */}
              <Grid item>
                <Formik
                  initialValues={{}}
                  onSubmit={() => {}}
                  enableReinitialize
                >
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
                                    {(question.options ?? []).map(
                                      (option, optionIndex) => (
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
                                              placeholder:
                                                "Type option here...",
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
                                              handleRemoveOption(
                                                index,
                                                optionIndex
                                              )
                                            }
                                          >
                                            <ClearIcon />
                                          </IconButton>
                                        </div>
                                      )
                                    )}
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
                    {!isEdit ? "Create Event" : "Edit Event"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default AdminEventForm;
