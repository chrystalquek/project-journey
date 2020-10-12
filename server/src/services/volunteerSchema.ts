import mongoose from 'mongoose';
import { FormFieldType, VolunteerSchemaData } from '../types';
import VolunteerSchema from '../models/VolunteerSchema';

export const addField = async (fieldName: string, fieldType: FormFieldType) => {
  const createdAtDate = new Date().toISOString();

  const volunteerFieldData = new VolunteerSchema({
    _id: new mongoose.Types.ObjectId(),
    name: fieldName,
    field_type: fieldType,
    created_at: createdAtDate,
    modified_at: createdAtDate,
  });

  await volunteerFieldData.save();
};

export const getAllFields = async () => {
  const currentVolunteerSchema = await VolunteerSchema.find({});
  return currentVolunteerSchema.map((value) => value.name);
};

export const updateField = async (
  fieldName: string,
  newFieldName?: string, fieldType?: FormFieldType,
) => {
  const updatedVolunteerFieldSchema = {
    name: newFieldName,
    field_type: fieldType,
  };

  await VolunteerSchema.findOneAndUpdate({ fieldName }, updatedVolunteerFieldSchema);
};

export const deleteField = async (fieldName: string) => {
  await VolunteerSchema.deleteOne({
    name: fieldName,
  });
};
