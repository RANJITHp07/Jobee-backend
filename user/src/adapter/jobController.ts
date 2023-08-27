import Jobusecase from "../usecase/jobusecase";
import { Request,Response,NextFunction } from "express";

class JobController{

    private jobusecase:Jobusecase
    constructor(jobusecase:Jobusecase){
      this.jobusecase = jobusecase
    }


    //to save the users related to a particular job
    async save(req:Request, res:Response,next:NextFunction){
         try{
            const users=await this.jobusecase.jobApplied(req.body._id,req.body.userId)
            res.status(users.status).json(users.data)
         }catch(err){
            next(err)
         }
    }


    //to get all the users related to a job application
    async getUser(req:Request, res:Response,next:NextFunction){
      try{
         const users=await this.jobusecase.getUser(req.params.id)
         res.status(users.status).json(users.data)
      }catch(err){
         next(err)
      }
 }

  //to update the status of an user to perfect good or bad
   async updateStatus(req:Request, res:Response, next:NextFunction){
      try{
         const users=await this.jobusecase.updateStatus(req.body.id,req.body.userId,req.body.status)
         res.status(users.status).json(users.data)
      }catch(err){
         next(err)
      }
   }

   //to shortlist the users for an job application
   async shortlist(req:Request, res:Response, next:NextFunction){
      try{
         const users=await this.jobusecase.shortlist(req.body.id,req.body.userId)
         res.status(users.status).json(users.data)
      }catch(err){
         next(err)
      }
   }

   //get all the shortlisted users

   async getshortlist(req:Request, res:Response, next:NextFunction){
      try{
         const users=await this.jobusecase.findShortlist(req.params.id)
         res.status(users.status).json(users.data)
      }catch(err){
         next(err)
      }
   }

   //to get all the users based on the filter
   async filter(req:Request, res:Response, next:NextFunction){
      try{
         const { status }: {status?:string[]}= req.query;
         if(status){
            
            const users=await this.jobusecase.filter(req.params.id,status)
         res.status(users.status).json(users.data)
         }
         
      }catch(err){
         next(err)
      }
   }

   async findUser(req:Request, res:Response, next:NextFunction){
       try{
         console.log(req.params.id)
          const users=await this.jobusecase.findUser(req.params.id);
          if(users){
            res.status(users.status).json(users.data)
          }
          
       }catch(err){
         next(err)
      }
   }

   async userExist (req:Request, res:Response, next:NextFunction){
      try{
         const userId = req.query.userId as string;
         const users=await this.jobusecase.userExist(req.params.id,userId);

        
           res.status(users.status).json(users.data)
         
         
      }catch(err){
        next(err)
     }
  }
}

export default JobController