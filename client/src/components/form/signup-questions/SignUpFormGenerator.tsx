import { Fragment, useCallback } from 'react';
import {
  Paper, Typography, MenuItem, Button,
} from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { QuestionList, OptionType, InputType } from '@type/questions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
        return (
          <Field
            component={TextField}
            variant="outlined"
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
        >
          {({ isSubmitting }) => (
            <Form>
              {questionList.map((questionItem) => {
                const { name, displayText, type } = questionItem;
                const options = type === 'mcq' || type === 'checkboxes'
                  ? questionItem.options
                  : null;

                return (
                  <Fragment key={questionItem.displayText}>
                    <Typography>{displayText}</Typography>
                    <FormQuestionMapper formType={type} name={name} options={options} />
                  </Fragment>
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
