import { Request, Response, NextFunction } from "express";

export const errorMiddleware = async(
  err: Error,
  req:Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  console.error("Error occurred:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
};


