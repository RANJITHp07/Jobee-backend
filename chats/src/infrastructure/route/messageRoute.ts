import express,{Request,Response,NextFunction} from 'express';
import MessageRepository from "../repository/messageRepository"
import MessageModel from "../model/Message"
import ConversationModel from "../model/conversation"
import Messageusecase from "../../usecase/messageusecase"
import ConversationRepository from "../repository/conversationRepository"
import MessageController from '../../adapter/messageContoller';
import { signinverify } from '@job_portal/common';

const model=new MessageModel()
const repository=new MessageRepository(model)
const convoModel=new ConversationModel()
const convoRepository=new ConversationRepository(convoModel)
const usecase=new Messageusecase(repository,convoRepository)
const controller=new MessageController(usecase)

const route=express.Router();

route.post("/v2/api/chat/message",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.create(req,res,next));
route.get("/v2/api/chat/message/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.getConvo(req,res,next));

export default route;
