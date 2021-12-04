import jwt from "jsonwebtoken";
import HTTP_CODES from "../constants/httpCodes";
import emailService from "../services/email";
import massEmailService from "../services/massEmail";
import volunteerService from "../services/volunteer";
import { accessTokenSecret } from "../helpers/auth";
import {
  SendCancelEventRequest,
  SendFeedbackRequest as SendFeedbackRequestRequest,
  SendForgotPasswordRequest,
  SendMassFeedbackRequest as SendMassFeedbackRequestRequest,
  SendBuddyRequest,
} from "../types/request/email";
import {
  SendCancelEventResponse,
  SendFeedbackRequestResponse,
  SendForgotPasswordResponse,
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

const sendBuddy = async (
  req: SendBuddyRequest,
  res: SendBuddyResponse
): Promise<void> => {
  try {
    const { userId, buddyId } = req.params;
    await emailService.sendEmail("BUDDY", userId, null, buddyId);
    res.status(HTTP_CODES.OK).json({ userId, buddyId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const sendForgotPassword = async (
  req: SendForgotPasswordRequest,
  res: SendForgotPasswordResponse
) => {
  try {
    const { email } = req.body;

    const volunteer = await volunteerService.getVolunteer(email);

    if (volunteer) {
      const token = jwt.sign(
        JSON.parse(JSON.stringify(volunteer)),
        accessTokenSecret,
        {
          expiresIn: "24h",
        }
      );

      await emailService.sendForgotPassword(volunteer, token);
      res.status(HTTP_CODES.OK).json({
        message: `Email sent to ${email}`,
      });
    } else {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
        errors: [
          {
            msg: `There is no user with email address ${email}`,
          },
        ],
      });
    }
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [
        {
          msg: err.message,
        },
      ],
    });
  }
};

export default {
  sendFeedbackRequest,
  sendCancelEvent,
  sendMassFeedbackRequest,
  sendBuddy,
  sendForgotPassword,
};
