import User from "../../domain/user"
import UserModel from "../model/userModel"
import StripeRepository from "./stripeRepository"


class UserRepository{
    
    constructor(UserModel:any){}


    async save(User:{_id:string,username:string,email:string,stripeCustomerId:string}){
        try{
            
           const user=await UserModel.create(User)
           return user
        }catch(err){
            throw err
        }
    }

    async getUser(id:string){
        try{
             const user=await UserModel.findOne({_id:id})
             return user
        }catch(err){
            throw err
        }
    }

    async updateUser(email:string,update:any){
        try{
            const user=await UserModel.findOneAndUpdate({email:email},{$set:update},{new:true})
            return user
       }catch(err){
           throw err
       }
    }
    

}


export default UserRepository