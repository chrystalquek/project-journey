import volunteerService from "../services/volunteer";
import userService from "../services/user";
import commitmentApplicationService from "../services/commitmentApplication";
import HTTP_CODES from "../constants/httpCodes";
import {
  CreateVolunteerRequest,
  DeleteVolunteerRequest,
  GetPendingVolunteersRequest,
  GetVolunteerRequest,
  GetVolunteersByIdsRequest,
  GetVolunteersRequest,
  UpdateVolunteerRequest,
} from "../types/request/volunteer";
import {
  CreateVolunteerResponse,
  DeleteVolunteerResponse,
  GetPendingVolunteersResponse,
  GetVolunteerResponse,
  GetVolunteersByIdsResponse,
  GetVolunteersResponse,
  UpdateVolunteerResponse,
} from "../types/response/volunteer";
import { removeUserId } from "../helpers/volunteer";

const createVolunteer = async (
  req: CreateVolunteerRequest,
  res: CreateVolunteerResponse
): Promise<void> => {
  try {
    const volunteerData = req.body;
    const volunteer = await volunteerService.createVolunteer(volunteerData);
    const volunteerWithoutUserId = removeUserId(volunteer);
    res.status(HTTP_CODES.OK).send(volunteerWithoutUserId);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

// BY ID
const getVolunteerDetailsById = async (
  req: GetVolunteerRequest,
  res: GetVolunteerResponse
): Promise<void> => {
  try {
    let volunteer = await volunteerService.getVolunteerById(req.params.id);

    // append administrator remarks
    if (req.user.volunteerType === "admin") {
      volunteer = await userService.addAdminRemarks(volunteer);
    }

    const volunteerWithoutUserId = removeUserId(volunteer);
    res.status(HTTP_CODES.OK).send(volunteerWithoutUserId);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error.message,
    });
  }
};

const getAllVolunteerDetails = async (
  req: GetVolunteersRequest,
  res: GetVolunteersResponse
): Promise<void> => {
  try {
    const { volunteerType, pageNo, size, name, sort } = req.query;
    const pageNoNum = Number(req.query.pageNo);
    const sizeNum = Number(req.query.size);

    const withPagination =
      pageNo && size && !Number.isNaN(pageNo) && !Number.isNaN(size);
    const skip = pageNo && size && withPagination ? sizeNum * pageNoNum : 0;
    const limit = withPagination ? sizeNum : 0;

    const volunteers = await volunteerService.getAllVolunteers(
      volunteerType,
      name,
      sort,
      skip,
      limit
    );

    if (req.user.volunteerType === "admin") {
      volunteers.data = await Promise.all(
        volunteers.data.map(userService.addAdminRemarks)
      );
    }

    const response = {
      ...volunteers,
      data: volunteers.data.map(removeUserId),
    };

    res.status(HTTP_CODES.OK).json(response);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error.message,
    });
  }
};

/**
 * Retrieves sign ups that are pending approval
 * @return number of pending sign ups
 */
const getPendingVolunteers = async (
  req: GetPendingVolunteersRequest,
  res: GetPendingVolunteersResponse
): Promise<void> => {
  try {
    const pendingCommitmentApplications =
      await commitmentApplicationService.getCommitmentApplications("pending");

    const pendingVolunteersIds = pendingCommitmentApplications.map(
      (commitmentApplication) => commitmentApplication.volunteerId
    );

    let pendingVolunteers = await volunteerService.getVolunteersByIds(
      pendingVolunteersIds
    );

    if (req.user.volunteerType === "admin") {
      pendingVolunteers = await Promise.all(
        pendingVolunteers.map(userService.addAdminRemarks)
      );
    }

    const volunteersWithoutUserId = pendingVolunteers.map(removeUserId);

    res.status(HTTP_CODES.OK).json({ data: volunteersWithoutUserId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

const getVolunteersByIds = async (
  req: GetVolunteersByIdsRequest,
  res: GetVolunteersByIdsResponse
): Promise<void> => {
  try {
    const { ids } = req.body;
    let volunteers = await volunteerService.getVolunteersByIds(ids);

    if (req.user.volunteerType === "admin") {
      volunteers = await Promise.all(
        volunteers.map(userService.addAdminRemarks)
      );
    }

    const volunteersWithoutUserId = volunteers.map(removeUserId);

    res.status(HTTP_CODES.OK).json({ data: volunteersWithoutUserId });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.message }],
    });
  }
};

const updateVolunteer = async (
  req: UpdateVolunteerRequest,
  res: UpdateVolunteerResponse
): Promise<void> => {
  try {
    const volunteerId = req.params.id;
    const updatedVolunteerData = req.body;
    let savedVolunteerData = await volunteerService.updateVolunteer(
      volunteerId,
      updatedVolunteerData
    );

    if (req.user.volunteerType === "admin") {
      savedVolunteerData = await userService.addAdminRemarks(
        savedVolunteerData
      );
    }

    const volunteerWithoutUserId = removeUserId(savedVolunteerData);
    res.status(HTTP_CODES.OK).send(volunteerWithoutUserId);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error.message,
    });
  }
};

const deleteVolunteer = async (
  req: DeleteVolunteerRequest,
  res: DeleteVolunteerResponse
): Promise<void> => {
  try {
    await volunteerService.deleteVolunteer(req.params.id);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error.message,
    });
  }
};

export default {
  createVolunteer,
  getVolunteerDetailsById,
  getAllVolunteerDetails,
  getPendingVolunteers,
  deleteVolunteer,
  updateVolunteer,
  getVolunteersByIds,
};
