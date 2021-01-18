export type InputType =
  | 'shortAnswer'
  | 'longAnswer'
  | 'checkboxes'
  | 'date'
  | 'mcq'
  | 'password'
  | 'photo'
  | 'number';

export type OptionType = { value: any; label: string };

export type QuestionItem = {
  name: string;
  displayText: string[];
  type: InputType;
  initialValue: string | Date | number | [] | boolean | null;
  options?: Array<OptionType>;
  isRequired: boolean;
};

export type QuestionList = Array<QuestionItem>;
