import Adminauthusecase from "../../use_case/adminauthusecase";
import AdminRepository from "../repository/adminauthRepository";
import jwtPassword from "../repository/jwtRepository";
import Encrypt from "../repository/bcryptRepository";
import validateMiddleware from "../middleware/validator";
import Publisher from "../repository/publishrepository";
import Session from "../repository/session";
import Nodemailer from "../repository/nodemailer";
import AdminController from "../../adapter/adminController";
import express,{Request,Response,NextFunction} from "express"
import { adminverify } from "@job_portal/common";

const repository=new AdminRepository();
const encrypt=new Encrypt()
const jwt=new jwtPassword()
const session=new Session()
const publish=new Publisher()
const nodemailer=new Nodemailer()
const  usecase=new Adminauthusecase(repository,encrypt,jwt,publish,nodemailer)
const controller=new AdminController(usecase,session);

const route=express.Router()

//creating the routes
route.post("/v4/api/auth/admin/signin",validateMiddleware,(req:Request,res:Response,next:NextFunction)=>controller.signin(req,res,next));
route.post("/v4/api/auth/admin/login",(req:Request,res:Response,next:NextFunction)=>controller.login(req,res,next))
route.post("/v4/api/auth/admin/verify",(req:Request,res:Response,next:NextFunction)=>controller.sendEmail(req,res,next))
route.get("/v4/api/auth/admin/:id",adminverify,(req:Request,res:Response,next:NextFunction)=>controller.find(req,res,next))
route.post("/v4/api/auth/admin/otp",(req:Request,res:Response,next:NextFunction)=>controller.emailVerification(req,res,next))

export default route