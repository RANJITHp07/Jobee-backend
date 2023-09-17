import IConversationRepository from "../../usecase/interface/conversationRepository"
import ConversationModel from "../model/conversation"


class ConversationRepository implements IConversationRepository{
    constructor(conversationModel:any){}

    async create(recieveId:string,senderId:string):Promise<unknown>{
        try{
            const convo=await ConversationModel.create({members:[senderId,recieveId],latestMessage:""})
            return convo
        }catch(err){
              throw err
        }
    }

    async getConvo(id:string):Promise<unknown>{
        try{
           const convo=await ConversationModel.find({members:{$in:[id]}}).populate("members").sort({updatedAt:-1})
           return convo
        }catch(err){
              throw err
        }
    }

    async update(id:string,update:any):Promise<unknown>{ 
        try{
            const updatedConversation = await ConversationModel.findByIdAndUpdate(id, { $set: update },{new:true});
            return updatedConversation;
        }catch(err){
              throw err
        }
    }

    async find(recieveId:string,senderId:string){
        try{
            const convo=await  ConversationModel.findOne({members:[senderId,recieveId]})
            return convo
        }catch(err){
            throw err
        }
    }
}

export default ConversationRepository