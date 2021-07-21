import React from "react";
import BasicForm from "./generator/BasicForm";
import {
  conversionFormQuestions,
  conversionSchema,
} from "./questions/CommittedConversionQuestionList";

const CommittedConversionForm = ({ handleSubmit }) => (
  <BasicForm
    formFields={conversionFormQuestions}
    validationSchema={conversionSchema}
    onSubmit={handleSubmit}
  />
);

export default CommittedConversionForm;
