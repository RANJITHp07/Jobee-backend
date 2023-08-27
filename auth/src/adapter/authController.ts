import Authusecase from "../use_case/authusecase";
import { Response,Request,NextFunction } from "express";
import Session from "../infrastructure/repository/session";

class authController{
    private authUseCase:Authusecase
    private session:Session
   
    constructor(authusecase:Authusecase,session:Session){
         this.authUseCase=authusecase
         this.session=session
        
    }

    //to signin a user using email username and password
    async signin(req:Request,res:Response,next:NextFunction){
       try{
          const user=await this.authUseCase.save(req.body)
          res.status(user.status).json(user.data)
       }catch(err){
           next(err)
       }
    }

    //to allow a user to login using email and password
    async login(req: Request, res: Response, next: NextFunction) {
        try {
          const user: any = await this.authUseCase.login(req.body);
         
          await this.session.sessionSetup(req,user.data.userId);
          res.status(user.status).json({ user: user.data, session: req.session});
        } catch (err) {
          next(err);
        }
      }

    // to find a user using email,role or using _id
     async find(req: Request, res: Response, next: NextFunction){
          try{
               const query=req.query
              
               const user: any = await this.authUseCase.find(query);
               res.status(user.status).json(user.data);
          }catch(err){
            next(err)
          }
     }

     //to update the password of an user 
      async update(req: Request, res: Response, next: NextFunction){
        try {
        
          const user: any = await this.authUseCase.findByIdAndUpdate(req.body.userData.email,{password:req.body.userData.password});
          res.status(user.status).json(user.data);
        } catch (err) {
          next(err);
        }
      }

      //to update the profile of an user using the email 
      async updateProfile(req: Request, res: Response, next: NextFunction){
        try {
          const user: any = await this.authUseCase.findByIdAndUpdate(req.params.email,req.body);
          res.status(user.status).json(user.data);
        } catch (err) {
          next(err);
        }
      }

    //to send email to the user to verify the email during the signin 
    async sendEmail(req:Request,res:Response,next:NextFunction){
      try{
        const user=await this.authUseCase.verifyEmail(req.body.email,req.body.username)
        res.status(user.status).json(user.data)
     }catch(err){
         next(err)
     }
    }

    //to verify whether the otp send through the email is same as that of the user
    async emailVerification(req:Request,res:Response,next:NextFunction){
      try{
        const user=await this.authUseCase.emailVeification(req.body.otp,req.body.email)
        res.status(user.status).json(user.data)
     }catch(err){
         next(err)
     }
    }

}

export default authController
