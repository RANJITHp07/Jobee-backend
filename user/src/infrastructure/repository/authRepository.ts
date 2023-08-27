import Auth from "../../domain/auth";
import AuthModel from "../model/authmodel";
import IAuthRepository from "../../usecase/interface/authRepository";

class AuthRepository implements IAuthRepository {
  constructor(authmodel:any){}

    //to create an auth of an user
    async save(auth:Auth):Promise<unknown>{
      try{
          const user=await AuthModel.create(auth)
          return user
      }catch(err){
        throw err
      }
    }


    //update the auth of the user 
    async update(email: string, update: any): Promise<unknown> {
        try{
           const id=await AuthModel.findOne({email:email})
           const userUpdate=await AuthModel.findByIdAndUpdate(id,{$set:update},{new:true})
           return userUpdate
        }catch(err){
        throw err
      }
    }

}

export default AuthRepository