import mongoose from 'mongoose';
import Form from '../../models/Forms/Form';
import { FormData } from '../../types';

/**
 * Create form attached to event
 * @param formData form data created
 */
const createForm = async (formData: FormData): Promise<string> => {
  const formId = new mongoose.Types.ObjectId();
  const formSchemaData = new Form({
    _id: formId,
    name: formData.name,
    description: formData.description,
    eventId: formData.eventId,
  });
  await formSchemaData.save();
  return formId.toHexString();
};

/**
 * Delete form attached to event - unlikely will be used
 * @param eventId to use to delete form (1 to 1 relationship)
 */
const deleteForm = async (eventId: string): Promise<void> => {
  try {
    const form = Form.findOneAndRemove({
      eventId,
    });
    if (!form) {
      throw new Error(`Relevant form with event id: ${eventId} cannot be found`);
    }
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createForm,
  deleteForm,
};
