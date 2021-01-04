import mongoose from 'mongoose';
import { OpportunityData } from '../types';
import Event from './Event';

const { Schema } = mongoose;

export type OpportunityModel = OpportunityData & mongoose.Document;

// TODO: make variable schema
const OpportunitySchema = new Schema({
  positions: [String],
  photo: String,
});

export default Event.discriminator('Opportunity', OpportunitySchema) as mongoose.Model<OpportunityModel>;
