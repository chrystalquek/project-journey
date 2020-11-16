import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
import ejs from 'ejs';
import { VolunteerData } from '../types';

const { OAuth2 } = google.auth;

type EmailTemplate = 'WELCOME' | 'ACTIVATION';

const EMAIL_TYPE_INVALID = 'Email type is invalid';

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

const sendEmailHelper = async (to: string[], cc: string[],
  bcc: string[], subject: string, templateFile: string, templateData: Record<string, string>) => {
  const smtpTransport = await getSmtpTransport();

  ejs.renderFile(templateFile, templateData, (err, content) => {
    if (err) {
      console.log(err);
    } else {
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
          console.log(error);
        } else {
          console.log(`Message sent: ${info.response}`);
        }
      });
      smtpTransport.close();
    }
  });
};

const welcomeEmailHelper = async (user: VolunteerData) => {
  const to = user.email;
  const cc = [];
  const bcc = [];
  const subject = 'Welcome';

  const templateData = {
    name: user.name,
  };
  const templateFile = 'src/views/welcome.ejs';

  return {
    to, cc, bcc, subject, templateFile, templateData,
  };
};

const sendEmail = async (user: VolunteerData, emailType: EmailTemplate) => {
  let helperObject;

  switch (emailType) {
    case 'WELCOME':
      helperObject = await welcomeEmailHelper(user);
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
