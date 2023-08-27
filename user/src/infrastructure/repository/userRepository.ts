
import {IUser,UserModel} from "../model/userModel";
import { UpdateQuery } from 'mongoose';


class UserRepository{

   
   
   constructor(){
      
   }
       async save(user:any): Promise<unknown> {
          try{
             await UserModel.create(user)
             return "Profile is saved"
          }catch(err){
            return err
      }
       }


       async findById(id: string): Promise<unknown> {
           try{
            const user=await UserModel.findOne({userId:id}).populate('userId','-password');
           
            if(user){
             
               return user
            }else{
               return null
            }
           }catch(err){
                 return err
           }
       }

       async find(): Promise<unknown> {
         try{
          const user=await UserModel.find().populate('userId','-password');
          if(user){
             return user
          }else{
             return  null
          }
         }catch(err){
               return err
         }
     }

       async findByEmail(email: string): Promise<unknown> {
         try{
            const user=await UserModel.findOne({email:email});
            if(user){
               return user
            }else{
               throw new Error("No such User")
            }
           }catch(err){
                 return err
           }
       }

       async findByIdAndUpdate(id: string,update: UpdateQuery<IUser>): Promise<unknown> {
           try{
           
            const user = await UserModel.findOneAndUpdate({userId:id},{$set:update}, { new: true });
           
             if(user){
                return "User profile updated"
             }else{
                 throw new Error("Not updated")
             }
           }catch(err){
            console.log(err)
            return err
      }
       }

}

export default UserRepository