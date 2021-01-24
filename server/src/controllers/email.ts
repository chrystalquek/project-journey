import express from 'express';
import HTTP_CODES from '../constants/httpCodes';

import emailService from '../services/email';
import generateDummyUser from '../dummy/user';
import generateDummyEvent from '../dummy/event';

const sendFeedbackRequest = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { userId, eventId } = req.params;
    await emailService.sendEmail('FEEDBACK', userId, eventId);
    res.status(HTTP_CODES.OK);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendCancelEvent = async (req: express.Request, res: express.Response): Promise<void> => {

};

export default {
  sendFeedbackRequest,
  sendCancelEvent,
};
