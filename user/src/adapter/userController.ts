import Userusecase from "../usecase/user_use_case";
import { Response,Request,NextFunction } from "express";

 class Usercontroller{
    private userusecase:Userusecase

    constructor(userusecase:Userusecase){
           this.userusecase=userusecase
    }


    //to create an user details
    async save(req:Request,res:Response,next:NextFunction){
        try{
                const user=await this.userusecase.save(req.body)
                res.status(user.status).json(user.data)
        }catch(err){
            next(err)
        }
    }

    //to get all the details of an user
    async getUser(req:Request,res:Response,next:NextFunction){
        try{
            const user=await this.userusecase.getUser(req.params.id)
            res.status(user.status).json(user.data)
        }catch(err){
            next(err)
        }
    }

    //to get all the details of an user
    async getAlluser(req:Request,res:Response,next:NextFunction){
        try{
            const user=await this.userusecase.getAlluser()
            res.status(user.status).json(user.data)
        }catch(err){
            next(err)
        }
    }

    //to update the details of an user
    async userUpdate(req:Request,res:Response,next:NextFunction){
        try{
            const user=await this.userusecase.userUpdate(req.params.id,req.body)
            res.status(user.status).json(user.data)
        }catch(err){
            next(err)
        }
    }

    //to upload the photo of the user
    async upload(req:Request,res:Response,next:NextFunction){
        try{
            if(req.query.category==="profile"){
                const profile=await this.userusecase.upload(req.params.id,req.body.file)
                 res.status(profile.status).json(profile.data)
            }else {
                
                const profile=await this.userusecase.uploadResume(req.params.id,req.body.file)
                res.status(profile.status).json(profile.data)
            }
        }catch(err){
            next(err)
        }
    }
 }

 export default Usercontroller