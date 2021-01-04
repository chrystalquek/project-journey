import express from 'express';
import commitmentApplicationService from '../services/commitmentApplication';
import { CommitmentApplicationData } from '../types';
import HTTP_CODES from '../constants/httpCodes';

const createCommitmentApplication = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
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
    const commitmentApplications = await commitmentApplicationService.readCommitmentApplications();
    res.status(HTTP_CODES.OK).json({
      data: commitmentApplications,
    });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createCommitmentApplication,
  readCommitmentApplications,
};
