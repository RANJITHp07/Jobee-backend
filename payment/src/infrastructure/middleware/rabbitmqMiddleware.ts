import UserModel from "../model/userModel";
import UserRepository from "../repository/userRepository";
import Userusecase from "../../usecase/userusecase";
import UserController from "../../adapter/userController";
import Listener from "../repository/listenrepository";
import StripeRepository from "../repository/stripeRepository";


const model=new UserModel();
const stripe=new StripeRepository();
const repository = new UserRepository(model);
const listener=new Listener()
const usecase=new Userusecase(repository,listener,stripe);
const controller = new UserController(usecase)


export const saveRabbitmq=async ()=>{
    try{
        await controller.save()
            }
    catch(err){
        throw err
    }
}



export const updateRabbitmq=async ()=>{
    try{
         await controller.update()
            }
    catch(err){
        throw err
    }
}

