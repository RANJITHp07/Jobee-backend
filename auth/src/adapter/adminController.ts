import Adminauthusecase from "../use_case/adminauthusecase"
import Session from "../infrastructure/repository/session";
import { NextFunction, Request, Response } from "express";

class AdminController{
    private adminUseCase:Adminauthusecase
    private session:Session
   
    constructor(authusecase:Adminauthusecase,session:Session){
         this.adminUseCase=authusecase
         this.session=session        
    }


    //to signin an admin user email and username
    async signin(req:Request,res:Response,next:NextFunction){
        try{
             const admin=await this.adminUseCase.signin(req.body);
            admin && res.status(admin.status).json(admin.data)
        }catch(err){
            next(err)
        }
    }
    
    //to allow admin to login with his email and password
    async login(req:Request,res:Response,next:NextFunction){
        try{
            const admin:any=await this.adminUseCase.login(req.body);
            await this.session.sessionSetup(req,admin?.data.userId);
            res.status(admin?.status).json({ user:admin.data, session: req.session})
        }catch(err){
            next(err)
        }
    }

    //to find an admin using his  _id
    async find(req:Request,res:Response,next:NextFunction){
        try{
            const admin=await this.adminUseCase.findById(req.params.id);
            res.status(admin?.status).json(admin?.data)
        }catch(err){
            next(err)
        }
    }


    //to send the otp to email for verification
    async sendEmail(req:Request,res:Response,next:NextFunction){
        try{
          const user=await this.adminUseCase.verifyEmail(req.body.email,req.body.username)
          res.status(user.status).json(user.data)
       }catch(err){
           next(err)
       }
      }
  
      // cheching whether the otp send to email and the admins otp is same
      async emailVerification(req:Request,res:Response,next:NextFunction){
        try{
          const user=await this.adminUseCase.emailVeification(req.body.otp,req.body.email)
          res.status(user.status).json(user.data)
       }catch(err){
           next(err)
       }
      }
}

export default AdminController