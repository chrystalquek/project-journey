import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { DatePicker, KeyboardDateTimePicker } from "formik-material-ui-pickers";
import {
  makeStyles,
  MenuItem,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import { OptionType } from "@type/form/option";
import { InputType } from "@type/form/question";
import ImageField from "./ImageField";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: theme.spacing(8),
    textAlign: "left",
    overflowY: "hidden",
    maxHeight: "100%",
  },
  questionContainer: {
    marginBottom: theme.spacing(8),
  },
  questionTitle: {
    marginBottom: theme.spacing(4),
    fontWeight: 500,
  },
  button: {
    margin: "auto",
    display: "block",
  },
  listItem: {
    whiteSpace: "normal",
  },
  errorStyle: {
    color: theme.palette.error.main,
    fontWeight: "normal",
    fontSize: "0.75rem",
    lineHeight: "1.66",
    marginLeft: "14px",
    marginRight: "14px",
    marginTop: "4px",
  },
}));

type FormQuestionMapperProps = {
  type: InputType;
  name: string;
  options?: Array<OptionType>;
  props?: Record<string, any>;
};

const FormQuestionMapper: FC<FormQuestionMapperProps> = ({
  type,
  name,
  options = [],
  props,
}) => {
  const classes = useStyles();

  switch (type) {
    case "date":
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
    case "datetime":
      return (
        <Field
          component={KeyboardDateTimePicker}
          ampm={false}
          clearable
          disableToolbar
          inputVariant="outlined"
          format="dd/MM/yyyy HH:mm"
          name={name}
          fullWidth
          margin="dense"
          {...props}
        />
      );
    case "shortAnswer":
    case "password":
      return (
        <Field
          component={TextField}
          variant="outlined"
          type={type === "password" ? type : "text"}
          name={name}
          fullWidth
          margin="dense"
          {...props}
        />
      );
    case "longAnswer":
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
    case "mcq":
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
    case "image":
      return <ImageField name={name} {...props} />;
    case "number":
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
    case "checkboxes":
    default:
      return (
        <FormGroup>
          {options.map(({ value, label }) => (
            <Field
              component={CheckboxWithLabel}
              name={name}
              key={value}
              value={value}
              Label={{ label }}
              color="primary"
              type="checkbox"
            />
          ))}
          <ErrorMessage name={name}>
            {(msg) => <FormHelperText error>{msg}</FormHelperText>}
          </ErrorMessage>
        </FormGroup>
      );
  }
};

export default FormQuestionMapper;
