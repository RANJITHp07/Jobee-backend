import mongoose, { Document, Schema,Types} from 'mongoose';


interface Notification extends Document {
    user_id:Types.ObjectId
    message: string;
}

const notificationSchema = new Schema<Notification>({
    user_id: String,
    message: String
});


const NotificationModel = mongoose.model<Notification>('Notification', notificationSchema);

export default NotificationModel

