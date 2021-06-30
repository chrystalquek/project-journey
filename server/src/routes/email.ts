import express from "express";
import emailController from "../controllers/email";

const router = express.Router();

// TODO secure email routes
// Note: Exposed API for Google Scheduler

// @route   POST /email/feedback/:userId/:eventId
// @desc    To send emails to request feedback from a volunteer
router.post("/feedback/:userId/:eventId", emailController.sendFeedbackRequest);

// @route   POST /email/event-cancel/:userId/:eventId
// @desc    To send emails to volunteers that event has been cancelled
router.post("/event-cancel/:userId/:eventId", emailController.sendCancelEvent);

// @route   POST /email/feedback-mass
// @desc    To send emails to request feedback
// from volunteers involved in recent events
router.post("/feedback-mass", emailController.sendMassFeedbackRequest);

export default router;
