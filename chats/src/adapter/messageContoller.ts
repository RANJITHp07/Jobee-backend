import Messageusecase from "../usecase/messageusecase";
import {Request,Response,NextFunction} from "express"

class MessageController{
    private messageusecase:Messageusecase;

    constructor(messageusecase:Messageusecase){
        this.messageusecase = messageusecase;
    }

    async create(req:Request, res:Response,next:NextFunction){
        try{
           const message=await this.messageusecase.create(req.body)
           res.status(message.status).json(message.data)
        }catch(err){
            next(err)
        }
    }

    async getConvo(req:Request, res:Response,next:NextFunction){
        try{
           const convo=await this.messageusecase.getConvo(req.params.id)
           res.status(convo.status).json(convo.data)
        }catch(err){
            next(err)
        }
    }

}

export  default MessageController