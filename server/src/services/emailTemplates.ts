import { VolunteerData } from '../types';
import { EmailTemplate, EmailTemplateKey } from './email';

const getWelcomeEmailTemplate = (volunteer: VolunteerData) => {
  const from = `Blessings in a Bag <${process.env.SENDER_EMAIL_ADDRESS}>`;
  const to = volunteer.email;
  const subject = 'Welcome to Blessings in a Bag';
  const html = `
        <p>Hello, ${volunteer.fullName},</p>
        <p>Welcome!</p>
        <p>Have a great day/p>`;

  return {
    from, to, subject, html,
  };
};

const getActivationEmailTemplate = (volunteer: VolunteerData) => {
  const from = `Blessings in a Bag <${process.env.SENDER_EMAIL_ADDRESS}>`;
  const to = volunteer.email;
  const subject = 'Welcome to Blessings in a Bag';
  const html = `
          <p>Hello, ${volunteer.fullName},</p>
          <p>Click this to activate your account!</p>
          <p>Have a great day/p>`;

  return {
    from, to, subject, html,
  };
};

export const getEmailTemplate = (volunteer: VolunteerData, emailTemplateKey: EmailTemplateKey) => {
  switch (+emailTemplateKey) {
    case EmailTemplate.WELCOME:
      return getWelcomeEmailTemplate(volunteer);
    case EmailTemplate.ACTIVATION:
      return getActivationEmailTemplate(volunteer);
    default:
      return Error("Email type can't be found");
  }
};
