import { VolunteerData } from "@type/volunteer";

export const isAdmin = (user: VolunteerData | null) => {
  if (!user) return false;

  if ((user as VolunteerData)?.volunteerType === "admin") {
    return true;
  }

  return false;
};
