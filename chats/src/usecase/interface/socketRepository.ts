import { Socket } from "socket.io";
import User from "../../domain/user";

interface ISocketRepository{
     handleConnection(socket: Socket): void
    addUser(userId: string, socketId: string): void 
    removeUser(socketId: string): void
    getUser(userId: string): {userId: string;
        socketId: string;} | undefined 
}

export default ISocketRepository;
