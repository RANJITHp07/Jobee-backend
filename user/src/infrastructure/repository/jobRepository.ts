import Job from "../../domain/job";
import Redis from "ioredis"
import AuthModel from "../model/authmodel";
import JobModel from "../model/jobModel";
import { ObjectId } from "mongodb";
import IJobRepository from "../../usecase/interface/jobRepository";

class JobRepository implements IJobRepository  {

  
     constructor(jobModel:any){
   
     }

     // to save the jobs related to a user
     async save(job: Job): Promise<unknown> {
         try{
            
            const jobAppliedUser=await JobModel.create(job)
            return jobAppliedUser
         }catch(err){
            console.log(err)
            throw err
         }
     }

     async update(id: string, userid: string): Promise<unknown> {
         try{
            const userId = new ObjectId(userid);
            const user = {
              _id: userId,
              status: "No status",
              viewed:false,
              shortlisted:false
            };
            
            const updatedJob = await JobModel.findByIdAndUpdate(id, {
              $push: {
                "applications": user
              }
            }, { new: true });
            
               return updatedJob
         }catch(err){
            console.log(err)
            throw err
         }
     }

     async getUsers(id: string): Promise<unknown> {
         try{
             
             let user=await JobModel.findById(id).populate('applications._id')

             if(user){
               let users=await AuthModel.populate(user,{
                  path:'applications._id.userId'
               })
             
               return users
             }
           
            
         }catch(err){
            throw err
         }
     }

     async updatestatus(id:string,userId:string,status:string):Promise<unknown>{
      try{
         let user
         if(status==="view"){
            user=await JobModel.findOneAndUpdate({_id:id,'applications._id':userId},{$set:{'applications.$.viewed':true}},{new:true})
      

         }
         else{
             user=await JobModel.findOneAndUpdate({_id:id,'applications._id':userId},{$set:{'applications.$.status':status}},{new:true})
            
         }
         return user
      }catch(err){
         throw err
      }
     }

     async shorlist(id:string,userId:string[]):Promise<unknown>{
      try{ 

            const user=await JobModel.findOneAndUpdate({_id:id,'applications._id':{$in:userId}},{$set:{'applications.$.shortlisted':true}},{new:true})
         return user
      }catch(err){
         throw err
      }
     }

     async findshortlisted(id:string):Promise<unknown>{
      try{
         const user=await JobModel.findOne({ _id:id, 'applications.shortlisted': true }).populate('applications._id')
         let u
         if(user){
            u=user.applications.filter((p)=>p.shortlisted===true)
         }
         if(user){
            let users=await AuthModel.populate(u,{
               path: '_id',
        populate: {
          path: 'userId'
        }
            })
            return users
          }
      }catch(err){
         console.log(err)
         throw err
      }
     }

     async filter(id:string,status:string[]):Promise<unknown>{
      try{
           console.log(status)
          const user=await JobModel.findOne({ _id:id, 'applications.status':{$in:status}}).populate('applications._id')
          let selectedusers
          if(user){
           selectedusers=user.applications.filter((p)=>status.includes(p.status))
          }
          if(user){
            let users=await AuthModel.populate(selectedusers,{
               path: '_id',
               populate: {
                 path: 'userId'
               }
            })
            return users 
          }
          return []
      }catch(err){
         console.log(err)
         throw err
      }
     }

     async findUser(id:string):Promise<unknown>{
       try{
           const user=await JobModel.find({'applications._id':id})
            
           const matcheduser= user.map((u)=>{
               const array:any=u.applications.find((p:any)=>p._id.toString()===id)
               
               if(array){
                      return{
                        _id:u._id,
                        status:array.status,
                         viewed:array.viewed,
                         shortlisted:array.shortlisted
                      }
               }
               
           })
           return matcheduser
       }catch(err){
         console.log(err)
         throw err
      }
     }

   async userExist(id:string,userId:string){
      try{
         const userExist:any=await JobModel.findOne({_id:id})
         const uId=userId.toString()
         const exist=userExist.applications.filter((p:any)=>p._id==uId)
         if(exist.length>0){
            return true
         }else{
           return false
         }
      }catch(err){
         throw err
      }
   }
}

export default JobRepository