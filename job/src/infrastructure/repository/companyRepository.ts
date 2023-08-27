import Company from "../../domain/company";
import ICompanyRepository from "../../usecase/interface/companyRepository";
import { CompanyModel } from "../model/companyModel";

class companyRepository implements ICompanyRepository{

  constructor(private CompanyModel: any) {}


    async save(company: any): Promise<unknown> {
        try {
          
          const newUser = await this.CompanyModel.create(company);
          return newUser;
        } catch (err) {
          return err;
        }
      }

      async findById(id: string): Promise<unknown> {
          try{
             const user=await this.CompanyModel.findOne({_id:id})
             return user
          }catch(err){
            return err
          }
      } 

      async findByIdAndUpdate(id: string, update:any): Promise<unknown> {
        try{
          console.log(id,update)
          const user=await this.CompanyModel.findByIdAndUpdate(id,{$set:update})
          return user
       }catch(err){
         return err
       }
      }

      async filter(query:any): Promise<unknown>{ 
        try{
          let {
           
            location,
            companyType,
            rating
          } = query;
   
          
          let filters=[];

          if (location && location.length > 0) {
            const locationFilter = location.map((l: any) => ({
              location: {
                $regex: new RegExp(l, 'i')
              }
            }));
            filters.push({ $or: locationFilter }); 
            console.log(locationFilter);
          }
          

          if (companyType &&companyType.length > 0) {
            filters.push({ companyType: { $in:companyType} });
          }
           console
          if (rating && rating.length > 0) {
            const ratingFilters =rating.map((range:string) => ({
              rating:  {
                $gte: parseInt(range)-1,
                $lte: parseInt(range)
              }
            }));
            
           filters.push( {$or:ratingFilters})
            
           
        }

        const queryResult = await CompanyModel.find({
          $and: filters.length > 0 ? filters : [{}]
        })
           console.log('queryResult'+queryResult)
        return queryResult
      
      }catch(err){
          throw err
        }
      }
      

      async find(){
        try{
              const companies=await CompanyModel.find().sort({rating:-1})
              return companies
        }catch(err){
          throw err
        }
      }


}

export default companyRepository