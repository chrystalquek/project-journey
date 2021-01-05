import { Fragment, useCallback } from 'react';
import {
  Paper, Typography, MenuItem, Button,
} from '@material-ui/core';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { QuestionList, OptionType, InputType } from '@type/questions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';

type FormGeneratorProps = {
  questionList: QuestionList
  handleSignUp: (formValues: Record<string, any>) => void
}

const FormGenerator = ({ questionList, handleSignUp }: FormGeneratorProps) => {
  const initialValues: Record<string, any> = {};

  questionList.forEach(({ name, type, initialValue }) => {
    initialValues[name] = type === 'checkboxes' ? [] : initialValue;
  });

  const handleSubmit = useCallback((values: Record<string, any>) => {
    handleSignUp(values);
  }, [questionList]);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    confirmPassword: Yup.string().when('password', {
      is: (val: string) => val && val.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Confirm Password need to be the same as Password fields',
      ),
    }),
    mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile phone is not valid').required(),
    institutionName: Yup.string().required(),
    position: Yup.string().required(),
  });

  const FormQuestionMapper = ({ formType, name, options }: {
    formType: InputType,
    name: string,
    options: OptionType[] | null
  }) => {
    switch (formType) {
      case 'date':
        return (
          <Field
            component={DatePicker}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            name={name}
            fullWidth
          />
        );
      case 'shortAnswer':
      case 'password':
        return (
          <Field
            component={TextField}
            variant="outlined"
            type={formType === 'password' ? formType : 'text'}
            name={name}
            fullWidth
          />
        );
      case 'longAnswer':
        return (
          <Field
            component={TextField}
            variant="outlined"
            name={name}
            fullWidth
            multiline
          />
        );
      case 'mcq':
        return (
          <Field
            component={TextField}
            variant="outlined"
            name={name}
            fullWidth
            select
            InputLabelProps={{
              shrink: true,
            }}
          >
            {(options as Array<OptionType>).map(
              ({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ),
            )}
          </Field>
        );
      case 'checkboxes':
      default:
        return (
          <>
            {(options as Array<OptionType>).map(
              ({ value, label }) => (
                <Field
                  component={CheckboxWithLabel}
                  name={name}
                  key={value}
                  value={value}
                  Label={{ label }}
                  color="primary"
                  type="checkbox"
                />
              ),
            )}
          </>
        );
    }
  };

  return (
    <Paper style={{ width: '500px', margin: 'auto', padding: '30px' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignUpSchema}
          validateOnChange={false}
        >
          {({
            isSubmitting,
            touched,
            values,
            errors,
          }) => (

            <Form>
              {questionList.map((questionItem) => {
                const { name, displayText, type } = questionItem;
                const options = type === 'mcq' || type === 'checkboxes'
                  ? questionItem.options
                  : null;

                return (
                  <div
                    key={questionItem.displayText}
                    style={{
                      marginBottom: '32px',
                    }}
                  >
                    <Typography style={{
                      marginBottom: '16px',
                    }}
                    >
                      {displayText}
                    </Typography>
                    <FormQuestionMapper formType={type} name={name} options={options} />
                  </div>
                );
              })}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                size="large"
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
