import mongoose, { Document,Schema,Types} from "mongoose";

interface User extends Document {
  email: string;
  username: string;
  stripeCustomerId: string;
}

const userSchema = new Schema<User>({
    _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  username:{
    type: String,
    trim: true,
  },
  stripeCustomerId: {
    type: String,
  },
});

const UserModel= mongoose.model<User>("User", userSchema);

export default UserModel
