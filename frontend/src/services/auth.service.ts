import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  isEnterprise?: boolean;
}

export interface AuthResponse {
  user: User;
  message: string;
  accessToken: string;
}

export const authService = {
  async register(data: { username: string; email: string; password: string; confirmPassword?: string; agreeToTerms?: boolean }): Promise<AuthResponse> {
    const { confirmPassword, agreeToTerms, ...registerData } = data;
    const response = await apiClient.post<AuthResponse>('/auth/register', registerData);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      localStorage.removeItem('accessToken');
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;
      
      const response = await apiClient.get<{user: User}>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('accessToken');
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}; 