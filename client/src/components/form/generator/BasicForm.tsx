import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormFields } from "@type/form/form";
import React, { FC } from "react";
import { Form, Formik, FormikBag } from "formik";
import { getFieldsInitialValue } from "@utils/helpers/form";
import Button from "@material-ui/core/Button";
import FormQuestionMapper from "./FormQuestionMapper";

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    marginBottom: theme.spacing(8),
  },
  questionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 500,
  },
}));

type RawBasicFormProps = {
  formFields: FormFields;
};

/**
 * Raw React component to create basic form. Need to be wrapped around
 * <Formik> and <Form> to make it work.
 *
 * Props: `{ formFields : FormFields }`
 */
export const RawBasicForm: FC<RawBasicFormProps> = ({ formFields }) => {
  const classes = useStyles();

  // Parse the displayText into JSX.Element
  const parsedData = formFields.map((question) => ({
    ...question,
    displayText: question.displayText.reduce((acc, element) => (
      <React.Fragment key={element.toString()}>
        {acc}
        {typeof element === "string" ? (
          <Typography>{element}</Typography>
        ) : (
          element
        )}
      </React.Fragment>
    )) as JSX.Element,
  }));

  return (
    <>
      {parsedData.map(({ name, type, options, props, displayText }) => {
        const childProps = {
          name,
          type,
          ...(options ? { options } : {}),
          props,
        };

        return (
          <div key={name} className={classes.questionContainer}>
            {/* Form field's Label */}
            {displayText}

            {/* Form field */}
            <FormQuestionMapper key={name} {...childProps} />
          </div>
        );
      })}
    </>
  );
};

// Possible improvement: add types for the form schema
type BasicFormProps = {
  formFields: FormFields;
  validationSchema?: any;
  onSubmit: (
    values: Record<string, any>,
    formikBag: FormikBag<any, any>
  ) => void;
};

/**
 * Complete basic form without any headers. Requires:
 * - formFields
 * - validationSchema?
 * - onSubmit handler.
 */
const BasicForm: FC<BasicFormProps> = ({
  formFields,
  validationSchema,
  onSubmit,
}) => (
  <Formik
    initialValues={getFieldsInitialValue(formFields)}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <RawBasicForm formFields={formFields} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          margin: "auto",
          display: "block",
        }}
      >
        Submit
      </Button>
    </Form>
  </Formik>
);

export default BasicForm;
