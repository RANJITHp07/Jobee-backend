import mongoose, { Document, Schema, Types,Model } from 'mongoose';

interface ICompany extends Document {
  _id: Types.ObjectId,
  companyusername:string,
  email:string,
  companyType:string
  location:string,
  logo: string;
  rating:number
}

const CompanySchema: Schema<ICompany> = new Schema<ICompany>({
  _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
  companyusername:{type:String}, 
  email:{type:String},
  companyType:{type:String,default:'not mentioned'},
 location:{type:String,default:'not mentioned'},
  logo: { type: String, default:'' },
  rating:{type:Number,default:2}
});

const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);

export { ICompany,CompanyModel};
