import HTTP_CODES from '../constants/httpCodes';
import opportunityService from '../services/opportunity';
import { CreateOpportunityRequest, DeleteOpportunityRequest, GetOpportunityRequest, UpdateOpportunityRequest } from '../types/request/opportunity';
import { CreateOpportunityResponse, DeleteOpportunityResponse, GetOpportunityResponse, UpdateOpportunityResponse } from '../types/response/opportunity';

const createOpportunity = async (req: CreateOpportunityRequest, res: CreateOpportunityResponse): Promise<void> => {
  try {
    const opportunityData = req.body;
    const opportunity = await opportunityService.createOpportunity(opportunityData);
    res.status(HTTP_CODES.OK).send(opportunity);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getOpportunity = async (req: GetOpportunityRequest, res: GetOpportunityResponse): Promise<void> => {
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

const updateOpportunity = async (req: UpdateOpportunityRequest, res: UpdateOpportunityResponse): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const opportunity = await opportunityService.updateOpportunity(id, updatedFields);

    res.status(HTTP_CODES.OK).send(opportunity);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteOpportunity = async (req: DeleteOpportunityRequest, res: DeleteOpportunityResponse): Promise<void> => {
  try {
    await opportunityService.deleteOpportunity(req.params.id);
    res.status(HTTP_CODES.OK).send();
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
