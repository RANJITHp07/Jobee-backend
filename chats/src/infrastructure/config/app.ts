import express, { Express } from "express";
import cors from "cors";
import morgan from 'morgan';
import ConvoRoute from "../../infrastructure/route/conversationRoute"
import MessageRoute from "../../infrastructure/route/messageRoute"
import { SocketManager } from "../repository/socketRepository";
import notificationRoute from "../route/notificationRoute"
import { errorMiddleware } from "@job_portal/common";


export const createServer = (): Express => {
  const app: Express = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

//socket.io connection
 const socket=new SocketManager()
 socket.start()

  // Routes
   app.use(ConvoRoute);
   app.use(MessageRoute);
   app.use(notificationRoute);

   app.use(errorMiddleware);

  return app;
};
