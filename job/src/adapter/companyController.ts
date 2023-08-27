import { Request,Response,NextFunction } from "express";
import Listener from "../infrastructure/repository/listenrepository";
import Companyusecase from "../usecase/companyusecase";

class Companycontroller{
    private companyusecase:Companyusecase
    private listener:Listener

    constructor(companyusecase:Companyusecase,listener:Listener){
        this.companyusecase=companyusecase
        this.listener=listener
    }

   // to save the company details
    async save(){
        try{
            await this.listener.listen('exchange3',"Company",async (data)=>{
               await this.companyusecase.save(data)
               

            })
        }catch(err){
            console.log(err)
        }
    }

    // to update the company details
    async update(){
        try{
            await this.listener.listen('exchange4',"UpdateCompany",async (data)=>{
                console.log(data.update)
               const result=await this.companyusecase.update(data._id,data.update)
               

            })
        }catch(err){
            console.log(err)
        }
    }

    // to update the rating
    async updateRating(){
        try{
            await this.listener.listen("exchange5","Rating",async (data)=>{
               
               const result=await this.companyusecase.update(data.id,{rating:data.totalrating})
               

            })
        }catch(err){
            console.log(err)
        }
    }

    async filter(req:Request,res:Response,next:NextFunction){
        try{
            const queryParams:any = req.query;
            const filter=await this.companyusecase.filter(queryParams);
            res.status(filter.status).json(filter.data);
        }catch(err){
           next(err)
        }
    }

    async find(req:Request,res:Response,next:NextFunction){
        try{
          const companies=await this.companyusecase.find()
          res.status(companies.status).json(companies.data)
        }catch(err){
            next(err)
        }
    }
}

export default Companycontroller