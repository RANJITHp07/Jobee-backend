import Comapnyusecase from "../usecase/comapnyusecase";
import { Response,Request,NextFunction } from "express";

 class Companycontroller{
    private companyusecase:Comapnyusecase

    constructor(comapnyusecase:Comapnyusecase){
           this.companyusecase=comapnyusecase
    }


    //to save the company details
    async save(req:Request,res:Response,next:NextFunction){
        try{
           const user=await this.companyusecase.save(req.body)
           res.status(user.status).json(user.data)
        }catch(err){
            next(err)
        }
    }

    //to find a company using the document id
    async getCompany(req:Request,res:Response,next:NextFunction){
        try{
            const company=await this.companyusecase.getCompany(req.params.id)
            res.status(company.status).json(company.data)
        }catch(err){
            next(err)
        }
    }

    async getAllcompany(req:Request,res:Response,next:NextFunction){
        try{
            const company=await this.companyusecase.getAllcompany()
            res.status(company.status).json(company.data)
        }catch(err){
            next(err)
        }
    }

    //to update the company details
    async companyUpdate(req:Request,res:Response,next:NextFunction){
        try{
            const company=await this.companyusecase.companyUpdate(req.params.id,req.body) 
            res.status(company.status).json(company.data)
        }catch(err){
            next(err)
        }
    }

    async searchCompany(req:Request,res:Response,next:NextFunction){
        try{
            const query=req.query.search as string
          const companies=await this.companyusecase.searchCompanies(query)
          res.status(companies.status).json(companies.data)
        }catch(err){
            next(err)
        }
    }
 }

 export default Companycontroller