import { Request } from 'express';
import { Types } from 'mongoose';
import { IUser } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        isAdmin: boolean;
        isEnterprise: boolean;
      };
    }
  }
}

export interface AuthRequest extends Express.Request {
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
    isEnterprise: boolean;
  };
} 