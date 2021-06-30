import _ from "lodash";
import { GetVolunteerData, VolunteerData } from "../models/Volunteer";

export const removeUserId = (volunteerData: VolunteerData): GetVolunteerData =>
  _.omit(volunteerData, ["userId"]);
