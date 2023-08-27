import Message from "../../domain/message";

interface IMessageRepository{
    create(message:Message):Promise<unknown>
    getConversation(id:string):Promise<unknown>

}

export default IMessageRepository