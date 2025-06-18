import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// 内存存储用户数据（临时方案，确保功能可用）
const users: any[] = [];
let nextId = 1;

// 生成JWT令牌
const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '24h' }
  );
};

// 注册处理函数
const registerHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    // 验证必填字段
    if (!username || !email || !password) {
      res.status(400).json({ message: '请填写所有字段' });
      return;
    }

    // 验证邮箱格式
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400).json({ message: '邮箱格式不正确' });
      return;
    }

    // 验证密码强度
    if (password.length < 6) {
      res.status(400).json({ message: '密码至少需要6个字符' });
      return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      res.status(400).json({ message: '该邮箱已被注册' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: nextId++,
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      isEnterprise: false,
    };

    users.push(user);

    const token = generateToken(user);

    res.status(201).json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isEnterprise: user.isEnterprise,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

// 登录处理函数
const loginHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = users.find(u => u.email === email);

    if (!user) {
      res.status(401).json({ message: '用户不存在' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: '密码错误' });
      return;
    }

    const token = generateToken(user);

    res.json({
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isEnterprise: user.isEnterprise,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息处理函数
const getCurrentUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: '未登录' });
      return;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as any;
      const user = users.find(u => u.id === decoded.id);
      
      if (!user) {
        res.status(401).json({ message: '用户不存在' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          isEnterprise: user.isEnterprise,
        }
      });
    } catch (err) {
      res.status(401).json({ message: '令牌无效' });
    }
  } catch (error) {
    next(error);
  }
};

// 登出处理函数
const logoutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.json({ message: '登出成功' });
  } catch (error) {
    next(error);
  }
};

// 路由定义
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.get('/me', getCurrentUserHandler);
router.post('/logout', logoutHandler);

export default router; 