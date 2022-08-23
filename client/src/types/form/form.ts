import { FormDisabledReason } from "@components/event/helpers/EventDetails/EventDetails";
import { SignUpData } from "@type/signUp";
import { QuestionItem } from "./question";

// all types only used by FE

export type FormFields = Array<QuestionItem>;

export type FormSection = {
  header: string;
  info?: string;
  fields: FormFields;
};

export type SectionalFormFields = Array<FormSection>;

// Contains types used in /event
export type FormStatus = {
  disabled: boolean;
  reason: FormDisabledReason;
  details: {
    acceptedSignUp: SignUpData | null;
  };
};
