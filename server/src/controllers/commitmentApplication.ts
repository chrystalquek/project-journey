import commitmentApplicationService from "../services/commitmentApplication";
import HTTP_CODES from "../constants/httpCodes";
import volunteerService from "../services/volunteer";
import {
  CreateCommitmentApplicationRequest,
  GetCommitmentApplicationsRequest,
  UpdateCommitmentApplicationRequest,
} from "../types/request/commitmentApplication";
import {
  CreateCommitmentApplicationResponse,
  GetCommitmentApplicationsResponse,
  UpdateCommitmentApplicationResponse,
} from "../types/response/commitmentApplication";

const createCommitmentApplication = async (
  req: CreateCommitmentApplicationRequest,
  res: CreateCommitmentApplicationResponse
): Promise<void> => {
  try {
    const commitmentApplicationData = req.body;
    const volunteerData = req.user;
    const { volunteerId } = commitmentApplicationData;

    if (volunteerData._id !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: "Unauthorized" });
      return;
    }

    const savedCommitmentApplication =
      await commitmentApplicationService.createCommitmentApplication(
        commitmentApplicationData
      );

    // Add the commitment application id to the volunteer data
    const updatedVolunteerData = {
      commitmentApplicationIds: volunteerData.commitmentApplicationIds.concat(
        savedCommitmentApplication._id
      ),
    };

    await volunteerService.updateVolunteer(volunteerId, updatedVolunteerData);

    res.status(HTTP_CODES.OK).send(savedCommitmentApplication);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getCommitmentApplications = async (
  req: GetCommitmentApplicationsRequest,
  res: GetCommitmentApplicationsResponse
): Promise<void> => {
  try {
    const comAppStatus = req.query.status;
    const commitmentApplications =
      await commitmentApplicationService.getCommitmentApplications(
        comAppStatus
      );
    res.status(HTTP_CODES.OK).json({
      data: commitmentApplications,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateCommitmentApplication = async (
  req: UpdateCommitmentApplicationRequest,
  res: UpdateCommitmentApplicationResponse
): Promise<void> => {
  try {
    const commitmentId = req.params.id;
    const updatedFields = req.body;
    const { volunteerId } = updatedFields;

    if (!volunteerId) {
      throw Error("No volunteerId");
    }

    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    if (volunteer.volunteerType !== "ad-hoc") {
      throw Error("Invalid volunteer type");
    }

    const commitmentApplication =
      await commitmentApplicationService.updateCommitmentApplication(
        commitmentId,
        updatedFields
      );

    if (updatedFields.status === "accepted") {
      await volunteerService.updateVolunteer(volunteerId, {
        volunteerType: "committed",
      });
    }

    res.status(HTTP_CODES.OK).send(commitmentApplication);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createCommitmentApplication,
  getCommitmentApplications,
  updateCommitmentApplication,
};
