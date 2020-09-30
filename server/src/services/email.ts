import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { VolunteerData } from '../types';
import { getEmailTemplate } from './emailTemplates';

const { OAuth2 } = google.auth;

export enum EmailTemplate {
  WELCOME,
  ACTIVATION
}

export type EmailTemplateKey = keyof typeof EmailTemplate;

const getSmtpTransport = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REFRESH_TOKEN,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.PORT,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.SENDER_EMAIL_ADDRESS,
      cliendId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return smtpTransport;
};

const sendEmail = async (toAddresses: VolunteerData[], ccAddresses: VolunteerData[],
  bccAddresses: VolunteerData[], emailTemplateKey: EmailTemplateKey) => {
  const smtpTransport = await getSmtpTransport();

  toAddresses.forEach((toAddress) => {
    const emailTemplate = getEmailTemplate(toAddress, emailTemplateKey);
    smtpTransport.sendMail(emailTemplate, (error, info) => {
      if (error) {
        throw new Error(error.message);
      } else {
        console.log(info);
      }
    });
    smtpTransport.close();
  });
  //   for (const toAddress of toAddresses) {
  //     const emailTemplate = getEmailTemplate(toAddress, emailTemplateKey);
  //     smtpTransport.sendMail(emailTemplate, (error, info) => {
  //       if (error) {
  //         throw new Error(error.message);
  //       }
  //     });
  //   }

  smtpTransport.close();
};
export default {
  getSmtpTransport,
  sendEmail,
};
