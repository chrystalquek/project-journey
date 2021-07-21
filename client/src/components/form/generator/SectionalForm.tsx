import React, { FC } from "react";
import { SectionalFormFields } from "@type/form/form";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, FormikBag } from "formik";
import { getSectionalFieldsInitialValue } from "@utils/helpers/form";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { RawBasicForm } from "./BasicForm";

const useStyles = makeStyles((theme) => ({
  headerStyle: {
    background: theme.palette.secondary.main.concat("4d"), // Light blue with 30% alpha.
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  infoStyle: {
    fontStyle: "italic",
    opacity: "70%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

type RawSectionalFormProps = {
  sectionalFormFields: SectionalFormFields;
};

/**
 * Raw React component to create a sectional form (form with headers). Need
 * to be wrapped around <Formik> and <Form> components.
 *
 * Props: `{ sectionalFormFields: SectionalFormFields }`
 */
export const RawSectionalForm: FC<RawSectionalFormProps> = ({
  sectionalFormFields,
}) => {
  const classes = useStyles();

  return (
    <>
      {sectionalFormFields.map(({ header, info, fields }) => (
        <React.Fragment key={header}>
          <Typography
            className={classes.headerStyle}
            align="center"
            variant="h2"
          >
            {header}
          </Typography>
          <Typography variant="body2" className={classes.infoStyle}>
            {info}
          </Typography>
          <RawBasicForm formFields={fields} />
        </React.Fragment>
      ))}
    </>
  );
};

type SectionalFormProps = {
  sectionalFormFields: SectionalFormFields;
  validationSchema?: any;
  onSubmit: (
    values: Record<string, any>,
    formikBag: FormikBag<any, any>
  ) => void;
};

const SectionalForm: FC<SectionalFormProps> = ({
  sectionalFormFields,
  validationSchema,
  onSubmit,
}) => (
  <Formik
    initialValues={getSectionalFieldsInitialValue(sectionalFormFields)}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <RawSectionalForm sectionalFormFields={sectionalFormFields} />
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

export default SectionalForm;
