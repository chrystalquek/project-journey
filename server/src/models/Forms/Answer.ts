import { Type, createSchema, ExtractProps } from "ts-mongoose";
import mongoose from "mongoose";

const AnswerSchema = createSchema({
  questionId: Type.objectId({
    required: true,
    ref: "Question",
  }),
  userId: Type.objectId({
    required: true,
    ref: "Volunteer",
  }),
  formId: Type.objectId({
    required: false,
    ref: "Form",
  }), // TODO conflict with FE: FE does not have formId
  content: Type.string({ required: true }),
});

export type AnswerData = Omit<
  ExtractProps<typeof AnswerSchema>,
  "__v" | "_id" | "questionId" | "userId" | "formId"
> & {
  questionId: string;
  userId: string;
  formId?: string;
};

export type NewAnswerData = Omit<AnswerData, "_id" | "createdAt">;

type AnswerModel = AnswerData & mongoose.Document;
export default mongoose.model<AnswerModel>("Answer", AnswerSchema);
