import React, { useState, useEffect } from 'react';
import { authAPI } from './api';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 表单状态
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  // 检查登录状态
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      loadUser();
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      console.error('获取用户信息失败:', error);
      authAPI.logout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await authAPI.login(loginForm);
      setUser(response.user);
      setMessage('登录成功！');
      setLoginForm({ email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage('两次输入的密码不一致');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password
      });
      setMessage('注册成功！请登录');
      setActiveTab('login');
      setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setMessage('已退出登录');
  };

  if (user) {
    return (
      <div className="container">
        <h2>欢迎回来！</h2>
        <div className="user-info">
          <p><strong>用户名:</strong> {user.username}</p>
          <p><strong>邮箱:</strong> {user.email}</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          退出登录
        </button>
        {message && <div className="success">{message}</div>}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>极简注册登录</h2>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          登录
        </button>
        <button 
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          注册
        </button>
      </div>

      {message && (
        <div className={message.includes('成功') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      {activeTab === 'login' && (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>邮箱:</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>密码:</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
      )}

      {activeTab === 'register' && (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>用户名:</label>
            <input
              type="text"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>邮箱:</label>
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>密码:</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>确认密码:</label>
            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
      )}
    </div>
  );
}

export default App; 