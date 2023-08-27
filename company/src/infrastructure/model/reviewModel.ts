import mongoose, { Document, Schema,Types } from 'mongoose';

interface IReview extends Document {
    _id?: string;
    review: [{
      username: string;
      comment: string;
      rating: number;
    }];
    totalrating: number;
  }

const ReviewSchema: Schema = new Schema({
  _id: { type: Types.ObjectId,required:true},
  review:[{
    username: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  }],
  totalrating: { type: Number},
});

const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);

export default ReviewModel;
