// 用户相关类型
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  preferences: {
    notifications: boolean;
    theme: string;
  };
}

// 课程相关类型
export interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  order: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: User;
  price: number;
  rating: number;
  totalStudents: number;
  syllabus: Lesson[];
  requirements: string[];
  objectives: string[];
  category: string;
  level: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// 学习进度相关类型
export interface LessonProgress {
  lessonId: string;
  position: number;
  completed: boolean;
  duration: number;
  lastAccessed: string;
}

export interface Progress {
  _id: string;
  user: string;
  course: Course;
  progress: LessonProgress[];
  overallProgress: number;
  lastAccessed: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// 评论相关类型
export interface Reply {
  _id: string;
  user: User;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  user: User;
  course: string;
  content: string;
  likes: number;
  replies: Reply[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

// 订单相关类型
export interface Order {
  _id: string;
  user: string;
  course: Course;
  orderNumber: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  refundId?: string;
  paidAt?: string;
  refundedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: {
    code: string;
    details?: unknown;
  };
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// 认证相关类型
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
  agreeToTerms: boolean;
} 