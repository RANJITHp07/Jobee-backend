import User from "../domain/user";
import Listener from "../infrastructure/repository/listenrepository";
import UserRepository from "../infrastructure/repository/userRepository";

class Userusecase {

    private userrepository:UserRepository
    private listener:Listener;
    constructor(userrepository:UserRepository,listener:Listener) {
        this.userrepository = userrepository;
        this.listener=listener;
    }

    async create(){
        try{ 
            this.listener.listen("exchange1","User",async(data)=>{
                const newuser=await this.userrepository.create({_id:data._id,username:data.username,email:data.email});
               
            })
            
        }catch(err){
            throw err
        }
    }

    async update(){
        try{ 
            this.listener.listen("exchange2","UpdateAuth",async(data)=>{
                const newuser=await this.userrepository.update(data.email,data.update)
              
            })
            
        }catch(err){
            throw err
        }
    }
}

export default Userusecase;