import StripeRepository from "../repository/stripeRepository";
import Stripeusecase from "../../usecase/stripeusecase";
import paymentController from "../../adapter/paymentController";
import express,{Request,Response,NextFunction} from 'express'
import Userusecase from "../../usecase/userusecase";
import UserRepository from "../repository/userRepository";
import UserModel from "../model/userModel";
import Listener from "../repository/listenrepository";
import { signinverify } from "@job_portal/common";


const repository=new StripeRepository();
const usecase=new Stripeusecase(repository);
const usermodel=new UserModel();
const listener=new Listener()
const userrepository=new UserRepository(usermodel);
const userusecase=new Userusecase(userrepository,listener,repository)
const controller=new paymentController(usecase,userusecase);

const route=express.Router()

route.get("/v1/api/plans",(req:Request, res:Response,next:NextFunction) => controller.getPlans(req, res, next))
route.post("/v1/api/plans",signinverify,(req:Request, res:Response,next:NextFunction) => controller.createPlan(req, res, next));
route.get("/v1/api/plans/subs/:stripeId",signinverify,(req:Request, res:Response,next:NextFunction) => controller.subscriptions(req, res, next))
route.get("/v1/api/plans/user/:id",signinverify,(req:Request, res:Response,next:NextFunction) => controller.getUser(req, res, next))
route.get("/v1/api/plans/allpayments",(req:Request, res:Response,next:NextFunction) => controller.getAllplans(req, res, next))
export default route