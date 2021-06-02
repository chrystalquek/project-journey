import mongoose from 'mongoose';
import Event, { EventData } from './Event';
import { Type, createSchema, ExtractProps } from 'ts-mongoose';

export type OpportunityModel = OpportunityData & mongoose.Document;

const OpportunitySchema = createSchema({
  positions: Type.array({ required: true }).of(Type.string({ required: true })),
  photo: Type.string({ required: true }),
});

export type OpportunityData = EventData & ExtractProps<typeof OpportunitySchema>;

export default Event.discriminator('Opportunity', OpportunitySchema) as mongoose.Model<OpportunityModel>;
