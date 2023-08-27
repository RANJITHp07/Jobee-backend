import JobController from "../../adapter/jobController";
import Jobusecase from "../../usecase/jobusecase";
import JobModel from "../model/jobModel";
import JobRepository from "../repository/jobRepository";
import UserRepository from "../repository/userRepository";
import Publisher from "../repository/publishrepository";
import express ,{Request,Response,NextFunction} from "express";
import Listener from "../repository/listenrepository";
import { signinverify } from "@job_portal/common";

const model=new JobModel();
const repository=new JobRepository(model);
const userrepository=new UserRepository()
const publish=new Publisher()
const listen=new Listener()
const usecase=new Jobusecase(repository,userrepository,publish,listen);
const controller=new JobController(usecase);

const route=express.Router()

route.post("/v4/api/profile/jobapplied",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.save(req,res,next));
route.get("/v4/api/profile/jobapplied/:id",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.getUser(req,res,next));
route.put("/v4/api/profile/status/jobapplied",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.updateStatus(req,res,next));
route.get("/v4/api/profile/getusers/:id",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.findUser(req,res,next));
route.get("/v4/api/profile/shortlist/:id",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.getshortlist(req,res,next));
route.put("/v4/api/profile/user/shortlist",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.shortlist(req,res,next));
route.get("/v4/api/profile/filter/:id",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.filter(req,res,next));
route.get("/v4/api/profile/userExist/:id",signinverify,(req:Request, res:Response,next:NextFunction)=>controller.userExist(req,res,next));


export default  route