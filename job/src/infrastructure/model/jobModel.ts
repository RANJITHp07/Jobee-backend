import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
  _id?: string;
  comapny:String,
  role: string;
  desc: string;
  experience: number[];
  skills: string[];
  education: string;
  salary: number[];
  workmode: 'Remote' | 'Hybrid' | 'On-Site';
  recruiting:boolean
  location:string
}

const JobSchema: Schema = new Schema({
  company: {type: Schema.Types.ObjectId, ref:'Company'},
  role: { type: String, required: true },
  desc: { type: String, required: true },
  experience: { type: [Number], required: true },
  skills: { type: [String], required: true },
  education: { type: String},
  recruiting:{type:String},
  salary: { type: [Number], required: true },
  workmode: { type: String, enum: ['Remote', 'Hybrid', 'On-Site'], required: true },
  location:{type:String,required:true},
},{
  timestamps:true
});

JobSchema.index({ role: 'text', desc: 'text' });

const JobModel = mongoose.model<IJob>('Job', JobSchema);

export default JobModel;
