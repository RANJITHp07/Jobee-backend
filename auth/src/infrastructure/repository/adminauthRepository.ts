import Auth from "../../domain/auth"
import IAdminRepository from "../../use_case/interface/adminRepository";
import AuthModel from "../model/authmodel"
import Redis from "ioredis"

class AdminRepository implements IAdminRepository{
    
    private readonly credintial="qwerty"
    

    //to create an admin with the email username and password
    async signin(admin:Auth):Promise<unknown>{
         try{
        

            if(admin.credentials===this.credintial){ // checking with the credintails
                
                const user=await AuthModel.create(admin);
                return user
            }else{
                return  new Error("Not an admin")
            }
         }catch(err){
            console.log(err)
            throw err
         }
    }

    //to find the user using email and also caching the details of the user in the redis
    async findByemail(email:string):Promise<unknown>{
        try{
           
           
            
            const admin=await AuthModel.findOne({email:email,admin:true});
         
           
            return admin
        }catch(err){
            throw err
         }
    }

    async findById(id:string):Promise<unknown>{
        try{
            const admin=await AuthModel.findOne({_id:id});
            return admin
        }catch(err){
            throw err
         }
    }
}

export default AdminRepository;