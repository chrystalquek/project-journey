import { createSchema, ExtractProps, Type, typedModel } from "ts-mongoose";

const ImageSchema = createSchema({
  email: Type.string({ required: true }),
  imageName: Type.string({ required: true }),
  url: Type.string({ required: true }),
  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),
});

export type ImageData = Omit<ExtractProps<typeof ImageSchema>, "__v">;

export default typedModel("Image", ImageSchema);
