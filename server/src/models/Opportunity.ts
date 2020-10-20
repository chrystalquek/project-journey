import mongoose from 'mongoose';
import { OpportunityData } from '../types';
import Event from '../models/Event';

const { Schema } = mongoose;

export type OpportunityModel = OpportunityData & mongoose.Document;

const OpportunitySchema = new Schema({
  positions: [String],
  photo: String,
});

export default Event.discriminator('Opportunity', OpportunitySchema);
