import mongoose from "mongoose";
import { TeamData } from "../types/types";

const { Schema } = mongoose;

export type TeamModel = TeamData & mongoose.Document;

// If we don't declare _id explicitly, mongoose auto-initializes it for us
const TeamSchema = new Schema({
  name: String,
  leader: mongoose.Types.ObjectId,
  members: [mongoose.Types.ObjectId],
});

export default mongoose.model<TeamModel>("Team", TeamSchema);
