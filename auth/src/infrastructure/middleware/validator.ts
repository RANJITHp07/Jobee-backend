import { validationResult, check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateMiddleware = [
  check('username').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

export default validateMiddleware;
