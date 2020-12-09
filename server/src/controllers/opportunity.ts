import express from 'express';
import { body, validationResult } from 'express-validator';
import { OpportunityData } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import opportunityService from '../services/opportunity';

export type OpportunityValidatorMethod = 'createOpportunity';

const validate = (method: OpportunityValidatorMethod) => {
  switch (method) {
    case 'createOpportunity': {
      return [
        body('positions', 'positions does not exist').exists(),
        body('photo', 'photo does not exist').exists(),
      ];
    }
    default: {
      return [];
    }
  }
};

const createOpportunity = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

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
  validate,
};
