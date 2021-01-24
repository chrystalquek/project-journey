import express from 'express';
import emailController from '../controllers/email';

const router = express.Router();

router.get('/feedback', (req, res) => emailController.sendFeedbackRequest(req, res));

export default router;
