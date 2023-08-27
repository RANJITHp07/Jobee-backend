import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import CompanyRoute from "../route/companyRoute"
import ReviewRoute from "../route/reviewRoute"
import {errorMiddleware} from "@job_portal/common"



export const createServer = () => {
  
    // Config
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
   

    // Routes
   app.use(CompanyRoute);
   app.use(ReviewRoute)

    // Error handling middleware
    app.use(errorMiddleware)

    return app;
  
};
