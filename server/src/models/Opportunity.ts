import mongoose from "mongoose";
import { Type, createSchema, ExtractProps } from "ts-mongoose";
import Event, { EventData } from "./Event";

const OpportunitySchema = createSchema({
  positions: Type.array({ required: true }).of(Type.string({ required: true })),
  photo: Type.string({ required: true }),
});

export type OpportunityData = EventData &
  ExtractProps<typeof OpportunitySchema>;

export type OpportunityModel = OpportunityData & mongoose.Document;

export type NewOpportunityData = Omit<OpportunityData, "_id" | "createdAt">;

const opportunityModel: mongoose.Model<OpportunityModel> = Event.discriminator(
  "Opportunity",
  OpportunitySchema
);

export default opportunityModel;
