import NotificationModel from "../model/notification";

class NotificationRepository{
    
  async create(user_id:string,message:string){
    await NotificationModel.create({user_id,message})
    return "Created"
  }

  async deleteOne(id:string){
    await NotificationModel.findByIdAndDelete(id)
  }

  async deleteMany(user_id:string){
    await NotificationModel.deleteMany({user_id:user_id})
  }

  async getAllNotification(user_id:string){
    const notification = await NotificationModel.find({user_id:user_id})
     return notification
  }
}

export default NotificationRepository