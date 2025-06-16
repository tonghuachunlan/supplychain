import { Request } from 'express';
import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId;
        email: string;
        name: string;
        role: string;
      };
    }
  }
} 