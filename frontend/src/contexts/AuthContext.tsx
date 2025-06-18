import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { authService } from '../services/auth.service';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  isEnterprise?: boolean;
  membership?: any; // 或者更具体的类型
  learningProgress?: any[]; // 或者更具体的类型
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      setError(null);
      const response = await authService.login(data);
      // 重新获取完整的用户信息
      await checkAuth();
    } catch (error: any) {
      setError(error.message || '登录失败，请检查邮箱和密码');
      throw error;
    }
  };

  const register = async (data: { username: string; email: string; password: string }) => {
    try {
      setError(null);
      const response = await authService.register(data);
      // 重新获取完整的用户信息
      await checkAuth();
    } catch (error: any) {
      setError(error.message || '注册失败，请稍后重试');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 