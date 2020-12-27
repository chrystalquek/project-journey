import { UserState } from "@redux/reducers/user";

export const isAdmin = (user: UserState) => (user.user?.volunteerType == "admin");
