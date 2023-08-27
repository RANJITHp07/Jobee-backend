import { NextFunction, Response,Request } from "express";
import { Notificationusecase } from "../usecase/notificationusecase";

export class Notificationcontoller{

    private notifcationusecase:Notificationusecase
    constructor(notifcationusecase:Notificationusecase){
        this.notifcationusecase = notifcationusecase;
    }

    async deleteAllNotifications(req:Request,res:Response,next:NextFunction){
        try{
            const del=await this.notifcationusecase.deleteAllNotifications(req.body.id);
            res.status(del.status).json(del.data)
        }catch(err){
           next(err)
        }
    }

    async removeNotificationAtIndex(req:Request,res:Response,next:NextFunction){
        try{
            const del=await this.notifcationusecase.removeNotificationAtIndex(req.body.id);
            res.status(del.status).json(del.data)
        }catch(err){
           next(err)
        }
    }

    async geAllnotification(req:Request,res:Response,next:NextFunction){
        try{
            const del=await this.notifcationusecase.getAllmessages(req.body.id);
            res.status(del.status).json(del.data)
        }catch(err){
           next(err)
        }
    }
}