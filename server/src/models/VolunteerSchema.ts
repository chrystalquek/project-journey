import mongoose, { Schema } from 'mongoose';
import { VolunteerSchemaData } from '../types';

type VolunteerSchemaModel = VolunteerSchemaData & mongoose.Document

const VolunteerSchemaDescription = new Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  field_type: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<VolunteerSchemaModel>('VolunteerSchema', VolunteerSchemaDescription);
