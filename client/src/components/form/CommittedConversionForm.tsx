import React from "react";
import { useAppSelector } from "@redux/store";
import {
  conversionFormQuestions,
  conversionSchema,
} from "./questions/CommittedConversionQuestionList";
import SectionalForm from "./generator/SectionalForm";

const CommittedConversionForm = ({ handleSubmit }) => {
  const userData = useAppSelector((state) => state.session.user);

  if (!userData) {
    return null;
  }

  // Fill in the values that are already available from the volunteer's data
  const filledConversionForm = conversionFormQuestions.map((section) => {
    const { fields } = section;

    // Set the initial values for each field in every section.
    const newFields = fields.map((question) => {
      const { name, initialValue } = question;

      const newValue = name in userData ? userData[name] : initialValue;

      return {
        ...question,
        initialValue:
          name === "languages" || name === "strengths"
            ? newValue.join(", ")
            : newValue,
      };
    });

    return {
      ...section,
      fields: newFields,
    };
  });

  return (
    <SectionalForm
      sectionalFormFields={filledConversionForm}
      validationSchema={conversionSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default CommittedConversionForm;
