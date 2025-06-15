import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  },

  async register(username: string, email: string, password: string): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
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