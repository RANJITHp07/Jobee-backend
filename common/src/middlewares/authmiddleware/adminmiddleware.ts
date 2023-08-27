import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends ExpressRequest {
  user?: any;
}

export const adminverify = async ( req: RequestWithUser, res: Response,next: NextFunction): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization;
    const key=process.env.JWT_KEY
    console.log(key)
    if (token && key) {
      const decode: any = jwt.verify(token, process.env.JWT_KEY as string);

      if (decode) {
        req.user = decode;
        if(req.user?.admin){
            next()
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};


