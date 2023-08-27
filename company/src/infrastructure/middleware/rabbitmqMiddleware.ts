import Authusecase from "../../usecase/authusecase";
import AuthModel from "../model/authmodel";
import AuthRepository from "../repository/authRepository";
import AuthController from "../../adapter/authController";
import Listener from "../repository/listenrepository";

const model=new AuthModel()
const repository = new AuthRepository(model)
const usecase=new Authusecase(repository)
const listener=new Listener()
const controller=new AuthController(usecase)


export const rabbitmqSave=async()=>{
    try{
        await listener.listen("exchange1","User",(data)=>{
            
            if(data.role==="recruiter"){
                console.log('ji')
                controller.create({_id:data._id,username:data.username,email:data.email})
            }
        })
    }catch(err){
        throw err
    }
}

export const rabbitmqUpdate=async()=>{
    try{
        await listener.listen("exchange2","UpdateAuth",async(data)=>{
           
            controller.update(data.email,data.update)
        
        })
    }catch(err){
        throw err
    }
}