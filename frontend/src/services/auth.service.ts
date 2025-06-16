import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async register(data: { username: string; email: string; password: string }): Promise<AuthResponse> {
    // 在实际API准备好之前，使用模拟数据
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API延迟
    
    // 模拟成功响应
    return {
      user: {
        id: '1',
        username: data.username,
        email: data.email,
      },
      accessToken: 'mock_access_token',
      refreshToken: 'mock_refresh_token',
    };
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  async refreshToken(token: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/refresh`, { token });
    return response.data;
  },

  async logout(): Promise<void> {
    await axios.post(`${API_URL}/auth/logout`);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch {
      return null;
    }
  }
}; 