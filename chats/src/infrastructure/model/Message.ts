import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  conversationId: string;
  sender: string;
  text:{
    type:string,
    text:string
  };
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type:{type:String},
      text:{type:String}
    },
  },
  { timestamps: true }
);

const MessageModel= mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel
