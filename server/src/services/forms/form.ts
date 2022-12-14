import Form, { FormData, NewFormData } from "../../models/Forms/Form";

/**
 * Create form attached to event
 * @param formData form data created
 */
const createForm = async (formData: NewFormData): Promise<FormData> => {
  const formSchemaData = new Form({
    eventId: formData.eventId,
  });
  const form = await formSchemaData.save();
  return form;
};

/**
 * Get form details
 * @param eventId eventId related to form
 */
const getForm = async (eventId: string) => {
  const form = await Form.findOne({
    eventId,
  })
    .lean()
    .exec();

  if (!form) {
    throw new Error(
      `Form with specified event id: ${eventId} could not be founds`
    );
  }

  return form;
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
      throw new Error(
        `Relevant form with event id: ${eventId} cannot be found`
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createForm,
  getForm,
  deleteForm,
};
