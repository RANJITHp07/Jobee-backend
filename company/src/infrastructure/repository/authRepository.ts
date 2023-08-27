import Auth from "../../domain/auth";
import IAuthRepository from "../../usecase/interface/interface/authRepository";
import AuthModel from "../model/authmodel";

class AuthRepository implements IAuthRepository{
  constructor(authmodel:any){}

    // to save the auth of users
    async save(auth:Auth):Promise<unknown>{
      try{
          const user=await AuthModel.create(auth)
       
          return user
      }catch(err){
        throw err
      }
    }

   // to update the auth details
    async update(email: string, update: any): Promise<unknown> {
        try{
         
           const userUpdate=await AuthModel.findOneAndUpdate({email:email},{$set:update},{new:true})
           return userUpdate
        }catch(err){
        throw err
      }
    }

    

}

export default AuthRepository