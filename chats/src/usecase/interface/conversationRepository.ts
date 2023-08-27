interface IConversationRepository{
    create(recieveId:string,senderId:string):Promise<unknown>
    getConvo(id:string):Promise<unknown>
    update(id:string,update:any):Promise<unknown>
}

export default IConversationRepository