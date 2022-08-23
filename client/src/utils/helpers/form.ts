import { FormFields, SectionalFormFields } from "@type/form/form";

export const getFieldsRequired = (formFields: FormFields) =>
  formFields.filter(({ isRequired }) => isRequired).map(({ name }) => name);

export const getFieldsInitialValue = (formFields: FormFields) =>
  formFields
    .map(({ name, initialValue }) => ({ [name]: initialValue }))
    .reduce((acc, cur) => ({
      ...acc,
      ...cur,
    }));

export const getSectionalFieldsRequired = (
  sectionalFormFields: SectionalFormFields
) =>
  sectionalFormFields
    .map(({ fields }) => getFieldsRequired(fields))
    .reduce((acc, cur) => [...acc, ...cur]);

export const getSectionalFieldsInitialValue = (
  sectionalFormFields: SectionalFormFields
) =>
  sectionalFormFields
    .map(({ fields }) => getFieldsInitialValue(fields))
    .reduce((acc, cur) => ({ ...acc, ...cur }));
