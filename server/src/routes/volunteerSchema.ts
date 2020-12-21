import express from 'express';
import volunteerSchemaController from '../controllers/volunteerSchema';
import { validate } from "../helpers/validation";

const router = express.Router();

router.post(
  '/',
  validate(volunteerSchemaController.getValidations('createNewVolunteerField')),
  volunteerSchemaController.createNewVolunteerField,
);

router.delete(
  '/',
  validate(volunteerSchemaController.getValidations('deleteVolunteerField')),
  volunteerSchemaController.deleteVolunteerField,
);

router.get(
  '/',
  validate(volunteerSchemaController.getValidations('getAllVolunteerFields')),
  volunteerSchemaController.getAllVolunteerFields,
);

router.put(
  '/',
  validate(volunteerSchemaController.getValidations('updateVolunteerField')),
  volunteerSchemaController.updateVolunteerField,
);

export default router;
