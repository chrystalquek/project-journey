export type InputType =
  | 'shortAnswer'
  | 'longAnswer'
  | 'checkboxes'
  | 'date'
  | 'mcq'
  | 'password';

export type OptionType = { value: string; label: string };

export type QuestionItem = {
  name: string;
  displayText: string;
  type: InputType;
  initialValue: string | Date | number;
  options?: Array<OptionType>;
};

export type QuestionList = Array<QuestionItem>;
