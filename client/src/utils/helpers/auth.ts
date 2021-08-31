import { UserState } from "@redux/reducers/user";
import { VolunteerData } from "@type/volunteer";

export const isAdmin = (user: UserState | VolunteerData | null) => {
  if (!user) return false;

  if ((user as VolunteerData)?.volunteerType === "admin") {
    return true;
  }

  if ((user as UserState)?.user?.volunteerType === "admin") {
    return true;
  }

  return false;
};
