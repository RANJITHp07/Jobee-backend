import express from "express";
import cors from "cors";
import morgan from 'morgan'
import PaymentRoute from "../route/paymentRoute"
import {errorMiddleware} from '@job_portal/common'


export const createServer=()=>{

        const app=express();

        //config
        app.use(express.json());
        app.use(cors());
        app.use(morgan("dev"));
        
        //Route
        app.use(PaymentRoute)

        //error middleware
        app.use(errorMiddleware)
      
        return app

    
}