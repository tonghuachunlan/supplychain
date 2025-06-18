import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/user.model';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: '未提供认证令牌' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ message: '无效的认证令牌' });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: '用户不存在' });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
      isEnterprise: user.isEnterprise,
    };

    next();
  } catch (error) {
    next(error);
  }
}; 