import express,{NextFunction, Request,Response} from "express"
import companyRepository from "../repository/companyRepository";
import Comapnyusecase from "../../usecase/comapnyusecase";
import Companycontroller from "../../adapter/companyController";
import Publisher from "../repository/publishrepository";
import {signinverify} from "@job_portal/common"


const repository=new companyRepository();
const publish=new Publisher()
const usecase=new Comapnyusecase(repository,publish);
const controller=new Companycontroller(usecase);


const route=express.Router();

route.post("/v3/api/company",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.save(req,res,next))
route.get("/v3/api/company/search/companies",(req:Request,res:Response,next:NextFunction)=>controller.searchCompany(req,res,next))
route.get("/v3/api/company/:id",(req:Request,res:Response,next:NextFunction)=>controller.getCompany(req,res,next))
route.put("/v3/api/company/:id",signinverify,(req:Request,res:Response,next:NextFunction)=>controller.companyUpdate(req,res,next))
route.get("/v3/api/company/getAll/companies",(req:Request,res:Response,next:NextFunction)=>controller.getAllcompany(req,res,next))

export default route