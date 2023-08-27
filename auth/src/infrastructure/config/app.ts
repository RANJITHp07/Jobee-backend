import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "../routes/authRoute"
import session, { SessionOptions } from 'express-session';
import AdminRoute from "../routes/adminRoute"
import { errorMiddleware } from "@job_portal/common";

export const createServer = () => {
  
    // Config
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
   


    const sessionOptions: SessionOptions = {
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, 
        maxAge: 3600000, 
      },
    };

    app.use(session(sessionOptions));

    // Routes
    app.use(authRouter);
    app.use(AdminRoute);

   
    app.all('*', async (req:Request, res:Response) => {
      throw new Error("No such Route");
    });
    

    // Error handling middleware
    app.use(errorMiddleware);

    return app;
  
};
