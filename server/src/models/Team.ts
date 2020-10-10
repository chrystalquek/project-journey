import mongoose from 'mongoose';
import { TeamData } from "../types";

const { Schema } = mongoose;

type TeamModel = TeamData & mongoose.Document;

const TeamSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  leader: mongoose.Types.ObjectId,
  members: [mongoose.Types.ObjectId]
});

export default mongoose.model<TeamModel>('Team', TeamSchema);