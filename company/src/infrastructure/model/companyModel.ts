import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICompany extends Document {
  _id?: string;
  companyId?:Types.ObjectId;
  website?:string,
  location:string,
  companyType:string
  logo: string;
  desc: string;
}

const CompanySchema: Schema<ICompany> = new Schema<ICompany>({
  companyId: { type: Types.ObjectId, ref: 'Auth'},
  website:{type:String},
  location:{type:String,default:''},
  companyType: { type: String, enum: ['Startup', 'MNC', 'Service-based', 'Product-based', 'Non-profit', 'E-commerce', 'Financial Institution', 'Technology Company', 'Consulting Firm', 'Manufacturing Company','Others']},
  logo: { type: String, default:'' },
  desc: { type: String, default:'' },
});

const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);

export { ICompany,CompanyModel};
