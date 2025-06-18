import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  isEnterprise: boolean;
}

export interface AuthRequest extends Request {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
} 