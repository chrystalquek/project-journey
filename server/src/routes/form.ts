import { Router } from 'express';
import { validate } from '../helpers/validation';
import formController from '../controllers/form';
import authorize from '../helpers/authorize';

const router = Router();

// @route   POST /form
// @desc    For admin to create event form
router.post('/', authorize(['admin']), validate(formController.getValidations('createForm')), formController.createForm);

// @route   GET /form/:eventId
// @desc    For volunteers and admin to get event form
router.get('/:eventId', authorize([]), validate(formController.getValidations('getFormDetails')), formController.getEventFormDetails);

// @route   POST /form/answer
// @desc    For volunteers to submit answers to event form
router.post('/answer', authorize(['ad-hoc', 'committed']), validate(formController.getValidations('answerForm')), formController.answerFormQuestions);

export default router;
