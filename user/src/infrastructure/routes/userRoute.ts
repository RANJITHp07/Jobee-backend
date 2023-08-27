import express,{NextFunction, Request,Response} from "express"
import Userusecase from "../../usecase/user_use_case";
import Usercontroller from "../../adapter/userController";
import UserRepository from "../repository/userRepository";
import Publisher from "../repository/publishrepository";
import { signinverify } from "@job_portal/common";



const repository=new UserRepository();
const publish=new Publisher()
const usecase=new Userusecase(repository,publish);
const controller=new Usercontroller(usecase);


const route=express.Router();

route.post("/v4/api/profile",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.save(req,res,next))
route.get("/v4/api/profile/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.getUser(req,res,next))
route.get("/v4/api/profile",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.getAlluser(req,res,next))
route.put("/v4/api/profile/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.userUpdate(req,res,next))
route.put("/v4/api/profile/upload/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.upload(req,res,next))

export default route