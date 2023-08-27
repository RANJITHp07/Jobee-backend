import Message from "../../domain/message"
import IMessageRepository from "../../usecase/interface/messageConversation"
import MessageModel from "../model/Message"

class MessageRepository implements IMessageRepository{
    constructor(messageModel:any){}


    async create(message:Message):Promise<unknown>{
        try{
            const Message=await MessageModel.create(message)
            return Message
        }catch(err){
            throw err
        }
    }


    async getConversation(id:string):Promise<unknown>{
        try{
          const convo=await MessageModel.find({conversationId:id})
          return convo
        }catch(err){
            throw err
        }
    }

}

export default MessageRepository