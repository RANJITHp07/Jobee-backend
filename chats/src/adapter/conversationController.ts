import Conversationusecase from "../usecase/conversationusecase"
import {Request,Response,NextFunction} from "express"


class ConversationController{
    private conversationusecase:Conversationusecase
     constructor(conversationusecase:Conversationusecase){
        this.conversationusecase = conversationusecase
     }

     async create(req:Request,res:Response,next:NextFunction){
        try{
            console.log(req.body)
            const convo=await this.conversationusecase.create(req.body.recieveId,req.body.senderId);
            res.status(convo.status).json(convo.data);
        }catch(err){
            next(err)
        }
     }

     async getConvo(req:Request,res:Response,next:NextFunction){
        try{
            const convo=await this.conversationusecase.getConvo(req.params.id);
            res.status(convo.status).json(convo.data);
        }catch(err){
            next(err)
        }
     }
}



export default ConversationController