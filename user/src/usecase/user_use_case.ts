import Publisher from "../infrastructure/repository/publishrepository";
import UserRepository from "../infrastructure/repository/userRepository";


class Userusecase{
     private userRepository:UserRepository
     private publish:Publisher


     constructor(userRepository:UserRepository,publish:Publisher){
         this.userRepository=userRepository
         this.publish=publish;

     }

    async  getUser(id:string){
        try{
              const user=await this.userRepository.findById(id)
              return {
                status:200,
                data:user
            }
        }catch(err){
            return {
                status:400,
                data:err
            }
     }
   }

   async  getAlluser(){
    try{
          const user=await this.userRepository.find()
          return {
            status:200,
            data:user
        }
    }catch(err){
        return {
            status:400,
            data:err
        }
 }
}

   async save(user:any){
      try{
        const User=await this.userRepository.findById(user.userId)
        
        if(User!==null){
            return {
                status:200,
                data:User
            }
        }

        await this.userRepository.save(user)
    
        return {
            status:200,
            data:"Saved sucessfully"
        }
      }catch(err){
            return {
                status:400,
                data:err
            }
      }
  }

  async userUpdate(id:string,update:any){
    try{
        const profile=await this.userRepository.findByIdAndUpdate(id,update)
        return {
            status:200,
            data:profile
        }
      }catch(err){
            return {
                status:400,
                data:err
            }
      }  
  }

  async upload(id:string,file:string){
    try{
        const user=await this.userRepository.findByIdAndUpdate(id,{
            photo:file
        })
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

  async uploadResume(id:string,file:any){
    try{
        const user=await this.userRepository.findByIdAndUpdate(id,{
            resume:file
        })
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

}

export default Userusecase