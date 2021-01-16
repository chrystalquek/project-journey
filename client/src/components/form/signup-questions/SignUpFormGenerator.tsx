import { Fragment, useCallback } from 'react';
import { Paper, Typography, MenuItem, Button } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { QuestionList, OptionType, InputType } from '@type/questions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import DropZoneCard from '@components/common/DropZoneCard';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { uploadImage } from '@redux/actions/image';
import { useRouter } from 'next/router';
import { SignUpResponse } from '@utils/api/response';

type FormGeneratorProps = {
  type: VOLUNTEER_TYPE;
  questionList: QuestionList;
  handleSignUp: (formValues: Record<string, any>) => SignUpResponse;
};

const FormGenerator = ({ type, questionList, handleSignUp }: FormGeneratorProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: Record<string, any> = {};

  questionList.forEach(({ name, type, initialValue }) => {
    initialValues[name] = type === 'checkboxes' ? [] : initialValue;
  });

  const onUploadImage = (imageFile, name) => {
    const form = new FormData();
    form.append('image', imageFile);
    form.append('email', 'dummy@dummy.com');

    return dispatch(uploadImage({ name, form }));
  };

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      // Upload and get cover image URL
      if (values.photoUrl && typeof values.photoUrl !== 'string') {
        // @ts-ignore type exists
        await onUploadImage(values.photoUrl, 'photoUrl').then(unwrapResult)
          .then((result) => {
            values.photoUrl = result.url;
          });
      }

      const response = handleSignUp({
        name: values.firstName + ' ' + values.lastName,
        volunteerType: type,
        password: values.password,

        nickname: values.nickname,
        gender: values.gender,
        citizenship: values.citizenship,
        birthday: values.birthday.toISOString(),
        mobileNumber: values.mobileNumber,
        photoUrl: values.photoUrl,
        email: values.email,

        instagramHandle: values.instagramHandle,

        organization: values.organization,
        position: values.position,

        languages: values.languages.split(',').map(element => element.trimStart().trimEnd()), // Delete whitespaces
        referralSources: values.referralSources,

        hasVolunteered: values.hasVolunteered,

        volunteerReason: values.volunteerReason, // Essay

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

      response.then((data) => {
        if (data.type === 'volunteer//rejected') {
          alert('Error: ' + data.error.message);
        } else if (data.type === 'volunteer//fulfilled') {
          alert('You have signed up successfully.');
          router.push('/login');
        }
      });
    },
    [questionList]
  );

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const requiredSchema: object = {};

  questionList.forEach(({ name, isRequired }) => {
    if (isRequired) {
      requiredSchema[name] = Yup.string().required('Required');
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
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Confirm Password need to be the same as Password fields'
      ),
    }),
    mobileNumber: Yup.string()
      .matches(phoneRegExp, 'Mobile phone is not valid')
      .required('Required'),
    emergencyContactNumber: Yup.string()
      .matches(phoneRegExp, 'Mobile phone is not valid')
      .required('Required'),
    referralSources: Yup.array().required('Required'),
    biabVolunteeringDuration: Yup.number().integer('Input must be an integer').positive('Input must be a positive integer'),
    sessionsPerMonth: type === VOLUNTEER_TYPE.ADHOC
                        ? Yup.number().integer('Input must be an integer').positive('Input must be a positive integer')
                        : Yup.number().integer('Input must be an integer').positive('Input must be a positive integer').required('Required')
  });

  const onChangeImage = (e, fieldName, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setFieldValue(fieldName, imageFile);
      return URL.createObjectURL(imageFile);
    }
  };

  const FormQuestionMapper = ({
    formType,
    name,
    options,
    setFieldValue,
  }: {
    formType: InputType;
    name: string;
    options: OptionType[] | null;
    setFieldValue?: any; // Should be the same type as setFieldValue from Formik
  }) => {
    switch (formType) {
      case 'date':
        return (
          <Field
            component={DatePicker}
            inputVariant='outlined'
            format='dd/MM/yyyy'
            name={name}
            fullWidth
            margin='dense'
          />
        );
      case 'shortAnswer':
      case 'password':
        return (
          <Field
            component={TextField}
            variant='outlined'
            type={formType === 'password' ? formType : 'text'}
            name={name}
            fullWidth
            margin='dense'
          />
        );
      case 'longAnswer':
        return (
          <Field
            component={TextField}
            variant='outlined'
            name={name}
            fullWidth
            multiline
            margin='dense'
          />
        );
      case 'mcq':
        return (
          <Field
            component={TextField}
            variant='outlined'
            name={name}
            fullWidth
            select
            InputLabelProps={{
              shrink: true,
            }}
            margin='dense'
          >
            {(options as Array<OptionType>).map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Field>
        );
      case 'photo':
        return (
          <div style={{ width: '100%', height: '200px' }}>
            <DropZoneCard
              id={name}
              initialUrl={null}
              isBig={false}
              onChangeImage={(e) => onChangeImage(e, name, setFieldValue)}
            />
          </div>
        );
      case 'number':
        return (
          <Field
            component={TextField}
            variant='outlined'
            type='number'
            name={name}
            fullWidth
            margin='dense'
          />
        )
      case 'checkboxes':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(options as Array<OptionType>).map(({ value, label }) => (
              <div style={{ flex: 1 }}>
                <Field
                  component={CheckboxWithLabel}
                  name={name}
                  key={value}
                  value={value}
                  Label={{ label }}
                  color='primary'
                  type='checkbox'
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <Paper
      style={{
        width: '500px',
        margin: 'auto',
        padding: '30px',
        textAlign: 'left',
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignUpSchema}
          validateOnChange={false}
        >
          {({ isSubmitting, touched, setFieldValue, values, errors }) => (
            <Form>
              {questionList.map((questionItem) => {
                const { name, displayText, type, isRequired } = questionItem;
                const options =
                  type === 'mcq' || type === 'checkboxes'
                    ? questionItem.options
                    : null;

                return (
                  <div
                    key={questionItem.displayText[0]}
                    style={{
                      marginBottom: '32px',
                    }}
                  >
                    {displayText.map((text, index) => {
                      return (
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
                      );
                    })}
                    <FormQuestionMapper
                      formType={type}
                      name={name}
                      options={options}
                      setFieldValue={setFieldValue}
                    />
                  </div>
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
    </Paper>
  );
};

export default FormGenerator;
