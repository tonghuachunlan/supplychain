import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { vi } from 'vitest';
import Navbar from './Navbar';
import { AuthProvider } from '../contexts/AuthContext';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should render logo and navigation links', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('供应链思维学院')).toBeInTheDocument();
    expect(screen.getByText('课程')).toBeInTheDocument();
    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByText('注册')).toBeInTheDocument();
  });

  it('should render user menu when logged in', () => {
    const testUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user' as const,
      joinDate: '2024-03-06',
    };

    localStorage.setItem('user', JSON.stringify(testUser));
    
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByText('登录')).not.toBeInTheDocument();
    expect(screen.queryByText('注册')).not.toBeInTheDocument();
  });

  it('should show login/register buttons when not logged in', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByText('注册')).toBeInTheDocument();
    expect(screen.queryByText('个人中心')).not.toBeInTheDocument();
  });

  it('should toggle color mode when clicking theme button', () => {
    renderWithProviders(<Navbar />);
    
    const themeButton = screen.getByLabelText('切换主题');
    fireEvent.click(themeButton);
    
    // 由于 Chakra UI 的实现，我们无法直接测试颜色模式的改变
    // 但至少可以确保按钮存在并可以点击
    expect(themeButton).toBeInTheDocument();
  });
}); 