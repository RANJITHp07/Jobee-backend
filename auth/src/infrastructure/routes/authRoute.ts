import express,{NextFunction, Request,Response} from "express"
import Authusecase from "../../use_case/authusecase";
import authController from "../../adapter/authController";
import AuthRepository from "../repository/authRepository";
import jwtPassword from "../repository/jwtRepository";
import Encrypt from "../repository/bcryptRepository";
import validateMiddleware from "../middleware/validator";
import Publisher from "../repository/publishrepository";
import Session from "../repository/session";
import Nodemailer from "../repository/nodemailer";
import { signinverify } from "@job_portal/common";

const  repository=new AuthRepository();
const encrypt=new Encrypt()
const jwt=new jwtPassword()
const session=new Session()
const publish=new Publisher()
const nodemailer=new Nodemailer()
const usecase=new Authusecase(repository,encrypt,jwt,publish,nodemailer);
const controller=new authController(usecase,session);

const route=express.Router()

route.post("/v4/api/auth/signin",validateMiddleware,(req:Request,res:Response,next:NextFunction)=>controller.signin(req,res,next))
route.post("/v4/api/auth/login",(req:Request,res:Response,next:NextFunction)=>controller.login(req,res,next))
route.patch("/v4/api/auth",(req:Request,res:Response,next:NextFunction)=>controller.update(req,res,next))
route.put("/v4/api/auth/update/:email",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.updateProfile(req,res,next))
route.get("/v4/api/auth",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.find(req,res,next))
route.post("/v4/api/auth/verify",(req:Request,res:Response,next:NextFunction)=>controller.sendEmail(req,res,next))
route.post("/v4/api/auth/otp",(req:Request,res:Response,next:NextFunction)=>controller.emailVerification(req,res,next))


export default route
