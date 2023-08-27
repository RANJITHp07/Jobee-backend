import { Request,Response,NextFunction } from "express";
import Stripeusecase from "../usecase/stripeusecase";
import Userusecase from "../usecase/userusecase";

class paymentController{
    private stripeusecase:Stripeusecase
    private userusecase:Userusecase
    constructor(stripeusecase:Stripeusecase,userusecase:Userusecase){
        this.stripeusecase=stripeusecase;
        this.userusecase=userusecase;
    }

    async getPlans(req:Request, res:Response,next:NextFunction){
        try{
           const plans=await this.stripeusecase.getPlans()
       
           res.status(plans.status).json(plans.data)
        }catch(err){
            next(err)
        }
    }

    async createPlan(req:Request, res:Response,next:NextFunction){
           try{
            const plans=await this.stripeusecase.createPlans(req.body.priceId,req.body.stripeId)
            res.status(plans.status).json(plans.data)
           }catch(err){
            next(err)
        }
    }

    async subscriptions(req:Request, res:Response,next:NextFunction){
        try{
            const plans=await this.stripeusecase.subscriptions(req.params.stripeId)
            res.status(plans.status).json(plans.data)
           }catch(err){
            next(err)
        }
    }

    async getUser(req:Request, res:Response,next:NextFunction){
         try{
            const plans=await this.userusecase.find(req.params.id)
            res.status(plans.status).json(plans.data)
         }catch(err){
            next(err)
        }
    }

    async getAllplans(req:Request, res:Response,next:NextFunction){
        try{
            const plans=await this.stripeusecase.getAllplans()
            res.status(plans.status).json(plans.data)
           }catch(err){
            next(err)
        }
    }

}

export default paymentController