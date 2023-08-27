import mongoose, { Document, Schema } from 'mongoose';

interface IAuth extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role:string,
  admin?: boolean;
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>({
  username: 
  { type: String,
     required: true 
    },
  email: { 
    type: String, 
    unique:true,
    required: true 
},
  password: {
     type: String,
    },
  role:{type:String,default:'employer'},
  admin: { type: Boolean, default: false },
},{
    timestamps: true,
  });

const AuthModel = mongoose.model<IAuth>('Auth', AuthSchema);

export default AuthModel;
