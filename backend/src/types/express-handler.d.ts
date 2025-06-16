import { Request, Response, NextFunction } from 'express';

declare global {
  type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>;

  type RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void | Response>;
} 