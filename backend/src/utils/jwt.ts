import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { config } from '../config';

export const generateToken = (user: IUser, isRefreshToken = false): string => {
  const payload = {
    id: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin,
    isEnterprise: user.isEnterprise,
  };

  if (isRefreshToken) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key', { expiresIn: '7d' });
  } else {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
  }
};

export const verifyToken = (token: string, isRefreshToken = false): any | null => {
  try {
    const secret = isRefreshToken ? (process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key') : config.jwtSecret;
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}; 