import { Request as ExpressRequest, Response, NextFunction } from 'express';
interface RequestWithUser extends ExpressRequest {
    user?: any;
}
export declare const adminverify: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export {};
