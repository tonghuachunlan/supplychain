import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse } from '../types';

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
        // 直接返回响应，让调用方处理 .data
        return response;
      },
      async (error: AxiosError<ApiResponse<any>>) => {
        if (error.response?.status === 401) {
          // Token 过期，尝试刷新
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              // 注意：这里的 post 调用是直接使用 axios 实例，因此会经过拦截器
              const response = await this.api.post<ApiResponse<{ token: string; refreshToken: string }>>(
                '/auth/refresh-token',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );

              localStorage.setItem('token', response.data.data.token);
              localStorage.setItem('refreshToken', response.data.data.refreshToken);

              // 重试原始请求
              const originalRequest = error.config;
              if (originalRequest) {
                originalRequest.headers.Authorization = `Bearer ${response.data.data.token}`;
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
    const response = await this.api.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data = {}, config = {}) {
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data = {}, config = {}) {
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data = {}, config = {}) {
    const response = await this.api.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config = {}) {
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const apiService = new ApiService(); 