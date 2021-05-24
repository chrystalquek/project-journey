import { Type, createSchema, typedModel, ExtractProps } from 'ts-mongoose';

export const SIGN_UP_STATUS = ['pending', ['accepted', String], 'rejected'] as const;
export type SignUpStatus = (typeof SIGN_UP_STATUS)[number]

const SignUpSchema = createSchema({
  signUpId: Type.objectId({ required: true }), // TODO remove
  eventId: Type.objectId({ required: true }),
  userId: Type.objectId({ required: true }),
  status: Type.mixed({
    required: true,
    enum: SIGN_UP_STATUS,
  }),
  preferences: Type.array({ required: true }).of(Type.string({ required: true })),
  isRestricted: Type.boolean({ required: true }),
  createdAt: Type.date({
    required: true,
    default: Date.now,
  }),
});

export type SignUpData = Omit<ExtractProps<typeof SignUpSchema>, "__v">;

export default typedModel('SignUp', SignUpSchema);

// export default mongoose.model<SignUpModel>('SignUp', SignUpSchema);
