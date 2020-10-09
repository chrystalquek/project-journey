import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import emailTemplates from './emailTemplates';

const { OAuth2 } = google.auth;
const { getWelcomeStaticEmailTemplate } = emailTemplates;

export enum EmailTemplate {
  WELCOME,
  ACTIVATION
}

export type EmailTemplateKey = keyof typeof EmailTemplate;

const getSmtpTransport = async () => {
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

const sendEmail = async (toAddresses: string[], ccAddresses: string[],
  bccAddresses: string[]) => {
  const smtpTransport = await getSmtpTransport();

  const emailTemplate = getWelcomeStaticEmailTemplate(toAddresses, ccAddresses, bccAddresses);
  smtpTransport.sendMail(emailTemplate, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info);
    }
  });
  smtpTransport.close();
};
export default {
  sendEmail,
};
