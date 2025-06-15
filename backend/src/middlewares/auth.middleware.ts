import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, User } from '../types/auth';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: '无效的认证令牌格式' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
      (req as AuthRequest).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: '无效或过期的认证令牌' });
    }
  } catch (error) {
    return res.status(500).json({ message: '认证过程发生错误' });
  }
}; 