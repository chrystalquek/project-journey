import bcrypt from 'bcrypt';
import { Type, createSchema, ExtractProps } from 'ts-mongoose';
import mongoose from 'mongoose';

// TODO check if hash value of 10 is secure
export const setPassword = (value: string) => bcrypt.hashSync(value, 10);

export const UserSchema = createSchema({
    password: Type.string({
        required: true,
        set: setPassword,
    }),
    administratorRemarks: Type.string({ required: false }),
    createdAt: Type.date({
        required: true,
        default: Date.now,
    }),
});

export type UserData = Omit<ExtractProps<typeof UserSchema>, '__v' | '_id'> &
{ _id: string };

export type NewUserData = Omit<UserData, '_id' | 'createdAt'>

type UserModel = UserData & mongoose.Document
export default mongoose.model<UserModel>('User', UserSchema);
