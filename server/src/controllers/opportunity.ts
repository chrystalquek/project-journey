import express from 'express';
import HTTP_CODES from '../constants/httpCodes';
import { OpportunityData } from '../models/Opportunity';
import opportunityService from '../services/opportunity';

const createOpportunity = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    await opportunityService.createOpportunity(req.body as OpportunityData);
    res.status(HTTP_CODES.OK).send('Opportunity data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readOpportunity = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const opportunity = await opportunityService.readOpportunity(req.params.id);

    if (req.user.volunteerType === 'ad-hoc' && opportunity.volunteerType === 'committed') {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }
    res.status(HTTP_CODES.OK).json(opportunity);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateOpportunity = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body as OpportunityData;

    await opportunityService.updateOpportunity(id, updatedFields);

    res.status(HTTP_CODES.OK).send('Opportunity data updated');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteOpportunity = async (req: express.Request, res: express.Response) => {
  try {
    await opportunityService.deleteOpportunity(req.params.id);
    res.status(HTTP_CODES.OK).send('Opportunity data deleted');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createOpportunity,
  readOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
