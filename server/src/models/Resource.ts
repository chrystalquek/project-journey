import { createSchema, ExtractProps, Type } from "ts-mongoose";
import mongoose from "mongoose";

const RESOURCE_TYPE = ["google docs", "link", "pdf", "video"];

const ResourceSchema = createSchema({
  name: Type.string({ required: true }),
  url: Type.string({ required: true }),
  resourceType: Type.string({
    required: true,
    enum: RESOURCE_TYPE,
  }),
  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),
});

export type ResourceData = Omit<
  ExtractProps<typeof ResourceSchema>,
  "__v" | "_id"
> & { _id: string };

type ResourceModel = ResourceData & mongoose.Document;
export default mongoose.model<ResourceModel>("Resource", ResourceSchema);
