import Userusecase from "../../usecase/userusecase";
import UserModel from "../model/users";
import Listener from "../repository/listenrepository";
import UserRepository from "../repository/userRepository";


const model=new UserModel();
const repository = new UserRepository(model);
const listener=new Listener()
const usecase=new Userusecase(repository,listener);

export const Rabbitmqcreate=async()=>{
    try{
        await usecase.create()
    }catch(err){
        throw err
    }
}

export const Rabbitmqupadte=async()=>{
    try{
        await usecase.update()
    }catch(err){
        throw err
    }
}