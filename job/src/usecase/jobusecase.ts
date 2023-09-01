import Job from "../domain/job"
import JobRepository from "../infrastructure/repository/jobrepository"
import Listener from "../infrastructure/repository/listenrepository"
import Publisher from "../infrastructure/repository/publishrepository"
import Query from "./interface/query"


class Jobusecase{
     
    private jobRepository:JobRepository
    private listen:Listener;
    private publish:Publisher

    constructor(jobRepository:JobRepository,listen:Listener,publish:Publisher){
        this.jobRepository=jobRepository
        this.listen=listen,
        this.publish=publish
        this.findappliedJobs()
    }

    async save(job:Job){
        try{
            console.log("changes")
            const Job= await this.jobRepository.save(job)
            return {
                status:200,
                data:Job
            }
        }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

    async findById(id:string){
        try{
            const job=await this.jobRepository.findById(id)
            return {
                status:200,
                data:job
            }
        }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

    async search(search:string){
         try{
            const serachResult=await this.jobRepository.search(search)
            return {
                status:200,
                data:serachResult
            }
         }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

    async  filter(filter:any){
        try{

            const Filter=await this.jobRepository.filter(filter)
            return {
                status:200,
                data: Filter
            }

        }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

    async finJobs(arg:string){
        try{
            
            const jobs=await this.jobRepository.findJobs(arg)
            return{
                status:200,
                data:jobs
            }

        }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

    async companyJobs(id:string){
        try{
            const jobs=await this.jobRepository.companyJobs(id)
            return{
                status:200,
                data:jobs
            }
        }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
    }

async findSavedJobs(id:string[]){
    try{
       const savedJobs=await this.jobRepository.findsavedJobs(id)
       return savedJobs
    }catch(err){
            console.log(err)
           return {
                status:400,
                data:err
            }
        }
}





async findByAndDelete(id:string){ 
      try{
         const deleteJob=await this.jobRepository.findByIdAndDelete(id)
         return {
            status:200,
        data:deleteJob
         }
      }catch(err){
       throw err
    }
}

async findByAndUpdate(id:string,update:any){ 
    try{
       const updateJob=await this.jobRepository.findByIdAndUpdate(id,update)
       return {
          status:200,
      data:updateJob
       }
    }catch(err){
     throw err
  }
}

async findappliedJobs(){
    try{
        this.listen.listen("exchange6","AppliedJobs",async(data)=>{
            const user=await this.jobRepository.find(data.ids)
             this.publish.publish("exchange7","Jobs",{user})
        })
    }catch(err){
     throw err
  }
}

async getLocations(){
    try{
        const locations=await this.jobRepository.getUniqueLocations()
        return {
            status:200,
            data:locations
        }
    }catch(err){
        throw err
    }
}


async getRoles(){
    try{
        const roles=await this.jobRepository.getJobroles()
        return {
            status:200,
            data:roles
        }
    }catch(err){
        throw err
    }
}

async findSimilarJobs(role:string,location:string,skills:string[]){
   try{
      const similarJobs=await this.jobRepository.findSimilar(role,location,skills)
      return {
        status:200,
        data:similarJobs
      }
   }catch(err){
    throw err
   }
}

async findSearch(role:string,location:string){
    try{
        const search=await this.jobRepository.findSearch(role,location)
        return {
            status:200,
            data:search
          }
    }catch(err){
        throw err
    }
}

}

export default Jobusecase
