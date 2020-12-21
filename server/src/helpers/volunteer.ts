import _ from 'lodash';
import { VolunteerData, VolunteerPublicData } from '../types';

/**
 * Retrieves volunteer details that can be sent as response
 * @param volunteerData retrieved from DB
 */
// https://stackoverflow.com/questions/25767334/underscore-js-keys-and-omit-not-working-as-expected
const extractVolunteerDetails = (volunteerData: VolunteerData): VolunteerPublicData => _.omit(volunteerData, ['password', 'identificationNumber']); // not sure but might need _id in frontend?

export default {
  extractVolunteerDetails,
};
