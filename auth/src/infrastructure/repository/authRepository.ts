import Auth from "../../domain/auth"
import IAuthRepository from "../../use_case/interface/authRepository"
import AuthModel from "../model/authmodel"



class AuthRepository implements IAuthRepository{
       //created an auth of an user 
        async save(auth: Auth): Promise<unknown> {
            try{
                const user=await AuthModel.findOne({email:auth.email})
                if(user){
                    return "User already exist"
                }else{
                    const newUser=await AuthModel.create(auth)
                    return newUser
                }
            }catch(err){
                console.log(err)
                return err
            }
       }

       //using _id to find an user
       async findById(id: string): Promise<unknown> {
            try{
                    
                    const user=await AuthModel.findOne({_id:id},{password:0})
                    
                     return user
            }catch(err){
                console.log(err)
            }
       }

       //to find an user using the email
       async findByEmail(email: string): Promise<unknown> {
        try{
           
        
            const user=await AuthModel.findOne({email:email})
            return user
        }catch(err){
            console.log(err)
        }
       }

       //to update the details of the user if it exist 
       async findByIdAndUpdate(email:string,update:{email?:string,username?:string,password?:string}): Promise<unknown> {
           try{
                 
  
                 if(update.password){
                    const updateUser=await AuthModel.findOneAndUpdate({email:email},{$set:{password:update.password}},{new:true})
                    return "Updated Password"
                 }else{
                    const updateUser=await AuthModel.findByIdAndUpdate({email:email},{$set:update},{new:true})
                    
                    return "Updated"
                 }
                 
           }catch(err){
            console.log(err)
        }
       }

       //to find all the users based on their role whether they are recruiter or employee
       async find(role:string):Promise<unknown>{
        try{
              console.log(role)
              const user=await AuthModel.find({role:role,admin:false})
              return user
        }catch(err){
            throw err
        }
       }
       
      
}

export default AuthRepository