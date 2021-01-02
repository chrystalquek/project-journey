import React from "react";
import { questions } from "./signup-questions/SignUpQuestionList";
import { generateForm } from "./signup-questions/SignUpFormGenerator";

function SignUpForm() {
  return <>{generateForm(questions)}</>;
}

export default SignUpForm;
