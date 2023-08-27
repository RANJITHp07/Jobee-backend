import mongoose, { Schema, Document, Types } from 'mongoose';

interface UserApplication {
  _id?: string;
  userId: string;
  status: "Perfect" | "Good" | "Average" | "Bad" | "No status";
  viewed: boolean;
  shortlisted: boolean;
}

interface Job extends Document {
  _id?: string;
  applications: UserApplication[];
}

const jobSchema: Schema<Job> = new Schema<Job>({
  _id: { type: Types.ObjectId,required:true},
  applications: [
    {
      _id: { type: Types.ObjectId, ref: 'User', required: true },
      status: {
        type: String,
        enum: ["Perfect", "Good", "Average", "Bad", "No status"],
        default: "No status",
      },
      viewed: { type: Boolean, default: false },
      shortlisted: { type: Boolean, default: false },
    },
  ],
});

const JobModel = mongoose.model<Job>('Job', jobSchema);

export default JobModel;
