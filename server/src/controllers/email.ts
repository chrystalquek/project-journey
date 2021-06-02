import express from 'express';
import HTTP_CODES from '../constants/httpCodes';
import emailService from '../services/email';
import massEmailService from '../services/massEmail';

const sendFeedbackRequest = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { userId, eventId } = req.params;
    await emailService.sendEmail('FEEDBACK', userId, eventId);
    res.status(HTTP_CODES.OK).json({ userId, eventId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendMassFeedbackRequest = async (
  req: express.Request, res: express.Response): Promise<void> => {
  try {
    await massEmailService.sendMassFeedbackEmail();
    res.status(HTTP_CODES.OK).json();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendCancelEvent = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { userId, eventId } = req.params;
    await emailService.sendEmail('CANCEL_EVENT', userId, eventId);
    res.status(HTTP_CODES.OK).json({ userId, eventId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  sendFeedbackRequest,
  sendCancelEvent,
  sendMassFeedbackRequest,
};
