import mongoose, { Document, Schema,Types } from 'mongoose';

interface IAuth extends Document {
  _id?: string;
  username: string;
  email: string;
  role:string,
  
}

const AuthSchema: Schema<IAuth> = new Schema<IAuth>({
  _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
  username: 
  { type: String,
     required: true 
    },
  email: { 
    type: String, 
    unique:true,
    required: true 
},

role:{type:String,default:'employer'},
  
},{
    timestamps: true,
  });

const AuthModel = mongoose.model<IAuth>('Auth', AuthSchema);

export default AuthModel;
