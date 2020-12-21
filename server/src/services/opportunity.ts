import mongoose from 'mongoose';
import { OpportunityData } from '../types';
import Opportunity from '../models/Opportunity';

const createOpportunity = async (opportunityData: OpportunityData): Promise<void> => {
  try {
    const opportunitySchemeData = new Opportunity({
      // Inherited
      _id: new mongoose.Types.ObjectId(),
      name: opportunityData.name,
      created_at: Date.now(),
      description: opportunityData.description,
      content_url: opportunityData.contentUrl,
      content_type: opportunityData.contentType,
      facilitator_name: opportunityData.facilitatorName,
      facilitator_description: opportunityData.facilitatorDescription,
      start_date: opportunityData.startDate,
      end_date: opportunityData.endDate,
      location: opportunityData.location,
      deadline: opportunityData.deadline,
      additional_information: opportunityData.additionalInformation,
      roles: opportunityData.roles,

      // Specific
      photo: opportunityData.photo,
      positions: opportunityData.positions,

    });
    await opportunitySchemeData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

const readOpportunity = async (id: string) => {
  try {
    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      throw new Error('Opportunity is not found.');
    }

    return opportunity;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateOpportunity = async (
  id: string,
  updatedFields: OpportunityData,
): Promise<void> => {
  try {
    await Opportunity.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true },
    );
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteOpportunity = async (id: string): Promise<void> => {
  try {
    await Opportunity.findOneAndDelete({ _id: id });
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createOpportunity,
  readOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
