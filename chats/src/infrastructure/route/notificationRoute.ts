import express from "express";
import { Notificationcontoller } from "../../adapter/notificationController";
import { Notificationusecase } from "../../usecase/notificationusecase";
import NotificationRepository  from "../repository/notificationRepository";

const repository=new NotificationRepository();
const usecase=new Notificationusecase(repository);
const controller=new Notificationcontoller(usecase);

const router=express.Router()

router.post("/v2/api/chat/deleteallmessages",(req,res,next)=>controller.deleteAllNotifications(req,res,next))
router.post("/v2/api/chat/getallmessages",(req,res,next)=>controller.geAllnotification(req,res,next))
router.post("/v2/api/chat/createmessages",(req,res,next)=>controller.createnotification(req,res,next))
router.post("/v2/api/chat/deleteallmessagesatindex",(req,res,next)=>controller.removeNotificationAtIndex(req,res,next))

export default router