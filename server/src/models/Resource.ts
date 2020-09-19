import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    url: String,
    created_at: Date,
    resource_type: {
        type: String,
        enum: ["google docs", "link", "pdf", "video"],
    },
});

export default mongoose.model("Resource", ResourceSchema);
