import { OptionType } from "./option";

export type FormQuestionType = "short-answer" | "mcq" | "check-box";

// used for FE only
export type InputType =
  | "shortAnswer"
  | "longAnswer"
  | "checkboxes"
  | "date"
  | "datetime"
  | "mcq"
  | "password"
  | "image"
  | "number";

export type QuestionItem = {
  name: string;
  displayText: Array<string | JSX.Element>;
  type: InputType;
  initialValue: any;
  options?: Array<OptionType>;
  isRequired: boolean;
  props?: Record<string, any>;
};

export type QuestionList = Array<QuestionItem>;
