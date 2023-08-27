import companyRepository from "../infrastructure/repository/companyRepository";
import Publisher from "../infrastructure/repository/publishrepository";


class Comapnyusecase{
    private companyRepository:companyRepository
    private publish:Publisher
    constructor(companyRepository:companyRepository, publish:Publisher){
        this.companyRepository=companyRepository
        this.publish=publish
      
    }

    // to save the details of the company
    async save(company:any){
        try{
            await this.companyRepository.save(company)
            const existingUser:any=await this.getCompany(company.companyId)
           const data={
            _id:company.companyId,
            companyusername:existingUser.data.companyId.username,
            email:existingUser.data.companyId.email,
            companyType:existingUser.data.companyType || '',
            logo:existingUser.data.logo || '',
            location:existingUser.data.location || ''
        }
        await this.publish.publish('exchange3',"Company",data)
            return {
                status:200,
                data:"Saved sucessfully"
            }
          }catch(err){
            console.log(err)
                return {
                    status:400,
                    data:err
                }
          }
    }

    //to get the company using the document _id
    async getCompany(id:string){
        try{
            const company=await this.companyRepository.findById(id)
            return {
                status:200,
                data: company
            }
          }catch(err){
                return {
                    status:400,
                    data:err
                }
          }
    }

    async getAllcompany(){
        try{
            const company=await this.companyRepository.find()
            return {
                status:200,
                data: company
            }
          }catch(err){
                return {
                    status:400,
                    data:err
                }
          }
    }

    //to update the company details
    async companyUpdate(id:string,update:any){
        try{
            const company:any=await this.companyRepository.findByIdAndUpdate(id,update)
        
             const data={
                _id:company.companyId,
                update: update
            }
            await this.publish.publish('exchange4',"UpdateCompany",data)
            return {
                status:200,
                data: "Successfully Updated"
            }
          }catch(err){
                return {
                    status:400,
                    data:err
                }
          }
    }

    async searchCompanies(name:string){
        try{
            const comapnies=await this.companyRepository.findBysearch(name)
            return {
                status:200,
                data:comapnies
            }
        }catch(err){
            throw err
        }
    }

}

export default Comapnyusecase