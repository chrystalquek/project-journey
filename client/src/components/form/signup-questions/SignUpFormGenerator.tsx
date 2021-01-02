import { Fragment } from "react";
import { Paper, Typography, MenuItem, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { QuestionList, OptionType } from "@type/questions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export function generateForm(questionList: QuestionList) {
  let initialValues: any = {};

  questionList.forEach(({ name, type, initialValue }) => {
    initialValues[name] = type === "checkboxes" ? [] : initialValue;
  });

  return (
    <Paper style={{ width: "500px", margin: "auto", padding: "30px" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            // await sleep(500);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {questionList.map((questionItem, index) => {
                const { name, displayText, type } = questionItem;
                const options =
                  type === "mcq" || type === "checkboxes"
                    ? questionItem.options
                    : null;

                return (
                  <Fragment key={index}>
                    <Typography>{displayText}</Typography>
                    {type === "date" ? (
                      <Field
                        component={DatePicker}
                        inputVariant='outlined'
                        format='dd/MM/yyyy'
                        name={name}
                        fullWidth
                      />
                    ) : type === "shortAnswer" ? (
                      <Field
                        component={TextField}
                        variant='outlined'
                        name={name}
                        fullWidth
                      />
                    ) : type === "longAnswer" ? (
                      <Field
                        component={TextField}
                        variant='outlined'
                        name={name}
                        fullWidth
                        multiline
                      />
                    ) : type === "mcq" ? (
                      <Field
                        component={TextField}
                        variant='outlined'
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
                          )
                        )}
                      </Field>
                    ) : (
                      // type === checkboxes
                      <>
                        {(options as Array<OptionType>).map(
                          ({ value, label }) => (
                            <Field
                              component={CheckboxWithLabel}
                              name={name}
                              key={value}
                              value={value}
                              Label={{ label: label }}
                              color='primary'
                              type='checkbox'
                            />
                          )
                        )}
                      </>
                    )}
                  </Fragment>
                );
              })}
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
                size='large'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </Paper>
  );
}
