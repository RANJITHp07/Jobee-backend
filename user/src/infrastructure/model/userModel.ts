import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUser extends Document {
  _id?: string;
  userId?: Types.ObjectId;
  address: string;
  phoneNumber: number;
  photo: string;
  profileSummary: string;
  skills: string[] | string;
  education: string;
  experience: string;
  language: string[] | string;
  resume:string,
  achievements: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    userId: { type: Types.ObjectId, ref: 'Auth',default:'' },
    address: { type: String, default: '' },
    phoneNumber: { type: Number, default: 0 },
    photo: { type:String, default: '' },
    profileSummary: { type: String, default: '' },
    skills: { type: [String], default: '' },
    education: { type: String, default: '' },
    experience: { type: String, default: '' },
    language: { type: [String], default: '' },
    resume:{ type: String, default: '' },
    achievements: { type: String, default: '' },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export { IUser, UserModel };
