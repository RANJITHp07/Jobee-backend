import ICompanyRepository from "../../usecase/interface/companyRepository";
import AuthModel from "../model/authmodel";
import {CompanyModel,ICompany} from "../model/companyModel";
import { UpdateQuery } from 'mongoose';

class companyRepository implements ICompanyRepository{


    // to create an new company
    async save(company:any): Promise<unknown> {
        try{
            await CompanyModel.create(company)
            
            return company
         }catch(err){
            console.log(err)
           return err
    }}


    //to update the details of the company
    async findByIdAndUpdate(id: string,update: UpdateQuery<ICompany>): Promise<unknown> {
        try{
            
           const company=await CompanyModel.findByIdAndUpdate(id,{$set:update}, { new: true })
            return company
        }catch(err){
            return err
        }
    }
    
    //to get any company details using company id
    async findById(id: string): Promise<unknown> {
        try{
            const company=await CompanyModel.findOne({companyId:id}).populate('companyId','-password')
          
            return company
        }catch(err){
            return err
        }
    }

    async findBysearch(name:string){
        try{
              const company=await AuthModel.find({username:{$regex:name}})
              let ids=company.map((company:any)=>company._id);
              const companies=await CompanyModel.find({companyId:{$in:ids}}).populate('companyId','-password')
              return companies
        }catch(err){
            return err
        }
    }
    

    async find(){
        try{
            const company=await CompanyModel.find().populate('companyId','-password')
            return company
        }catch(err){
            return err
        }
    }

    
}

export default companyRepository