import express from 'express';
import commitmentApplicationService from '../services/commitmentApplication';
import HTTP_CODES from '../constants/httpCodes';
import volunteerService from '../services/volunteer';
import { CommitmentApplicationData, CommitmentApplicationStatus } from '../models/CommitmentApplication';

const createCommitmentApplication = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    // ensure volunteer is only ad-hoc before being able to submit a commitment application
    const volunteer = (await volunteerService
      .readVolunteersByIds([req.body.volunteerId]))[0];

    if (volunteer.volunteerType !== 'ad-hoc') {
      throw new Error(`Volunteer is a ${volunteer.volunteerType}, cannot create Commitment Application`);
    }

    const savedCommitmentApplication = await commitmentApplicationService
      .createCommitmentApplication(req.body as Partial<CommitmentApplicationData>);
    // Add the commitment application id to the volunteer data
    const { body } = req;
    delete body.volunteerId;

    const updatedVolunteerData = {
      commitmentApplicationIds: volunteer.commitmentApplicationIds
        .concat(savedCommitmentApplication._id),
      ...body,
    };

    await volunteerService.updateVolunteerDetails(
      volunteer.email,
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
};
