import express, { Express } from "express";
import cors from "cors";
import http from 'http';
import morgan from 'morgan';
import ConvoRoute from "../../infrastructure/route/conversationRoute"
import MessageRoute from "../../infrastructure/route/messageRoute"
import { SocketManager } from "../repository/socketRepository";
import notificationRoute from "../route/notificationRoute"
import { errorMiddleware } from "@job_portal/common";


  const app: Express = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  const httpServer = http.createServer(app);
//socket.io connection
 const socket=new SocketManager(httpServer)
//  socket.start()

  // Routes
   app.use(ConvoRoute);
   app.use(MessageRoute);
   app.use(notificationRoute);

   app.use(errorMiddleware);

  export {httpServer}

