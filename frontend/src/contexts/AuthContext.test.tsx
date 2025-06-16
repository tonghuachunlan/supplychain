import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { vi } from 'vitest';

// 创建一个测试组件来访问 AuthContext
const TestComponent = () => {
  const { user, isLoading } = useAuth();
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {user ? (
            <div data-testid="user-info">
              {user.name} - {user.email}
            </div>
          ) : (
            <div data-testid="no-user">No user</div>
          )}
        </div>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // 清除 localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with no user and loading state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should load user from localStorage', async () => {
    const testUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user' as const,
      joinDate: '2024-03-06',
    };

    localStorage.setItem('user', JSON.stringify(testUser));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('user-info')).toHaveTextContent('Test User - test@example.com');
  });

  it('should show no user when localStorage is empty', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('no-user')).toBeInTheDocument();
  });
}); 