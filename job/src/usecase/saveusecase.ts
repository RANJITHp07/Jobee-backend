import SaveRepository from "../infrastructure/repository/saveRepository";

class SaveUsecase{
    private saverepository:SaveRepository
    constructor(saverepository:SaveRepository){
        this.saverepository = saverepository;
    }

    async create(id:string,jobId:string){
        try{
             const saved=await this.saverepository.findsaved(id);
             
             if(saved){
                const updateSaved=await this.saverepository.update(id,jobId)
                return {
                    status:200,
                    data:updateSaved
                }
             }else{
                const saved=await this.saverepository.save({_id:id,saved:[jobId]})
                return {
                    status:200,
                    data:saved
                }
             }
        }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }

    async findSaved(id:string){
          try{
              const saved=await this.saverepository.findsaved(id)
              return {
                status:200,
                data:saved
              }
          }catch(err){
            console.log(err)
            return {
                status:400,
                data:err
            }
        }
    }
}

export default SaveUsecase