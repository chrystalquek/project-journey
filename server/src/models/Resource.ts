import { ResourceData } from "./../types";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

export type ResourceModel = ResourceData & mongoose.Document;

const ResourceSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    url: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    resource_type: {
        type: String,
        enum: ["google docs", "link", "pdf", "video"],
    },
});

export default mongoose.model<ResourceModel>("Resource", ResourceSchema);
