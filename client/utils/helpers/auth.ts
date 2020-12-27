import { UserState } from "@redux/reducers/user";
import { VOLUNTEER_TYPE } from "types/volunteer";

export const isAdmin = (user: UserState) => (user.user?.volunteerType == VOLUNTEER_TYPE.admin);