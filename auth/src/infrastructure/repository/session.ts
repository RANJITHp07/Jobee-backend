import session, { SessionOptions } from 'express-session';
import { Request, Response, NextFunction } from 'express';

interface SessionData {
  user: string;
}

class Session{
  private sessionOptions: SessionOptions;

  constructor() {
    this.sessionOptions = {
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
    };
  }

  sessionSetup(req: Request, data: any):string {
    session(this.sessionOptions)(req, {} as any, () => {});
    const sessionData = req.session as unknown as SessionData;
    sessionData.user = data;

    return sessionData.user;
  }
}

export default Session;
