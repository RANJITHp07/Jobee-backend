import Query from "../usecase/interface/query";
import Jobusecase from "../usecase/jobusecase";
import {Request,Response,NextFunction} from 'express'
   
class Jobcontroller{
    private jobusecase:Jobusecase

    constructor(jobusecase:Jobusecase){
        this.jobusecase=jobusecase
    }

    // to save the job applications of a company
    async save(req:Request,res:Response,next:NextFunction){
        try{
            const job=await this.jobusecase.save(req.body)
            res.status(job.status).json(job.data)
        }catch(err){
            next(err)
        }
    }

    async locations(req:Request,res:Response,next:NextFunction){
        try{
            const locations=await this.jobusecase.getLocations()
        
            res.status(locations.status).json(locations.data)
        }catch(err){
            next(err)
        }
    }

    async findSimilarJobs(req:Request,res:Response,next:NextFunction){
        try{

            const similar=await this.jobusecase.findSimilarJobs(req.body.role,req.body.location,req.body.skills)
            res.status(similar.status).json(similar.data)
        }catch(err){
            next(err)
        }
    }

    //to find the job applicantion of a company
    async findById(req:Request,res:Response,next:NextFunction){
        try{
            const job=await this.jobusecase.findById(req.params.id)
            res.status(job.status).json(job.data)
        }catch(err){
            next(err)
        }
    } 

    // to search a job using role of the job or based on the location
    async search(req:Request,res:Response,next:NextFunction){
        try{
            const job=await this.jobusecase.search(req.body.search)
            res.status(job.status).json(job.data)
        }catch(err){
            next(err)
        }
    } 
    

    //to create a filter for filteration
    async filter(req:Request,res:Response,next:NextFunction){
        try{
           
            const queryParams:any = req.query;
           
            const job=await this.jobusecase.filter(queryParams)
            res.status(job.status).json(job.data)
        }catch(err){
            next(err)
        }
    }

    async findSearch(req:Request,res:Response,next:NextFunction){
        try{
            const queryParams:any = req.query;
            const job=await this.jobusecase.findSearch(queryParams.role,queryParams.location)
            res.status(job.status).json(job.data)
        }catch(err){
            next(err)
        }
    }

    //to find all the unique roles

    async getRoles(req:Request,res:Response,next:NextFunction){
        try{
           const getRoles=await this.jobusecase.getRoles()
           res.status(getRoles.status).json(getRoles.data)
        }catch(err){
            throw err
        }
    }

    // to find out all the job applicantions related to an company
    async companyJob(req:Request,res:Response,next:NextFunction){
        try{
           const jobs=await this.jobusecase.companyJobs(req.params.id)
           res.status(jobs.status).json(jobs.data)
        }catch(err){
            next(err)
        }
    }

    //to find out the jobs based on companyTYpe or mode
    async job(req:Request,res:Response,next:NextFunction){
        try{
            const queryParams:any = req.query;
            
             const jobs=await this.jobusecase.finJobs(queryParams.category)
             res.status(jobs.status).json(jobs.data)
        }catch(err){
            next(err)
        }
    }

    // to find out the savedjobs of an user
    async savedJobs(id:string[]){
        try{
             const jobs=await this.jobusecase.findSavedJobs(id)
             return jobs
        }catch(err){
           console.log(err)
        }
    }

    // to find a job using the  job id
    async find(req:Request,res:Response,next:NextFunction){
        try{
           const jobs=await this.jobusecase.findById(req.params.id);
           res.status(jobs.status).json(jobs.data)
        }catch(err){
            next(err)
         }
    }

    //to delete the job from the jobsModel
    async deleteJob(req:Request,res:Response,next:NextFunction){
        try{
            const deleteJob=await this.jobusecase.findByAndDelete(req.params.id);
            res.status(deleteJob.status).json(deleteJob.data)
        }catch(err){
            next(err)
         }
    }

    //to update the exisiting job application

    async updateJob(req:Request,res:Response,next:NextFunction){
      try{
         const updateJob=await this.jobusecase.findByAndUpdate(req.body.id,req.body.update)
         res.status(updateJob.status).json(updateJob.data)
      }catch(err){
            next(err)
         }
    }

    //to find the mutual skills
    async mutualSkills(req:Request,res:Response,next:NextFunction){
        try{
           const mutualSkills = await this.jobusecase.getMutualskills(req.body.id,req.body.skills)
           res.status(mutualSkills.status).json(mutualSkills.data)
        }catch(err){
              next(err)
           }
      }
}

export default Jobcontroller