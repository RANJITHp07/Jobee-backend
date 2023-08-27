import mongoose, { Document, Schema, Model } from 'mongoose';


interface ISave extends Document {
  _id?: string;
  saved?: string[];
}


const SaveSchema: Schema<ISave> = new Schema<ISave>({
  _id: { type: Schema.Types.ObjectId,required:true},
  saved: { type: [Schema.Types.ObjectId],ref:'Job'},
});


const SaveModel: Model<ISave> = mongoose.model<ISave>('Save', SaveSchema);

export default SaveModel;
