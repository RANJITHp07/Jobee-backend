import mongoose, { Document,Types } from "mongoose";

interface IConversation extends Document {
  members:Types.ObjectId[];
  latestMessage:string
}

const ConversationSchema = new mongoose.Schema<IConversation>(
  {
    members: [
      { type: Types.ObjectId, ref: 'User' }
    ],
    latestMessage:{type:String}
  },
  { timestamps: true }
);

const ConversationModel= mongoose.model<IConversation>("Conversation", ConversationSchema);

export default ConversationModel
