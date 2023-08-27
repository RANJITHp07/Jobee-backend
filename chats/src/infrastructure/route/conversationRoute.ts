import ConversationController from "../../adapter/conversationController";
import Conversationusecase from "../../usecase/conversationusecase";
import ConversationModel from "../model/conversation";
import ConversationRepository from "../repository/conversationRepository";
import express,{Request,Response,NextFunction} from "express";
import { signinverify } from "@job_portal/common";

const model=new ConversationModel()
const repository =new ConversationRepository(model);
const usecase=new Conversationusecase(repository);
const controller=new ConversationController(usecase);

const route=express.Router()


route.post("/v2/api/chat/convo",signinverify,(req:Request,res:Response,next:NextFunction) =>controller.create(req,res,next))
route.get("/v2/api/chat/convo/:id",signinverify,(req:Request,res:Response,next:NextFunction) =>controller.getConvo(req,res,next))

export default route