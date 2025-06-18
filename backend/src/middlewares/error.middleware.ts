import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: '输入数据验证失败',
      errors: err.message,
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: '无效的认证令牌',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: '认证令牌已过期',
    });
    return;
  }

  res.status(500).json({
    message: '服务器内部错误',
  });
}; 