import { Response, Request } from 'express';
import volunteerService from '../services/volunteer';
import commitmentApplicationService from '../services/commitmentApplication';
import HTTP_CODES from '../constants/httpCodes';
import { VolunteerData, VolunteerType, VOLUNTEER_TYPE } from '../models/Volunteer';

const createVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteerData: VolunteerData = req.body;
    // assuming we create a few fixed admin accounts for biab, should only be able to create ad-hoc
    if (volunteerData.volunteerType !== 'ad-hoc') {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }
    await volunteerService.createVolunteer(volunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

// BY EMAIL
const getVolunteerDetailsByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteerDetails = await volunteerService.getVolunteer(
      req.params.email,
    );

    if (req.user._id !== volunteerDetails._id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

// BY ID
const getVolunteerDetailsById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (String(req.user._id) !== req.params.id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const volunteerDetails = await volunteerService.getVolunteerById(
      req.params.id,
    );
    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const getAllVolunteerDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    // handles both searching volunteers and returning all volunteers

    const volunteerTypes = req.query.volunteerTypes
      ? ((req.query.volunteerTypes as string).split(',')).map((volType) => volType as VolunteerType)
      : VOLUNTEER_TYPE;

    const pageNo = Number(req.query.pageNo);
    const size = Number(req.query.size);
    if (pageNo < 0 || size < 0) {
      throw new Error('Invalid page number, should start with 0');
    }
    const withPagination = !Number.isNaN(pageNo) && !Number.isNaN(size);
    const skip = withPagination ? size * pageNo : 0;
    const limit = withPagination ? size : 0;

    const volunteersDetails = await volunteerService.getAllVolunteers(
      volunteerTypes, req.query.name as string, req.query.sort as string, skip, limit,
    );
    res.status(HTTP_CODES.OK).json(volunteersDetails);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

/**
 * Retrieves sign ups that are pending approval
 * @return number of pending sign ups
 */
const getPendingVolunteers = async (req: Request, res: Response): Promise<void> => {
  try {
    const pendingCommitmentApplications = await
      commitmentApplicationService.getCommitmentApplications(
        'pending',
      );

    const pendingVolunteersIds = pendingCommitmentApplications.map(
      (commitmentApplication) => commitmentApplication.volunteerId,
    );

    const pendingVolunteers = await volunteerService.getVolunteersByIds(
      pendingVolunteersIds,
    );

    res.status(HTTP_CODES.OK).json({ data: pendingVolunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getVolunteersByIds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    const volunteers = await volunteerService.getVolunteersByIds(ids);

    res.status(HTTP_CODES.OK).json({ data: volunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteerId = req.params.id;
    if (String(req.user._id) !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const { updatedVolunteerData }: { updatedVolunteerData: Partial<VolunteerData> } = req.body;

    const savedVolunteerData = await volunteerService.updateVolunteer(
      volunteerId, updatedVolunteerData,
    );
    res.status(HTTP_CODES.OK).json(savedVolunteerData);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const deleteVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    await volunteerService.deleteVolunteer(email);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

export default {
  createVolunteer,
  getVolunteerDetailsByEmail,
  getVolunteerDetailsById,
  getAllVolunteerDetails,
  getPendingVolunteers,
  deleteVolunteer,
  updateVolunteer,
  getVolunteersByIds,
};
