import { Request as ExpressRequest, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';


dotenv.config()

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

export const signinverify = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization;
    const key=process.env.JWT_KEY
    console.log(key)
    if (token) {
      const decode: any = jwt.verify(token, key as string);

      if (decode) {
        req.user = decode;
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};


