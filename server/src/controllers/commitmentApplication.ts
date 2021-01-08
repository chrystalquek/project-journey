import express from 'express';
import commitmentApplicationService from '../services/commitmentApplication';
import { CommitmentApplicationData, CommitmentApplicationStatus, VolunteerData } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import VALIDATOR from '../helpers/validation';
import volunteerService from '../services/volunteer';

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
    // defensive prgming: ensure volunteer is only ad-hoc before being able to submit a commitment application
    // const volunteer = (await volunteerService
    //   .readVolunteersByIds([commitmentApplication.volunteerId]))[0];

    await commitmentApplicationService.createCommitmentApplication(req.body as CommitmentApplicationData);
    res.status(HTTP_CODES.OK).send('Commitment Application created');
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
    const commitmentApplications = await commitmentApplicationService.readCommitmentApplications(req.query.status);
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
    const updatedFields = req.body as CommitmentApplicationData;

    const commitmentApplication = await commitmentApplicationService
      .updateCommitmentApplication(id, updatedFields);

    const volunteer = (await volunteerService
      .readVolunteersByIds([commitmentApplication.volunteerId]))[0];

    if (updatedFields.status === 'accepted') {
      await volunteerService.updateVolunteerDetails(
        volunteer.email as string, { volunteerType: 'committed' },
      );
    }

    // TODO what happens to volunteerType when rejected?

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
