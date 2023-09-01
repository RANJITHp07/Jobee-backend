import MessageRepository from "../infrastructure/repository/messageRepository"
import ConversationRepository from "../infrastructure/repository/conversationRepository";
import Message from "../domain/message";

class Messageusecase{

    private messagerepository:MessageRepository;
    private conversationrepository:ConversationRepository;

    constructor(messagerepository:MessageRepository, conversationrepository:ConversationRepository){
        this.messagerepository = messagerepository;
        this.conversationrepository = conversationrepository;
    }

    async create(message:Message){
        try{
          
            await this.conversationrepository.update(message.conversationId,{latestMessage:message.text.text});
            const newMessage=await this.messagerepository.create(message)
           
            return {
                status:200,
                data:newMessage
            }
        }catch(err){
            throw err
        }
    }

    async getConvo(id:string){
        try{
            const convo=await this.messagerepository.getConversation(id);
            return {
             status:200,
             data:convo
            }
        }catch(err){
            throw err
        }
    }
}
export default Messageusecase