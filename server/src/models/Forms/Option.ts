import { Type, createSchema, ExtractProps } from "ts-mongoose";
import mongoose from "mongoose";

const OptionSchema = createSchema({
  questionId: Type.objectId({
    required: true,
    ref: "Question",
  }),
  text: Type.string({ required: true }),
});

export type OptionData = Omit<
  ExtractProps<typeof OptionSchema>,
  "__v" | "_id" | "questionId"
> & {
  _id: string;
  questionId: string;
};

type OptionModel = OptionData & mongoose.Document;
export default mongoose.model<OptionModel>("Option", OptionSchema);
