import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse<any>>) => {
        return response.data;
      },
      async (error: AxiosError<ApiResponse<any>>) => {
        if (error.response?.status === 401) {
          // Token 过期，尝试刷新
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const response = await this.post<{ token: string; refreshToken: string }>(
                '/auth/refresh-token',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );

              localStorage.setItem('token', response.data.token);
              localStorage.setItem('refreshToken', response.data.refreshToken);

              // 重试原始请求
              const originalRequest = error.config;
              if (originalRequest) {
                originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                return this.api(originalRequest);
              }
            } catch (refreshError) {
              // 刷新失败，清除认证信息
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
          }
        }

        return Promise.reject(error.response?.data || error);
      }
    );
  }

  public async get<T>(url: string, config = {}) {
    return this.api.get<any, ApiResponse<T>>(url, config);
  }

  public async post<T>(url: string, data = {}, config = {}) {
    return this.api.post<any, ApiResponse<T>>(url, data, config);
  }

  public async put<T>(url: string, data = {}, config = {}) {
    return this.api.put<any, ApiResponse<T>>(url, data, config);
  }

  public async patch<T>(url: string, data = {}, config = {}) {
    return this.api.patch<any, ApiResponse<T>>(url, data, config);
  }

  public async delete<T>(url: string, config = {}) {
    return this.api.delete<any, ApiResponse<T>>(url, config);
  }
}

export const apiService = new ApiService(); 