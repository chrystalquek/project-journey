import SignUp, {
  NewSignUpData,
  SignUpData,
  SignUpIdType,
  SignUpStatus,
} from "../models/SignUp";
import { RoleData } from "../models/Event";
import emailService from "./email";
import eventService from "./event";

const INVALID_SIGN_UP_ID_TYPE = "Invalid sign up id type";
const SIGN_UP_NOT_FOUND = "Sign up not found";

type UpdateEventVolunteersAction = "add" | "remove" | "replace";

const createSignUp = async (signUpData: NewSignUpData): Promise<SignUpData> => {
  try {
    const signUpSchemaData = new SignUp(signUpData);
    const signUp = await signUpSchemaData.save();

    emailService.sendEmail(
      "WAITLIST_TO_CONFIRMED",
      signUpData.userId,
      signUpData.eventId
    );
    return signUp;
  } catch (err) {
    throw new Error(err);
  }
};

const getSignUps = async (
  id: string,
  idType: SignUpIdType
): Promise<SignUpData[]> => {
  try {
    let signUps: SignUpData[];
    switch (idType) {
      case "signUpId":
        signUps = await SignUp.find({ _id: id });
        break;
      case "eventId":
        signUps = await SignUp.find({ eventId: id });
        break;
      case "userId":
        signUps = await SignUp.find({ userId: id });
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    return signUps;
  } catch (err) {
    throw new Error(err);
  }
};

const getPendingSignUps = async (): Promise<SignUpData[]> => {
  try {
    const upcomingEventsIds = (await eventService.getEvents("upcoming")).map(
      (event) => event._id
    );
    const pendingSignUps = SignUp.find({
      status: "pending",
      eventId: { $in: upcomingEventsIds },
    });
    return pendingSignUps;
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Adds a volunteer id to event.roles.volunteers
 * @param roles event.roles
 * @param newRoleName name of the new role
 * @param volunteerId user id of the volunteer to be added
 */
const addEventVolunteers = (
  roles: Array<RoleData>,
  newRoleName: string,
  volunteerId: string
) => {
  const updatedRoles = roles.map((role) => {
    if (role.name === newRoleName) {
      role.volunteers.push(volunteerId);
    }
    return role;
  });
  return updatedRoles;
};

/**
 * Removes a volunteer id from event.roles.volunteers
 * @param roles event.roles
 * @param oldRoleName name of the previous role
 * @param volunteerId user id of the volunteer to be removed
 */
const removeEventVolunteers = (
  roles: RoleData[],
  oldRoleName: string,
  volunteerId: string
): RoleData[] => {
  const updatedRoles = roles.map((role) => {
    if (role.name === oldRoleName) {
      const index = role.volunteers.indexOf(volunteerId);

      if (index === -1) {
        throw new Error("Volunteer is not found in the specified event.");
      }

      role.volunteers.splice(index, 1);
    }
    return role;
  });
  return updatedRoles;
};

/**
 * Updates event roles, specifically event.roles.volunteers, upon sign up status change.
 * @param eventId id of the corresponding event
 * @param volunteerId  user id of the volunteer
 * @param oldRoleName previous accepted role, if any
 * @param newRoleName new accepted role, if any
 * @param actionType either 'add', 'remove', or 'replace'
 */
const updateEventRoles = async (
  eventId: string,
  volunteerId: string,
  oldRoleName: string,
  newRoleName: string,
  actionType: UpdateEventVolunteersAction
): Promise<void> => {
  try {
    const unupdatedEvent = await eventService.getEvent(eventId);
    let eventRoles: RoleData[];

    if (unupdatedEvent && unupdatedEvent.roles) {
      switch (actionType) {
        case "add":
          eventRoles = addEventVolunteers(
            unupdatedEvent.roles,
            newRoleName,
            volunteerId
          );
          break;
        case "remove":
          eventRoles = removeEventVolunteers(
            unupdatedEvent.roles,
            oldRoleName,
            volunteerId
          );
          break;
        case "replace":
          eventRoles = addEventVolunteers(
            unupdatedEvent.roles,
            newRoleName,
            volunteerId
          );
          eventRoles = removeEventVolunteers(
            eventRoles,
            oldRoleName,
            volunteerId
          );
          break;
        default:
          throw new Error("Invalid action type");
      }

      await eventService.updateEvent(eventId, { roles: eventRoles });
    }
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Checks if the sign up is accepted and valid
 * @param status either 'pending', 'accepted', or 'rejected'
 * @param acceptedRole must be non-empty if status is 'accepted'
 */
export const isSignUpAccepted = (
  status: SignUpStatus | undefined,
  acceptedRole: string | undefined
): boolean =>
  status === "accepted" && acceptedRole !== undefined && acceptedRole !== "";

/**
 * Update sign up (and corresponding event when necessary)
 * @param id one of the ids in the sign up
 * @param idType type of the specified id
 * @param updatedFields updated sign up data
 */
const updateSignUp = async (
  id: string,
  idType: SignUpIdType,
  updatedFields: Partial<SignUpData>
): Promise<SignUpData> => {
  try {
    let oldFields: SignUpData | null;
    switch (idType) {
      case "signUpId":
        oldFields = await SignUp.findOneAndUpdate(
          { _id: id },
          { $set: updatedFields }
        );
        break;
      case "eventId":
        oldFields = await SignUp.findOneAndUpdate(
          { eventId: id },
          { $set: updatedFields }
        );
        break;
      case "userId":
        oldFields = await SignUp.findOneAndUpdate(
          { userId: id },
          { $set: updatedFields }
        );
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }
    if (!oldFields) {
      throw new Error(SIGN_UP_NOT_FOUND);
    }

    const oldStatus = oldFields.status;
    const oldAcceptedRole = oldFields.acceptedRole || "";
    const newStatus = updatedFields.status;
    const newAcceptedRole = updatedFields.acceptedRole || "";

    /** Add, remove, or replace volunteer from Event.volunteers array if SignUp.status changes */
    /** status is an array if the sign up is accepted i.e. ["accepted", string] */

    /** Not accepted --> Accepted : Add */
    if (
      !isSignUpAccepted(oldStatus, oldAcceptedRole) &&
      isSignUpAccepted(newStatus, newAcceptedRole)
    ) {
      updateEventRoles(
        oldFields.eventId,
        oldFields.userId,
        "",
        newAcceptedRole,
        "add"
      );

      if (!updatedFields.userId) {
        throw new Error("User id not found");
      }

      emailService.sendEmail(
        "WAITLIST_TO_CONFIRMED",
        updatedFields.userId,
        updatedFields.eventId
      );
    }

    /** Accepted --> Not Accepted : Remove */
    if (
      isSignUpAccepted(oldStatus, oldAcceptedRole) &&
      !isSignUpAccepted(newStatus, newAcceptedRole)
    ) {
      updateEventRoles(
        oldFields.eventId,
        oldFields.userId,
        oldAcceptedRole,
        "",
        "remove"
      );
    }

    /** Accepted --> Accepted but acceptedRole changed : Replace */
    if (
      isSignUpAccepted(oldStatus, oldAcceptedRole) &&
      isSignUpAccepted(newStatus, newAcceptedRole) &&
      oldAcceptedRole !== newAcceptedRole
    ) {
      updateEventRoles(
        oldFields.eventId,
        oldFields.userId,
        oldAcceptedRole,
        newAcceptedRole,
        "replace"
      );
    }

    return oldFields;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteSignUp = async (
  id: string,
  idType: SignUpIdType
): Promise<void> => {
  try {
    let deletedSignUp: SignUpData | null;
    switch (idType) {
      case "signUpId":
        deletedSignUp = await SignUp.findOneAndDelete({ _id: id });
        break;
      case "eventId":
        // @clara should this case and userId delete all that match then?
        deletedSignUp = await SignUp.findOneAndDelete({ eventId: id });
        break;
      case "userId":
        deletedSignUp = await SignUp.findOneAndDelete({ userId: id });
        break;
      default:
        throw new Error(INVALID_SIGN_UP_ID_TYPE);
    }

    if (!deletedSignUp) {
      throw new Error(SIGN_UP_NOT_FOUND);
    }

    const oldAcceptedRole = deletedSignUp.acceptedRole || "";

    if (
      deletedSignUp &&
      isSignUpAccepted(deletedSignUp.status, oldAcceptedRole)
    ) {
      updateEventRoles(
        deletedSignUp.eventId,
        deletedSignUp.userId,
        oldAcceptedRole,
        "",
        "remove"
      );
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createSignUp,
  getSignUps,
  getPendingSignUps,
  updateSignUp,
  deleteSignUp,
};
