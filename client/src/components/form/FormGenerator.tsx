import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { QuestionList } from '@type/questions';
import {
  Button, makeStyles, Paper, Typography,
} from '@material-ui/core';
import { FormQuestionMapper } from './signup-questions/SignUpFormGenerator';

type FormQuestionsGeneratorType = {
  handleSubmit: (values: Record<string, any>) => void
  questionsList: QuestionList
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(8),
    textAlign: 'left',
    overflowY: 'scroll',
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
}));

const FormQuestionsGenerator: FC<FormQuestionsGeneratorType> = ({
  handleSubmit,
  questionsList,
}) => {
  const initialValues: Record<string, any> = {};
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {({
            isSubmitting, setFieldValue,
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

export default FormQuestionsGenerator;
