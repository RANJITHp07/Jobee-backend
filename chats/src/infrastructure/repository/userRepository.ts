import User from "../../domain/user"
import UserModel from "../model/users"

class UserRepository{
    constructor(UserModel:any){}

    async create(user:User):Promise<unknown>{
        try{
            const newUser=await UserModel.create(user);
            return newUser
        }catch(err){
            throw err
        }
    }

    async update(email:string,update:any):Promise<unknown>{
        try{
            const updateUser=await UserModel.findOneAndUpdate({email:email},{$set:update})
            return updateUser
        }catch(err){
            throw err
        }
    }
}

export default UserRepository