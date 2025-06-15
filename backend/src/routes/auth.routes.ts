import express from 'express';

const router = express.Router();

// 登录
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

// 注册
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

// 登出
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint' });
});

export default router; 