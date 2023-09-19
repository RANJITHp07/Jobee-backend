import { Request,Response,NextFunction } from "express";
import SaveUsecase from "../usecase/saveusecase";

class SaveController{
    private saveusecase:SaveUsecase;

    constructor(saveusecase:SaveUsecase){
        this.saveusecase = saveusecase;
    } 


    async save(req:Request, res:Response,next:NextFunction){
        try{
            const save=await this.saveusecase.create(req.body.id,req.body.jobId);
            res.status(save.status).json(save.data)
        }catch(err){
            next(err)
        }
    }

    async findsaved(req:Request, res:Response,next:NextFunction){
        try{
            const save=await this.saveusecase.findSaved(req.params.id)
            res.status(save.status).json(save.data)
        }catch(err){
            next(err)
        }
    }

    async savedExist(req:Request, res:Response,next:NextFunction){
        try{
         
            const save=await this.saveusecase.savedExist(req.query.userId as string ,req.query.id as string)
            res.status(save.status).json(save.data)
        }catch(err){
            next(err)
        }
    }
}

export default SaveController