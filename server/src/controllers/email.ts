import HTTP_CODES from "../constants/httpCodes";
import emailService from "../services/email";
import massEmailService from "../services/massEmail";
import {
  SendCancelEventRequest,
  SendFeedbackRequest as SendFeedbackRequestRequest,
  SendMassFeedbackRequest as SendMassFeedbackRequestRequest,
  SendBuddyRequest,
} from "../types/request/email";
import {
  SendCancelEventResponse,
  SendFeedbackRequestResponse,
  SendMassFeedbackRequestResponse,
  SendBuddyResponse,
} from "../types/response/email";

const sendFeedbackRequest = async (
  req: SendFeedbackRequestRequest,
  res: SendFeedbackRequestResponse
): Promise<void> => {
  try {
    const { userId, eventId } = req.params;
    await emailService.sendEmail("FEEDBACK", userId, eventId);
    res.status(HTTP_CODES.OK).json({ userId, eventId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendMassFeedbackRequest = async (
  req: SendMassFeedbackRequestRequest,
  res: SendMassFeedbackRequestResponse
): Promise<void> => {
  try {
    await massEmailService.sendMassFeedbackEmail();
    res.status(HTTP_CODES.OK).json();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendCancelEvent = async (
  req: SendCancelEventRequest,
  res: SendCancelEventResponse
): Promise<void> => {
  try {
    const { userId, eventId } = req.params;
    await emailService.sendEmail("CANCEL_EVENT", userId, eventId);
    res.status(HTTP_CODES.OK).json({ userId, eventId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendBuddy = async(
  req: SendBuddyRequest,
  res: SendBuddyResponse
): Promise<void> => {
  try {
    const { userId, buddyId } = req.params;
    await emailService.sendEmail("BUDDY", userId, buddyId);
    res.status(HTTP_CODES.OK).json({ userId, buddyId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
}

export default {
  sendFeedbackRequest,
  sendCancelEvent,
  sendMassFeedbackRequest,
  sendBuddy,
};
