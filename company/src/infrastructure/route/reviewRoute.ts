import Reviewusecase from "../../usecase/reviewusecase";
import ReviewModel from "../model/reviewModel";
import ReviewRepository from "../repository/reviewRepository";
import ReviewController from "../../adapter/reviewController";
import express,{Request, Response,NextFunction} from "express"
import Publisher from "../repository/publishrepository";
import { signinverify } from "@job_portal/common";


const model=new ReviewModel();
const repository = new ReviewRepository(model);
const publisher = new Publisher()
const usecase=new Reviewusecase(repository,publisher);
const controller=new ReviewController(usecase)

const route=express.Router()

route.post("/v3/api/company/review",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.create(req,res,next));
route.put("/v3/api/company/update/review",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.updateComment(req,res,next))
route.get("/v3/api/company/review/:id",(req:Request,res:Response,next:NextFunction)=>controller.getReview(req,res,next))
route.put("/v3/api/company/review/delete/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.delteComment(req,res,next))

export default route