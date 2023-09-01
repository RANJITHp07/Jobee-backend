import User from "../domain/user";
import UserRepository from "../infrastructure/repository/userRepository";
import Listener from "../infrastructure/repository/listenrepository";
import StripeRepository from "../infrastructure/repository/stripeRepository";

class Userusecase{
    private userrepository: UserRepository;
    private listener:Listener
    private stripesession:  StripeRepository

    constructor(userrepository: UserRepository,listener:Listener,stripesession:StripeRepository){
        this.userrepository = userrepository;
        this.listener=listener;
        this.stripesession = stripesession;
    }


    async save(){
        try{
            
            await this.listener.listen("exchange1","User",async(data)=>{
                if(data.role==="recruiter"){
                    const session=await this.stripesession.createSession(data.email)
                const newUser=await this.userrepository.save({_id:data._id,username:data.username,email:data.email,stripeCustomerId:session.id})
                return {
                    status:200,
                    data:newUser
                }
                }
            }
            )
               
            
            
        }catch(err){
            throw err
        }
    }

    async find(id:string){
        try{
            const user=await this.userrepository.getUser(id)
            return {
                status:200,
                data:user
            }
        }catch(err){
            throw err
        }
    }

    async update(){
         try{
             await this.listener.listen("exchange2","UpdateAuth",async(data)=>{
                
                await this.userrepository.updateUser(data.email,data.update);
                return;
             })
         }catch(err){
            throw err
         }
    }
}

export default Userusecase