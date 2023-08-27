import mongoose, { Document, Model,Types,Schema} from "mongoose";

interface IUser extends Document {
_id?:string
  username: string;
  email:string
}

const UserSchema = new mongoose.Schema<IUser>(

  {
    _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
