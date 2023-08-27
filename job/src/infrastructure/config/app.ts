import express from "express";
import cors from "cors";
import morgan from 'morgan'
import jobRoute from "../route/jobRoute"
import saveRoute from "../route/saveRoute"
import {errorMiddleware} from "@job_portal/common"
import companyRoute from "../route/companiesRoute"

export const createServer=()=>{
  
        const app=express();

        //config
        app.use(express.json());
        app.use(cors());
        app.use(morgan("dev"));
        
        //Route
        app.use(jobRoute)
        app.use(saveRoute);
        app.use(companyRoute)

        //error middleware
        app.use(errorMiddleware)
      
        return app


}