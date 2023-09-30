import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";
import ConversationModel from "../model/conversation";
import NotificationRepository from "./notificationRepository";

interface User {
  userId: string;
  socketId: string;
}

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private users: User[] = [];

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin: "https://jobee-eosin.vercel.app"
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    console.log("a user connected.");
     
    socket.on("addUser", (userId: string) => {
      this.addUser(userId, socket.id);
     
      this.io.emit("getUsers", this.users);
    });

    socket.on("sendMessage", async({ senderId, receiverId, text }: { senderId: string; receiverId: string; text: string }) => {
       
      const user = this.getUser(receiverId);
     
      
      if (user) {
         console.log(user)
        this.io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
        await ConversationModel.findByIdAndUpdate(senderId, { $set:{lastestMessage:text}},{new:true});
      }else {
        await ConversationModel.findByIdAndUpdate(senderId, { $set:{lastestMessage:text}},{new:true});
        const notification=new NotificationRepository()
        await notification.create(receiverId,senderId,text)

      }
    });

    socket.on("vedio-calling",({ senderId, receiverId, text }: { senderId: string; receiverId: string; text: number })=>{
      const user = this.getUser(receiverId);
      
      if(user){
          this.io.to(user.socketId).emit("vedio-answer",{
            senderId,
            text:text
          })
      }
    })

    socket.on("typing-started",({ senderId, receiverId }: { senderId: string; receiverId: string;})=>{
        const user = this.getUser(receiverId);
        if(user){
            this.io.to(user.socketId).emit("typing-started-from-server")
        }
        
    })

    socket.on("typing-stoped",({ senderId, receiverId }: { senderId: string; receiverId: string;})=>{
        const user = this.getUser(receiverId);
        if(user){
            this.io.to(user.socketId).emit("typing-stoped-from-server")
        }
        
    })

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      this.removeUser(socket.id);
      this.io.emit("getUsers", this.users);
    });
  };

  private addUser(userId: string, socketId: string): void {
    if (!this.users.some((user) => user.userId === userId)) {
      this.users.push({ userId, socketId });
    }
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): User | undefined {
    return this.users.find((user) => user.userId === userId);
  }

  start = (): void => {
    this.httpServer.listen(3000, () => {
      console.log("Socket server listening on port 6005");
    });
  };
}
