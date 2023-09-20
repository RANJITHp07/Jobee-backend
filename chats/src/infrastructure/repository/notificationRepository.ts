import NotificationModel from "../model/notification";

class NotificationRepository{
    
  async create(reciever_id:string,user_id:string,message:string){
    await NotificationModel.create({reciever_id,user_id,message})
    return "Created"
  }

  async deleteOne(id:string){
    await NotificationModel.findByIdAndDelete(id)
  }

  async deleteMany(user_id:string){
    await NotificationModel.deleteMany({reciever_id:user_id})
  }

  async getAllNotification(user_id:string){
    const notification = await NotificationModel.find({reciever_id:user_id}).populate('user_id')
     return notification
  }
}

export default NotificationRepository