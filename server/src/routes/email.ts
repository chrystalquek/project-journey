import express from 'express';
import emailController from '../controllers/email';

const router = express.Router();

router.get('/feedback/:userId/:eventId', (req, res) => emailController.sendFeedbackRequest(req, res));

router.get('/event-cancel/:userId/:eventId', (req, res) => emailController.sendCancelEvent(req, res));

router.get('/feedback-mass', (req, res) => emailController.sendMassFeedbackRequest(req, res));

export default router;
