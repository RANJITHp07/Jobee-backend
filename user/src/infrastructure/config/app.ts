import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "../routes/userRoute"
import jobRouter from "../routes/jobRoute"
import dotenv from 'dotenv'
import { errorMiddleware } from "@job_portal/common";

export const createServer = () => {
  
    // Config
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.static('src/public'))


    // Routes
    app.use(userRouter)
    app.use(jobRouter)

    // Error handling middleware
    app.use(errorMiddleware)
    return app;
  
};
