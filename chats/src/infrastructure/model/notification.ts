import mongoose, { Document, Schema, Types } from 'mongoose';

interface Notification extends Document {
  user_id?: Types.ObjectId;
  reciever_id: string;
  message: string;
}

const notificationSchema = new Schema<Notification>({
  user_id: { type: Types.ObjectId, ref: 'User' },
  reciever_id: {
    type: String,
  },
  message: String,
});

const NotificationModel = mongoose.model<Notification>('Notification', notificationSchema);

export default NotificationModel;
