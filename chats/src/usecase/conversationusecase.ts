import ConversationRepository from "../infrastructure/repository/conversationRepository";

class Conversationusecase{
    private conversationrepository:ConversationRepository
    constructor(conversationrepository:ConversationRepository){
        this.conversationrepository = conversationrepository; 
    }

    async create(recieveId:string,senderId:string){
        try{
            const convoExist=await this.conversationrepository.find(recieveId,senderId);
            if(convoExist){
                return {
                    status:200,
                    data:"Already Exist"
                }
            }
            const convo=await this.conversationrepository.create(recieveId,senderId);
            return {
                status:200,
                data:convo
            }
        }catch(err){
            throw err
        }
    }

    async getConvo(id:string){
        try{
           const convo=await this.conversationrepository.getConvo(id)
           return{
             status:200,
             data:convo
           }
        }catch(err){
            console.log(err)
            throw err
        }
    }

    async updateConvo(id:string,update:any){
        try{
            const convo=await this.conversationrepository.update(id,update)
            return{
              status:200,
              data:convo
            }
        }catch(err){
            console.log(err)
            throw err
        }
    }
}

export default Conversationusecase