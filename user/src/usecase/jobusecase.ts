import JobRepository from "../infrastructure/repository/jobRepository";
import Listener from "../infrastructure/repository/listenrepository";
import Publisher from "../infrastructure/repository/publishrepository";
import UserRepository from "../infrastructure/repository/userRepository";

class Jobusecase{
    private jobRepository:JobRepository;
    private userRepository:UserRepository;
    private publish:Publisher
    private listen:Listener

    constructor(jobRepository:JobRepository,userRepository:UserRepository,publish:Publisher,listen:Listener){
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.publish=publish;
        this.listen=listen;
    }

    async jobApplied(id:string,userId:string){
        console.log("changes")
        try{
            const user=await this.jobRepository.getUsers(id)
          
            const existinguser:any=await this.userRepository.findById(userId);
            if(!user){
               
                const user=await this.jobRepository.save({_id:id,applications:[{_id:existinguser._id,status:"No status",viewed:false,shortlisted:false}]})
                return {
                    status:200,
                    data:user
                }
            }else{
            
                const updateUser=await this.jobRepository.update(id,existinguser._id);
                return {
                    status:200,
                    data:updateUser
                }
            }
        }catch(err){
            console.log(err)
            return {
                status:404,
                data:err
            }
        }
    }

    async getUser(id:string){
         try{
            
            const users=await this.jobRepository.getUsers(id);
            return {
                status:200,
                data:users
            }
         }catch(err){
            return {
                status:404,
                data:err
            }
        }
    }

    async updateStatus(id:string,userId:string,status:string){
        try{
            const existinguser:any=await this.userRepository.findById(userId);
           const user=await this.jobRepository.updatestatus(id,existinguser._id,status);
           return {
            status:200,
            data:user
           }
        }catch(err){
            return {
                status:404,
                data:err
            }
        }
    }

    async shortlist(id:string,userId:string[]){
        try{
            
           const user=await this.jobRepository.shorlist(id,userId);
           return {
            status:200,
            data:user
           }
        }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }


    async unshortlist(id:string,userId:string){
        try{
            
           const user=await this.jobRepository.unshortlist(id,userId);
           return {
            status:200,
            data:user
           }
        }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }

    async findShortlist(id:string){
        try{
              const shortliseted=await this.jobRepository.findshortlisted(id)
              return {
                  status:200,
                  data:shortliseted
              }
        }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }

    async filter(id:string,status:string[]){
        try{
              
              const filter=await this.jobRepository.filter(id,status)
              
              return {
                  status:200,
                  data:filter
              }
        }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }

    async findUser(id: string) {
        try {
          const users:any= await this.jobRepository.findUser(id);
          
          const ids = users.map((id: any) => id._id);
      
          await this.publish.publish("exchange6", "AppliedJobs", { ids: ids });
      
          const company = await new Promise((resolve) => {
            this.listen.listen("exchange7", "Jobs", (data) => {
              const mergedData ={jobs:data.user,detail:users}
            
              resolve(mergedData);
            });
          });
      
          return {
            status: 200,
            data: company,
          };
        } catch (err) {
          console.log(err);
          return {
            status: 400,
            data: err,
          };
        }
      }

      async userExist(id:string,userId:string){
        try{
            const user:any=await this.userRepository.findById(userId)
            const userExist=await this.jobRepository.userExist(id,user._id)
            return {
                status:200,
                data:userExist
            }
        }catch(err){
            throw err
        }
      }

      async countJobapplication(id:string){
        try{
            const count=await this.jobRepository.countJobapplication(id)
            return {
                status:200,
                data:count
            }
        }catch(err){
            throw err
        }
      }
      
}

export default Jobusecase