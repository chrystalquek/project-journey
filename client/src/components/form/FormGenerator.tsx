import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import DropZoneCard from '@components/common/DropZoneCard';
import { InputType, OptionType, QuestionList } from '@type/questions';
import {
  Button, makeStyles, MenuItem, Paper, Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { StoreState } from '@redux/store';

type FormGeneratorType = {
  handleSubmit: (values: Record<string, any>) => Promise<void>
  questionsList: QuestionList
  validationObj: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(8),
    textAlign: 'left',
    overflowY: 'hidden',
    maxHeight: '100%',
  },
  questionContainer: {
    marginBottom: theme.spacing(8),
  },
  questionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 500,
  },
  button: {
    margin: 'auto',
    display: 'block',
  },
  listItem: {
    whiteSpace: 'normal',
  },
  errorStyle: {
    color: theme.palette.error.main,
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1.66',
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
}));

export const FormQuestionMapper = ({
  formType,
  name,
  options,
  setFieldValue,
  props,
} : {
  formType: InputType;
  name: string;
  options?: OptionType[] | null;
  setFieldValue?: any; // Should be the same type as setFieldValue from Formik
  props?: Record<string, any>;
}) => {
  const classes = useStyles();

  const onChangeImage = (e, fieldName, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setFieldValue(fieldName, imageFile);
      return URL.createObjectURL(imageFile);
    }
  };

  switch (formType) {
    case 'date':
      return (
        <Field
          component={DatePicker}
          inputVariant="outlined"
          format="dd/MM/yyyy"
          name={name}
          fullWidth
          margin="dense"
          {...props}
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
          margin="dense"
          {...props}
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
          margin="dense"
          {...props}
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
          margin="dense"
          {...props}
        >
          {(options as Array<OptionType>).map(({ value, label }) => (
            <MenuItem className={classes.listItem} key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Field>
      );
    case 'photo':
      return (
        <>
          <div style={{ width: '100%', height: '200px' }}>
            <DropZoneCard
              id={name}
              initialUrl={null}
              isBig={false}
              onChangeImage={(e) => onChangeImage(e, name, setFieldValue)}
            />
          </div>
          {!!props?.error && <Typography variant="body2" className={classes.errorStyle}>Required</Typography>}
        </>
      );
    case 'number':
      return (
        <Field
          component={TextField}
          variant="outlined"
          type="number"
          name={name}
          fullWidth
          margin="dense"
          {...props}
        />
      );
    case 'checkboxes':
    default:
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(options as Array<OptionType>).map(({ value, label }) => (
            <div style={{ flex: 1 }} key={value + label}>
              <Field
                component={CheckboxWithLabel}
                name={name}
                key={value}
                value={value}
                Label={{ label }}
                color="primary"
                type="checkbox"
                {...props}
              />
            </div>
          ))}
        </div>
      );
  }
};

const FormGenerator: FC<FormGeneratorType> = ({
  handleSubmit,
  questionsList,
  validationObj
}) => {
  const classes = useStyles();
  const initialValues: Record<string, any> = {};
  const userData = useSelector((state: StoreState) => state.user.user);

  questionsList.forEach(({ name, type, initialValue }) => {
    initialValues[name] = type === 'checkboxes' ? [] : initialValue;
    // Autofill with user data
    if (userData.hasOwnProperty(name)) {
      initialValues[name] = userData[name];
    }
  })


  const validationSchema = Yup.object().shape(validationObj);

  return (
    <Paper elevation={0} className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validationSchema={validationSchema}
        >
          {({
            isSubmitting, setFieldValue
          }) => (
            <Form>
              {questionsList.map((questionItem) => {
                const {
                  name, displayText, type, isRequired,
                } = questionItem;
                const options = type === 'mcq' || type === 'checkboxes'
                  ? questionItem.options
                  : null;

                return (
                  <div key={name} className={classes.questionContainer}>
                    {displayText.map((text, index) => (
                      <Typography
                        key={text}
                        className={classes.questionTitle}
                      >
                        {text}
                        {index === displayText.length - 1
                            && isRequired
                            && ' *'}
                      </Typography>
                    ))}
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
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                size="large"
                className={classes.button}
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
