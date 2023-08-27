import Company from "../domain/company";
import companyRepository from "../infrastructure/repository/companyRepository";


 class Companyusecase{
    private companyRepository:companyRepository


    constructor(companyRepository:companyRepository){
           this.companyRepository=companyRepository

    }

    async save(company:any){
         try{
            const Company=await this.companyRepository.save(company)
            return Company
         }catch(err){
            return err
         }
    }

   async  update(id:string,update:any){
      try{
         const Company=await this.companyRepository.findByIdAndUpdate(id,update)
         return Company
      }catch(err){
         return err
      }
    }

    async filter(query:any){
      try{
           const filter=await this.companyRepository.filter(query);
           return {
            status:200,
            data:filter
           }
      }catch(err){
         throw err
      }
    }

    async find(){
      try{
         const companies=await this.companyRepository.find();
         return {
            status:200,
            data:companies
         }
      }catch(err){
         throw err
      }
    }
 }

 export default Companyusecase
