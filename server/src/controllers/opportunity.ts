import { Request, Response } from 'express';
import { OpportunityData } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import opportunityService from '../services/opportunity';

const createOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const opportunityData: OpportunityData = req.body;
    await opportunityService.createOpportunity(opportunityData);
    res.status(HTTP_CODES.OK).send('Opportunity data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const opportunity = await opportunityService.getOpportunity(req.params.id);

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

const updateOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedFields: OpportunityData = req.body;

    await opportunityService.updateOpportunity(id, updatedFields);

    res.status(HTTP_CODES.OK).send('Opportunity data updated');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteOpportunity = async (req: Request, res: Response): Promise<void> => {
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
  getOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
