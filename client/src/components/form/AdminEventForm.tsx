import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import {
  TextField,
  makeStyles,
  MenuItem,
  Typography,
  Grid,
  Button,
  Switch,
  IconButton,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import PaddedGrid from '@components/common/PaddedGrid';
import DropZoneCard from '@components/common/DropZoneCard';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, getEvent, editEvent } from '@redux/actions/event';
import { uploadImage } from '@redux/actions/image';
import { resetImages } from '@redux/reducers/image';
import dayjs from 'dayjs';
import { StoreState } from '@redux/store';
import { Formik, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { keysToCamel, keysToSnake } from '@utils/helpers/keysToCamel';
import { unwrapResult } from '@reduxjs/toolkit';
import ClearIcon from '@material-ui/icons/Clear';
import { FormQuestionMapper } from './signup-questions/SignUpFormGenerator';

type AdminEventFormProps = {
  id: string;
  isNew: boolean;
};

const eventTypes = [
  { value: 'workshop', label: 'Workshop' },
  { value: 'hangout', label: 'Hangout' },
  { value: 'volunteering', label: 'Volunteering' },
];

const volunteerTypes = [
  { value: 'committed', label: 'Committed' },
  { value: 'ad-hoc', label: 'Ad-hoc' },
  { value: 'lead', label: 'Lead' },
  { value: 'admin', label: 'Admin' },
];

const getEventTypePlaceholder = (eventType) => {
  switch (eventType) {
    case 'workshop':
      return 'eg. Workshop: Facilitation 101';
    case 'hangout':
      return 'eg. Hangout Session';
    case 'volunteering':
      return 'eg. Volunteering: Session 4';
    default:
      throw new Error();
  }
};

const useStyles = makeStyles((theme) => ({
  coverImage: {
    width: '1010px',
    height: '369px',
  },
  facilPhotograph: {
    width: '215px',
    height: '225px',
  },
  submitButton: {
    borderRadius: '20px',
    textTransform: 'none',
  },
  addNewFieldButton: {
    backgroundColor: 'white',
    borderRadius: '16px',
    textTransform: 'none',
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: '6px 16px',
    width: '255px',
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

/**
 * Combine date and time as JSON string
 * @param date Date object representing date
 * @param time string representing time
 */
const getCombinedDateAndTimeString = (
  dateDayJs: dayjs.Dayjs,
  time: string,
): string => {
  const dateDayJsWithoutTime = dateDayJs.format('YYYY-MM-DD');
  return dayjs(`${dateDayJsWithoutTime} ${time}`).toISOString();
};

// Feedback form types
type QuestionData = {
  type: 'shortAnswer' | 'mcq' | 'checkboxes';
  text: string;
  options?: Array<string>;
  isRequired: boolean;
};

type KeyType = 'type' | 'text' | 'options' | 'isRequired';

const validationSchema = yup.object({
  eventType: yup.string().required('Event type is required'),
  name: yup.string().required('Name is required'),
  volunteerType: yup.string().required('Volunteer type is required'),
  deadline: yup.date().required('Deadline is required'),
  vacancies: yup.number().required('Vacancies is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup
    .date()
    .required('Start date is required')
    .when(
      'startDate',
      (startDate, schema) => startDate
        && schema.min(startDate, 'End date should be later than start date'),
    ),
  facilitatorName: yup.string().when('eventType', {
    is: 'volunteering',
    then: yup.string().required('Facilitator name is required'),
  }),
  facilitatorDescription: yup.string().when('eventType', {
    is: 'volunteering',
    then: yup.string().required('Facilitator description is required'),
  }),
  roles: yup.array().when('eventType', {
    is: 'volunteering',
    then: yup.array().required('Roles is required'),
  }),
});

const emptyForm = {
  name: '',
  coverImage: '',
  eventType: 'workshop',
  volunteerType: 'committed',
  deadline: dayjs().toISOString(),
  vacancies: '',
  description: '',
  facilitatorName: '',
  facilitatorPhoto: '',
  facilitatorDescription: '',
  roles: [],
  contentUrl: '',
  contentType: 'pdf',
  location: '',
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
};

const AdminEventForm: FC<AdminEventFormProps> = ({ id, isNew }) => {
  const classes = useStyles();
  const event = useSelector((state: StoreState) => state.event);
  const eventForm: any = useSelector((state: StoreState) => state.event.form);
  const user = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch();

  // Store feedback event form
  const [feedbackFormEventQuestions, setFeedbackFormEventQuestions] = useState<
    Array<QuestionData>
  >([]);

  // Feedback form helper functions
  const handleAddQuestion = useCallback(() => {
    const newQuestion: QuestionData = {
      type: 'shortAnswer',
      text: '',
      isRequired: true,
      options: [],
    };
    setFeedbackFormEventQuestions([...feedbackFormEventQuestions, newQuestion]);
  }, [feedbackFormEventQuestions]);

  const handleAddOption = useCallback(
    (index: number) => {
      const newOption: Array<string> = [
        ...feedbackFormEventQuestions[index].options,
        '',
      ];

      handleChangeQuestion(newOption, 'options', index);
    },
    [feedbackFormEventQuestions],
  );

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions],
  );

  const handleRemoveOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const currentOption = feedbackFormEventQuestions[questionIndex].options;
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, 'options', questionIndex);
    },
    [feedbackFormEventQuestions],
  );

  const handleChangeQuestion = useCallback(
    (value: string | Array<string> | boolean, key: KeyType, index: number) => {
      const newQuestion: QuestionData = {
        ...feedbackFormEventQuestions[index],
        [key]: value,
      };

      if (key === 'type') {
        newQuestion.text = '';
        newQuestion.options = [];
      }

      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        newQuestion,
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions],
  );

  const handleChangeOption = useCallback(
    (value: string, questionIndex: number, optionIndex: number) => {
      const currentOption: Array<string> = feedbackFormEventQuestions[questionIndex].options;
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        value,
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, 'options', questionIndex);
    },
    [feedbackFormEventQuestions],
  );

  const [dateAndTime, setDateAndTime] = useState({
    fromDate: dayjs(),
    toDate: dayjs(),
    fromTime: '00:00',
    toTime: '00:00',
  });

  const [formData, setFormData] = useState({
    name: '',
    coverImage: '',
    eventType: 'workshop',
    volunteerType: 'committed',
    deadline: dayjs(),
    vacancies: 0,
    description: '',
    facilitatorName: '',
    facilitatorPhoto: '',
    facilitatorDescription: '',
    roles: [],
    contentUrl: null,
    contentType: 'pdf', // TODO: fix this
    location: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(getEvent(id));
    }
  }, [id]);

  useEffect(() => {
    if (event.status === 'rejected') {
      alert('Form submission failed');
    } else if (event.status === 'fulfilled') {
      alert('Form submission successful');
      router.push('/event');
      dispatch(resetImages());
    }
  }, [event.status]);

  const onUploadImage = (imageFile, name) => {
    const form = new FormData();
    form.append('image', imageFile);
    form.append('email', user.user.email);

    return dispatch(uploadImage({ name, form }));
  };

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: eventForm ? keysToCamel(eventForm) : emptyForm,
    validationSchema,
    onSubmit: async (formValues) => {
      const form = formValues;

      // Upload and get cover image URL
      if (formValues.coverImage && typeof formValues.coverImage !== 'string') {
        // @ts-ignore type exists
        await onUploadImage(formValues.coverImage, 'coverImage').then(unwrapResult)
          .then((result) => {
            form.coverImage = result.url;
          });
      }

      // Upload and get facilitator photo URL
      if (
        formValues.facilitatorPhoto
        && typeof formValues.facilitatorPhoto !== 'string'
      ) {
        // @ts-ignore type exists
        await onUploadImage(formValues.facilitatorPhoto, 'facilitatorPhoto').then(unwrapResult)
          .then((result) => {
            form.facilitatorPhoto = result.url;
          });
      }

      dispatch(
        isNew ? createEvent(form) : editEvent({ data: keysToSnake(form), id }),
      );
    },
    enableReinitialize: true,
  });

  const onChangeImage = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setFieldValue(fieldName, imageFile);
      return URL.createObjectURL(imageFile);
    }
  };

  const {
    name,
    eventType,
    volunteerType,
    deadline,
    vacancies,
    description,
    facilitatorName,
    facilitatorDescription,
    startDate,
    endDate,
  } = values;

  if (id !== 'new' && eventForm === null) {
    return <h1>Loading</h1>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaddedGrid>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h1">
              {isNew ? 'Create Event' : 'Edit Event'}
            </Typography>
          </Grid>

          {/* Type of event */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Type of Event</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
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
                initialUrl={eventForm?.cover_image}
                isBig
                onChangeImage={(e) => onChangeImage(e, 'coverImage')}
              />
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
                helperText={errors.name}
                error={touched.name && Boolean(errors.name)}
              />
            </Grid>
          </Grid>

          {/* Volunteer Type */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Volunteer Type</Typography>
            </Grid>
            <Grid item xs={6} md={2}>
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
              <Typography variant="h4">Date</Typography>
            </Grid>
            <Grid item xs={2} md="auto">
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-from"
                name="fromDate"
                value={dayjs(startDate)}
                onChange={(date) => setFieldValue(
                  'startDate',
                  getCombinedDateAndTimeString(
                    date,
                    dayjs(startDate).format('HH:mm'),
                  ),
                )}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                color="secondary"
                helperText={errors.startDate}
                error={touched.startDate && Boolean(errors.startDate)}
              />
            </Grid>
            <Grid item xs={12} md="auto" />
            <Grid item xs={2} md="auto">
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="DD/MM/YYYY"
                margin="dense"
                id="date-to"
                name="toDate"
                value={dayjs(endDate)}
                onChange={(date) => setFieldValue(
                  'endDate',
                  getCombinedDateAndTimeString(
                    date,
                    dayjs(endDate).format('HH:mm'),
                  ),
                )}
                color="secondary"
                helperText={errors.endDate}
                error={touched.endDate && Boolean(errors.endDate)}
              />
            </Grid>
          </Grid>

          {/* Time - From & To */}
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Time</Typography>
            </Grid>
            <Grid item xs={2} md="auto">
              <Typography variant="body1">From</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
              <TextField
                id="time"
                variant="outlined"
                name="fromTime"
                fullWidth
                value={dayjs(startDate).format('HH:mm')}
                margin="dense"
                onChange={(e) => setFieldValue(
                  'startDate',
                  getCombinedDateAndTimeString(
                    dayjs(startDate),
                    e.target.value,
                  ),
                )}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                color="secondary"
                helperText={errors.startDate}
                error={touched.startDate && Boolean(errors.startDate)}
              />
            </Grid>
            <Grid item xs={12} md="auto" />
            <Grid item xs={2} md="auto">
              <Typography variant="body1">To</Typography>
            </Grid>
            <Grid item xs={8} md={2}>
              <TextField
                id="time"
                variant="outlined"
                name="toTime"
                fullWidth
                value={dayjs(endDate).format('HH:mm')}
                margin="dense"
                onChange={(e) => setFieldValue(
                  'endDate',
                  getCombinedDateAndTimeString(dayjs(endDate), e.target.value),
                )}
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                color="secondary"
                helperText={errors.endDate}
                error={touched.endDate && Boolean(errors.endDate)}
              />
            </Grid>
          </Grid>

          {/* Sign-up Deadline */}
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h4">Sign-up Deadline</Typography>
            </Grid>
            <Grid item xs={12}>
              <KeyboardDateTimePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                margin="dense"
                value={dayjs(deadline)}
                onChange={(date) => setFieldValue('deadline', date)}
                disablePast
                format="DD/MM/YYYY HH:mm"
                color="secondary"
                helperText={errors.deadline}
                error={touched.deadline && Boolean(errors.deadline)}
              />
            </Grid>
          </Grid>

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
                helperText={errors.vacancies}
                error={touched.vacancies && Boolean(errors.vacancies)}
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
                helperText={errors.description}
                error={touched.description && Boolean(errors.description)}
              />
            </Grid>
          </Grid>

          {eventType !== 'volunteering' && (
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
                    helperText={errors.facilitatorName}
                    error={
                      touched.facilitatorName && Boolean(errors.facilitatorName)
                    }
                  />
                </Grid>
              </Grid>

              <Grid item container>
                <div className={classes.facilPhotograph}>
                  <DropZoneCard
                    id="facilitatorPhoto"
                    initialUrl={eventForm?.facilitator_photo}
                    isBig={false}
                    onChangeImage={(e) => onChangeImage(e, 'facilitatorPhoto')}
                  />
                </div>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography variant="h4">
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
                    color="secondary"
                    name="facilitatorDescription"
                    value={facilitatorDescription}
                    onChange={handleChange}
                    multiline
                    rows={15}
                    helperText={errors.facilitatorDescription}
                    error={
                      touched.facilitatorDescription
                      && Boolean(errors.facilitatorDescription)
                    }
                  />
                </Grid>
              </Grid>
            </>
          )}

          <Formik
            initialValues={{}}
            onSubmit={() => {}}
            enableReinitialize
          >
            {({ isSubmitting, values }) => (
              <>
                <div>
                  <Typography variant="h2">Volunteer Response Form</Typography>
                </div>

                {/* Feedback form generator based on redux state */}
                {feedbackFormEventQuestions.map(
                  (question: QuestionData, index: number) => (
                    <div key={String(index)}>
                      <div style={{ display: 'flex' }}>
                        <Typography className={classes.questionStyle}>
                          Question
                          {' '}
                          {index + 1}
                        </Typography>
                        <IconButton onClick={() => handleRemoveQuestion(index)}>
                          <ClearIcon />
                        </IconButton>
                      </div>

                      <FormQuestionMapper
                        formType="mcq"
                        name={`type${String(index)}`}
                        options={[
                          { value: 'shortAnswer', label: 'Short Answer' },
                          { value: 'checkboxes', label: 'Check Box' },
                          { value: 'longAnswer', label: 'Long Answer' },
                          { value: 'mcq', label: 'MCQ' },
                        ]}
                        props={{
                          style: { width: '200px' },
                          value: question.type,
                          onChange: (e) => handleChangeQuestion(e.target.value, 'type', index),
                        }}
                      />
                      <FormQuestionMapper
                        formType="shortAnswer"
                        name={question.text + String(index)}
                        props={{
                          value: question.text,
                          placeholder: 'Type question here...',
                          onChange: (e) => handleChangeQuestion(e.target.value, 'text', index),
                        }}
                      />

                      {question.type === 'mcq'
                      || question.type === 'checkboxes' ? (
                        <Formik
                          initialValues={{}}
                          onSubmit={() => {}}
                          enableReinitialize
                        >
                          {({ isSubmitting, values }) => (
                            <>
                              <Typography className={classes.optionStyle}>
                                Options:
                                {' '}
                              </Typography>
                              {question.options.map((option, optionIndex) => (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                  }}
                                >
                                  <FormQuestionMapper
                                    formType="shortAnswer"
                                    name={String(optionIndex)}
                                    key={index}
                                    props={{
                                      style: {
                                        width: '500px',
                                      },
                                      placeholder: 'Type option here...',
                                      value: option,
                                      onChange: (e) => handleChangeOption(
                                        e.target.value,
                                        index,
                                        optionIndex,
                                      ),
                                    }}
                                  />
                                  <IconButton
                                    onClick={() => handleRemoveOption(index, optionIndex)}
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
                        <Typography style={{ display: 'inline-block' }}>
                          Is question required?
                        </Typography>
                        <Switch
                          checked={question.isRequired}
                          onChange={(e) => handleChangeQuestion(
                            e.target.checked,
                            'isRequired',
                            index,
                          )}
                        />
                      </div>
                    </div>
                  ),
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
                {isNew ? 'Create Event' : 'Edit Event'}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </PaddedGrid>
    </form>
  );
};

export default AdminEventForm;
