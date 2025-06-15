import { Request } from 'express';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'instructor';
}

export interface AuthRequest extends Request {
  user: User;
} 