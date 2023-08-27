import Save from "../../domain/save"
import ISaveRepository from "../../usecase/interface/saveRepository";
import { CompanyModel } from "../model/companyModel";
import SaveModel from "../model/saveModel"

class SaveRepository implements ISaveRepository{
    constructor(saveModel:any){}

    async save(save:Save):Promise<unknown>{
        try{ 
           const Save=await SaveModel.create(save);
           return "Added to save list"
        }catch(err){
            throw err
        }
    }

    async update(id:string,jobId:string):Promise<unknown>{
        try{
            const save=await SaveModel.findOne({_id:id});
            if(save?.saved?.includes(jobId)){
                 await SaveModel.findByIdAndUpdate(id,{$pull:{saved:jobId}},{new:true})
                 return "Removed from the save list"
            }else{
                await SaveModel.findByIdAndUpdate(id,{$addToSet:{saved:jobId}},{new:true})
                return "Added to the save list"
            }
           
        }catch(err){
            throw err
        }
    }

    async findsaved(id:string):Promise<unknown>{
        try{
            let saved=await SaveModel.findOne({_id:id}).populate('saved');
            if(saved){
                let savedPosts=await CompanyModel.populate(saved,{
                   path:'saved.company'
                })
                return savedPosts
              }
             return saved
        }catch(err){
            console.log(err)
           throw err
        }
    }
}

export default SaveRepository