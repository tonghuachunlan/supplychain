import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// 创建默认注册表
const register = new client.Registry();

// 添加默认指标
client.collectDefaultMetrics({
  register,
  prefix: 'supplychain_',
});

// HTTP请求计数器
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register],
});

// HTTP请求持续时间
const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'path', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// 活跃用户数量
const activeUsers = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users',
  registers: [register],
});

// 课程观看次数
const courseViewsTotal = new client.Counter({
  name: 'course_views_total',
  help: 'Total number of course views',
  labelNames: ['courseId'],
  registers: [register],
});

export const metricsMiddleware = async (req: Request, res: Response) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
};

export const requestMetrics = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    
    httpRequestsTotal.inc({
      method: req.method,
      path: req.path,
      status: res.statusCode,
    });

    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        path: req.path,
        status: res.statusCode,
      },
      duration / 1000
    );
  });

  next();
};

export const trackActiveUser = () => {
  activeUsers.inc();
  return () => activeUsers.dec();
};

export const trackCourseView = (courseId: string) => {
  courseViewsTotal.inc({ courseId });
};

export default {
  register,
  httpRequestsTotal,
  httpRequestDurationSeconds,
  activeUsers,
  courseViewsTotal,
}; 