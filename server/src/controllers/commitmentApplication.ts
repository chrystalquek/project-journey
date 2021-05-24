import express from 'express';
import commitmentApplicationService from '../services/commitmentApplication';
import HTTP_CODES from '../constants/httpCodes';
import VALIDATOR from '../helpers/validation';
import volunteerService from '../services/volunteer';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '../models/CommitmentApplication';

export type CommitmentApplicationValidatorMethod = 'createCommitmentApplication' | 'readCommitmentApplication' | 'updateCommitmentApplication'

/**
 * Handles route request validation for controllers
 * @param method Controller handler names
 */
const getValidations = (method: CommitmentApplicationValidatorMethod) => {
  switch (method) {
    case 'createCommitmentApplication': {
      return [
        VALIDATOR.commitmentApplicationStatus,
      ];
    }
    case 'updateCommitmentApplication': {
      return [
        VALIDATOR.commitmentApplicationStatus,
      ];
    }
    default:
      return [];
  }
};

const createCommitmentApplication = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { body } = req;
    const { volunteerId } = body;

    if (req.user._id !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const savedCommitmentApplication = await commitmentApplicationService
      .createCommitmentApplication(req.body as CommitmentApplicationData);
    // Add the commitment application id to the volunteer data

    delete body.volunteerId;

    const updatedVolunteerData = {
      commitmentApplicationIds: req.user.commitmentApplicationIds
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

const readCommitmentApplications = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const status = req.query.status as CommitmentApplicationStatus ?? undefined;
    const commitmentApplications = await commitmentApplicationService
      .readCommitmentApplications(status);
    res.status(HTTP_CODES.OK).json({
      data: commitmentApplications,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateCommitmentApplication = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body as Partial<CommitmentApplicationData>;

    const { volunteerId } = updatedFields;
    if (!volunteerId) {
      throw Error('No volunteerId');
    }
    const volunteer = await volunteerService.getVolunteerById(volunteerId);
    if (volunteer.volunteerType !== 'ad-hoc') {
      throw Error('Invalid volunteer type');
    }

    await commitmentApplicationService.updateCommitmentApplication(id, updatedFields);

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
  readCommitmentApplications,
  updateCommitmentApplication,
  getValidations,
};
