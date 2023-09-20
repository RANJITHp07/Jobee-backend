import NotificationRepository from "../infrastructure/repository/notificationRepository";

export class Notificationusecase{
    private notificationrepository: NotificationRepository
    constructor(notificationrepository: NotificationRepository){
        this.notificationrepository = notificationrepository;
    }

    async deleteAllNotifications(key:string){
        try{
             const del=await this.notificationrepository.deleteMany(key)
             return{
                status:200,
                data:del
             }
        }catch(err){
            throw err
        }
    }


    async removeNotificationAtIndex(key:string){
        try{
             const del=await this.notificationrepository.deleteOne(key)
             return{
                status:200,
                data:del
             }
        }catch(err){
            throw err
        }
    }

    async getAllmessages(key:string){
        try{
             const getAll=await this.notificationrepository.getAllNotification(key)
             return{
                status:200,
                data:getAll
             }
        }catch(err){
            throw err
        }
    }

    async createMessages(reciever_id:string , user_id:string,message:string){
        try{
             const getAll=await this.notificationrepository.create(reciever_id ,user_id,message)
             return{
                status:200,
                data:getAll
             }
        }catch(err){
            throw err
        }
    }
}