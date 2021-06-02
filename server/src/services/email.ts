import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import ejs from 'ejs';
import Volunteer, { VolunteerData } from '../models/Volunteer';
import Event, { EventData } from '../models/Event';
import Mail from 'nodemailer/lib/mailer';


const { OAuth2 } = google.auth;

type EmailTemplate = 'CANCEL_EVENT' | 'FEEDBACK' | 'EVENT_SIGN_UP_CONFIRMATION' | 'WAITLIST_TO_CONFIRMED';
type EmailMetadata = {
  to: string,
  cc: string[],
  bcc: string[],
  subject: string,
  templateFile: string,
  templateData: object,
}

const EMAIL_TYPE_INVALID = 'Email type is invalid';
const DETAILS_NOT_FOUND = 'Event or volunteer is not found';

const FEEDBACK_TEMPLATE_FILE = 'src/views/feedback.ejs';
const WAITLIST_TO_CONFIRMED_TEMPLATE_FILE = 'src/views/waitlist-to-confirmed.ejs';
const EVENT_SIGN_UP_CONFIRMATION_TEMPLATE_FILE = 'src/views/event-sign-up-confirmation.ejs';
const EVENT_CANCEL_TEMPLATE_FILE = 'src/views/event-cancel.ejs';

const getSmtpTransport = async (): Promise<Mail> => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  google.options({ auth: oauth2Client });

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();
  const transportOptions = {
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL_ADDRESS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  const smtpTransport = nodemailer.createTransport(transportOptions as TransportOptions);

  return smtpTransport;
};

const sendEmailHelper = async (to: string[], cc: string[],
  bcc: string[], subject: string, templateFile: string,
  templateData: Record<string, string>): Promise<void> => {
  const smtpTransport = await getSmtpTransport();

  ejs.renderFile(templateFile, templateData, (err, content) => {
    try {
      const mainOptions = {
        from: `Blessings in a Bag <${process.env.SENDER_EMAIL_ADDRESS}>`,
        to,
        cc,
        bcc,
        subject,
        html: content,
      };
      smtpTransport.sendMail(mainOptions, (error, info) => {
        if (error) {
          throw new Error(error.message);
        } else {
          console.info(`Message sent: ${info.response}`);
        }
      });
      smtpTransport.close();
    } catch (e) {
      throw new Error(e.message);
    }
  });
};

const eventSignUpConfirmationEmailHelper = async (user: VolunteerData,
  event: EventData): Promise<EmailMetadata> => {
  const to = user.email;
  const cc = [];
  const bcc = [];
  const subject = 'Event Confirmation';

  const templateData = {
    name: user.name,
    event_title: event.name,
    date: event.startDate,
    time_start: event.startDate,
    time_end: event.endDate,
    location_details: event.location,
    event_information: event.description,
    POC_name: event.facilitatorName,
    POC_mobile_number: event.facilitatorDescription,
  };

  const templateFile = EVENT_SIGN_UP_CONFIRMATION_TEMPLATE_FILE;
  return {
    to, cc, bcc, subject, templateFile, templateData,
  };
};

const feedbackEmailHelper = async (user: VolunteerData,
  event: EventData): Promise<EmailMetadata> => {
  const to = user.email;
  const cc = [];
  const bcc = [];
  const subject = 'Event Feedback';

  const templateData = {
    name: user.name,
    event_title: event.name,
  };

  const templateFile = FEEDBACK_TEMPLATE_FILE;

  return {
    to, cc, bcc, subject, templateFile, templateData,
  };
};

const waitlistToConfirmedEmailHelper = async (user: VolunteerData,
  event: EventData): Promise<EmailMetadata> => {
  const to = user.email;
  const cc = [];
  const bcc = [];
  const subject = 'Waitlisted to Confirmed';

  const templateData = {
    name: user.name,
    event_title: event.name,
    date: event.startDate,
    time_start: event.startDate,
    time_end: event.endDate,
    location_details: event.location,
    event_information: event.description,
    POC_name: event.facilitatorName,
    POC_mobile_number: event.facilitatorDescription,
  };

  const templateFile = WAITLIST_TO_CONFIRMED_TEMPLATE_FILE;

  return {
    to, cc, bcc, subject, templateFile, templateData,
  };
};

const cancelEventEmailHelper = async (user: VolunteerData,
  event: EventData): Promise<EmailMetadata> => {
  const to = user.email;
  const cc = [];
  const bcc = [];
  const subject = 'Event Cancelled';

  const templateData = {
    name: user.name,
    event_title: event.name,
    POC_name: event.facilitatorName,
    POC_mobile_number: event.facilitatorDescription,
  };

  const templateFile = EVENT_CANCEL_TEMPLATE_FILE;

  return {
    to, cc, bcc, subject, templateFile, templateData,
  };
};

export const sendEmail = async (emailType: EmailTemplate,
  userId: string,
  eventId: string | null = null): Promise<void> => {
  let helperObject;
  const volunteerData: VolunteerData | null = await Volunteer.findById(userId);
  const eventData = eventId && await Event.findById(eventId);

  if (!volunteerData || !eventData) {
    throw new Error(DETAILS_NOT_FOUND);
  }

  switch (emailType) {
    case 'EVENT_SIGN_UP_CONFIRMATION':
      helperObject = await eventSignUpConfirmationEmailHelper(
        volunteerData, eventData,
      );
      break;
    case 'FEEDBACK':
      helperObject = await feedbackEmailHelper(volunteerData,
        eventData);
      break;
    case 'WAITLIST_TO_CONFIRMED':
      helperObject = await waitlistToConfirmedEmailHelper(
        volunteerData, eventData,
      );
      break;
    case 'CANCEL_EVENT':
      helperObject = await cancelEventEmailHelper(
        volunteerData, eventData,
      );
      break;
    default:
      throw new Error(EMAIL_TYPE_INVALID);
  }

  const {
    to, cc, bcc, subject, templateFile, templateData,
  } = helperObject;

  return sendEmailHelper(to, cc, bcc, subject, templateFile, templateData);
};

export default {
  sendEmail,
};
