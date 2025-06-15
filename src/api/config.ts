import { z } from 'zod';

// Environment variables validation schema
const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_API_TIMEOUT: z.string().transform(Number).default('30000'),
});

// Environment configuration
const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
};

// Validate environment variables
try {
  envSchema.parse({
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_API_TIMEOUT: import.meta.env.VITE_API_TIMEOUT,
  });
} catch (error) {
  console.error('Environment validation failed:', error);
  throw new Error('Invalid environment configuration');
}

// API endpoints configuration
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  COURSES: {
    BASE: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
    PROGRESS: (id: string) => `/courses/${id}/progress`,
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
    COURSES: '/user/courses',
    PROGRESS: '/user/progress',
  },
  COMMENTS: {
    LIST: (courseId: string) => `/courses/${courseId}/comments`,
    CREATE: (courseId: string) => `/courses/${courseId}/comments`,
    UPDATE: (courseId: string, commentId: string) => `/courses/${courseId}/comments/${commentId}`,
    DELETE: (courseId: string, commentId: string) => `/courses/${courseId}/comments/${commentId}`,
  },
  PAYMENTS: {
    CREATE_ORDER: '/payments/create-order',
    ORDER_STATUS: (orderId: string) => `/payments/orders/${orderId}`,
    REFUND: (orderId: string) => `/payments/orders/${orderId}/refund`,
  },
} as const;

export const API_CONFIG = {
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
} as const; 