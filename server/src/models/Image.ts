import mongoose from 'mongoose';
import { ImageResponse } from '../types';

const { Schema } = mongoose;

export type ImageModel = ImageResponse & mongoose.Document;

const ImageSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  email: String,
  imageName: String,
  url: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ImageModel>('Image', ImageSchema);
