import { Request, Response } from 'express';
import commitmentApplicationService from '../services/commitmentApplication';
import HTTP_CODES from '../constants/httpCodes';
import volunteerService from '../services/volunteer';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '../models/CommitmentApplication';
import { VolunteerData } from '../models/Volunteer';

const createCommitmentApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const commitmentApplicationData: CommitmentApplicationData = req.body;
    const volunteerData: VolunteerData = req.user;
    const { volunteerId } = commitmentApplicationData;

    if (volunteerData._id !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const savedCommitmentApplication = await commitmentApplicationService
      .createCommitmentApplication(commitmentApplicationData);

    // Add the commitment application id to the volunteer data
    const updatedVolunteerData = {
      commitmentApplicationIds: volunteerData.commitmentApplicationIds
        .concat(savedCommitmentApplication._id),
    };

    await volunteerService.updateVolunteer(
      volunteerId,
      updatedVolunteerData,
    );

    res.status(HTTP_CODES.OK).send(savedCommitmentApplication);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getCommitmentApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: fix after chrystal's merged
    // const comAppStatus: CommitmentApplicationStatus | undefined = req.query.status;
    const comAppStatus = req.query.status as CommitmentApplicationStatus | undefined;
    const commitmentApplications = await commitmentApplicationService
      .getCommitmentApplications(comAppStatus);
    res.status(HTTP_CODES.OK).json({
      data: commitmentApplications,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateCommitmentApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const commitmentId = req.params.id;
    const updatedFields: Partial<CommitmentApplicationData> = req.body;
    const { volunteerId } = updatedFields;

    if (!volunteerId) {
      throw Error('No volunteerId');
    }

    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    if (volunteer.volunteerType !== 'ad-hoc') {
      throw Error('Invalid volunteer type');
    }

    await commitmentApplicationService.updateCommitmentApplication(commitmentId, updatedFields);

    if (updatedFields.status === 'accepted') {
      await volunteerService.updateVolunteer(
        volunteerId, { volunteerType: 'committed' },
      );
    }

    res.status(HTTP_CODES.OK).send('Commitment Application and Volunteer updated');
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
