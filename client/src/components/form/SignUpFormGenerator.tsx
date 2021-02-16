import React, { useState } from 'react';
import { Paper, Typography, Button, makeStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { QuestionList, QuestionWithHeader } from '@type/questions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { uploadImage } from '@redux/actions/image';
import { useRouter } from 'next/router';
import { SignUpResponse } from '@utils/api/response';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { objectMap } from '@utils/helpers/objectMap';
import { ToastStatus } from '@type/common';
import { FormQuestionMapper } from './FormGenerator';

const useStyles = makeStyles((theme) => ({
  // The following style make sure that the error message shows consistently for 'photo'
  errorStyle: {
    color: theme.palette.error.main,
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1.66',
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
  listItem: {
    whiteSpace: 'normal',
  },
  headerStyle: {
    background: 'rgba(0, 186, 220, 30%)', // Light blue
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  infoStyle: {
    fontStyle: 'italic',
    opacity: '70%',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TOAST_MESSAGE_AUTO_DISSAPEAR_MS = 6000;

type FormGeneratorProps = {
  type: VOLUNTEER_TYPE;
  questionWithHeader: QuestionWithHeader;
  handleSignUp: (formValues: Record<string, any>) => Promise<SignUpResponse>;
};

const SignUpFormGenerator = ({
  type,
  questionWithHeader,
  handleSignUp,
}: FormGeneratorProps) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [toastStatus, setToastStatus] = useState<ToastStatus>('success');
  const initialValues: Record<string, any> = {};

  let temp : QuestionList = [];
  
  questionWithHeader.forEach(({ questionList }) => {
    temp = temp.concat(questionList);
  })

  const questionList : QuestionList = temp;
  
  questionList.forEach(({ name, type, initialValue }) => {
    initialValues[name] = type === 'checkboxes' ? [] : initialValue;
  });

  const onUploadImage = (imageFile, name) => {
    const form = new FormData();
    form.append('image', imageFile);
    form.append('email', 'dummy@dummy.com');

    return dispatch(uploadImage({ name, form }));
  };

  const handleSubmit = async (formValues: Record<string, any>) => {
    // @ts-ignore type exists
    const values = objectMap(formValues, (element) =>
      element === '' ? undefined : element
    );

    // Upload and get cover image URL
    if (values.photoUrl && typeof values.photoUrl !== 'string') {
      // @ts-ignore type exists
      await onUploadImage(values.photoUrl, 'photoUrl').then(unwrapResult)
        .then((result) => {
          values.photoUrl = result.url;
        });
    }

    const response = await handleSignUp({
      name: `${values.firstName} ${values.lastName}`,
      volunteerType: type,
      password: values.password,

      nickname: values.nickname,
      gender: values.gender,
      citizenship: values.citizenship,
      birthday: values.birthday.toISOString(),
      mobileNumber: values.mobileNumber,
      photoUrl: values.photoUrl,
      email: values.email,

      socialMediaPlatform: values.socialMediaPlatform,
      instagramHandle: values.instagramHandle,

      organization: values.organization,
      position: values.position,
      race: values.race,

      languages: values.languages
        ?.split(',')
        .map((element) => element.trimStart().trimEnd()), // Delete whitespaces
      referralSources: values.referralSources,

      hasVolunteered: values.hasVolunteered,
      biabVolunteeringDuration: values.biabVolunteeringDuration,

      hasVolunteeredExternally: values.hasVolunteeredExternally,
      volunteeringExperience: values.volunteeringExperience,

      hasChildrenExperience: values.hasChildrenExperience,
      childrenExperience: values.childrenExperience,

      sessionsPerMonth: values.sessionsPerMonth,
      sessionPreference: values.sessionPreference,

      hasFirstAidCertification: values.hasFirstAidCertification,
      leadershipInterest: values.leadershipInterest,
      interests: values.interests,

      skills: values.skills,

      personality: values.personality,
      strengths: values.strengths
        ?.split(',')
        .map((element) => element.trimStart().trimEnd()),
      volunteeringOpportunityInterest: values.volunteeringOpportunityInterest,

      volunteerReason: values.volunteerReason,
      volunteerContribution: values.volunteerContribution,

      // WCA Registration: Medical Information
      hasMedicalNeeds: values.hasMedicalNeeds,
      medicalNeeds: values.medicalNeeds,
      hasAllergies: values.hasAllergies,
      allergies: values.allergies,
      hasMedicationDuringDay: values.hasMedicalDuringDay,

      // WCA Registration: Emergency Contact
      emergencyContactName: values.emergencyContactName,
      emergencyContactNumber: values.emergencyContactNumber,
      emergencyContactEmail: values.emergencyContactEmail,
      emergencyContactRelationship: values.emergencyContactRelationship,
    });

    if (response.type === 'volunteer//rejected') {
      setToastText(`Error: ${response.error.message}`);
      setToastStatus('error');
      setOpenSnackbar(true);
    } else if (response.type === 'volunteer//fulfilled') {
      setToastText('You have signed up successfully.');
      setToastStatus('success');
      setOpenSnackbar(true);
      router.push('/login');
    }
  };

  const phoneRegExp = /^(\+65)?[689]\d{7}$/;
  const personalityRegex = /(I|E)(N|S)(F|T)(J|P)_(A|T)/;

  const requiredSchema: object = {};

  questionList.forEach(({ name, isRequired }) => {
    if (isRequired) {
      requiredSchema[name] = Yup.mixed().required('Required');
    }
  });

  const SignUpSchema = Yup.object().shape({
    ...requiredSchema,
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters!')
      .required('Required'),
    confirmPassword: Yup.string().when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          'Confirm Password need to be the same as Password fields'
        )
        .required('Required'),
    }),
    mobileNumber: Yup.string()
      .matches(phoneRegExp, 'Mobile phone is not valid')
      .required('Required'),
    emergencyContactNumber: Yup.string()
      .matches(phoneRegExp, 'Mobile phone is not valid')
      .required('Required'),
    emergencyContactEmail: Yup.string()
      .email('Invalid email')
      .required('Required'),
    referralSources: Yup.array().required('Required'),
    biabVolunteeringDuration: Yup.number()
      .integer('Input must be an integer')
      .positive('Input must be a positive integer'),
    sessionsPerMonth:
      type === VOLUNTEER_TYPE.ADHOC
        ? Yup.number()
            .integer('Input must be an integer')
            .positive('Input must be a positive integer')
        : Yup.number()
            .integer('Input must be an integer')
            .positive('Input must be a positive integer')
            .required('Required'),
    personality:
      type === VOLUNTEER_TYPE.ADHOC
        ? Yup.mixed()
        : Yup.string()
            .matches(personalityRegex, 'Invalid value')
            .required('Required'),
  });

  return (
    <Paper
      style={{
        margin: 'auto',
        padding: '30px',
        textAlign: 'left',
        maxHeight: '100%',
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignUpSchema}
          validateOnChange={false}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form>
              {questionWithHeader.map(({ header, info, questionList }) => {
                return (
                  <>
                    <Typography
                      className={classes.headerStyle}
                      align='center'
                      variant='h2'
                    >
                      {header}
                    </Typography>
                    {info && (
                      <Typography
                        variant='body2'
                        className={classes.infoStyle}
                      >
                        {info}
                      </Typography>
                    )}
                    {questionList.map((questionItem) => {
                      const {
                        name,
                        displayText,
                        type,
                        isRequired,
                      } = questionItem;
                      const options =
                        type === 'mcq' || type === 'checkboxes'
                          ? questionItem.options
                          : null;

                      return (
                        <div
                          key={name}
                          style={{
                            marginBottom: '32px',
                          }}
                        >
                          {displayText.map((text, index) => (
                            <Typography
                              key={text}
                              style={{
                                marginBottom: '16px',
                                fontWeight: 500,
                              }}
                            >
                              {text}
                              {index === displayText.length - 1 &&
                                isRequired &&
                                ' *'}
                            </Typography>
                          ))}
                          <FormQuestionMapper
                            formType={type}
                            name={name}
                            options={options}
                            setFieldValue={setFieldValue}
                            props={{
                              error: touched[name] ? errors[name] : null,
                            }}
                          />
                        </div>
                      );
                    })}
                  </>
                );
              })}
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={
                  isSubmitting ||
                  !values.permissionEmailCollection ||
                  !values.personalInformationConsent ||
                  !values.acknowledgeTnC ||
                  !values.informedConsent
                }
                size='large'
                style={{ margin: 'auto', display: 'block' }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={TOAST_MESSAGE_AUTO_DISSAPEAR_MS}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <MuiAlert elevation={6} severity={toastStatus}>
          {toastText}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
};

export default SignUpFormGenerator;
