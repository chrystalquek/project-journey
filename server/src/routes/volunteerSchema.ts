import express from 'express';
import volunteerSchemaController from '../controllers/volunteerSchema';

const router = express.Router();

router.post(
  '/',
  volunteerSchemaController.validate('createNewVolunteerField'),
  volunteerSchemaController.createNewVolunteerField,
);

router.delete(
  '/',
  volunteerSchemaController.validate('deleteVolunteerField'),
  volunteerSchemaController.deleteVolunteerField,
);

router.get(
  '/',
  volunteerSchemaController.validate('getAllVolunteerFields'),
  volunteerSchemaController.getAllVolunteerFields,
);

router.put(
  '/',
  volunteerSchemaController.validate('updateVolunteerField'),
  volunteerSchemaController.updateVolunteerField,
);

export default router;
