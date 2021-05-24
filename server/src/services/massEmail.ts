import { EventData } from '../models/Event';
import { sendEmail } from './email';
import { findEventsNDaysAgo } from './event';

const N_DAYS_AGO = 3;

const sendMassFeedbackEmail = async (): Promise<void> => {
  const eventsNDaysAgo = await findEventsNDaysAgo(N_DAYS_AGO);
  eventsNDaysAgo.forEach((event: EventData) => {
    const volunteerIds: Array<string> = event.roles.flatMap((role) => role.volunteers).map(id => String(id));
    return Promise.all(
      volunteerIds.map(
        (volunteerId) => sendEmail('FEEDBACK', volunteerId, String(event._id)),
      ),
    );
  });
};

export default {
  sendMassFeedbackEmail,
};
