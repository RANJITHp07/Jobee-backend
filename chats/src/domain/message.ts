interface Message{
    conversationId:string,
    sender:string,
    text:{
        type:string,
        text:string
    }
}

export default Message