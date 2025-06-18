require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5175',
  credentials: true,
}));

// 内存存储用户数据（仅用于测试）
const users = [];
let nextId = 1;

// 注册
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: '请填写所有字段' });
  
  const exist = users.find(user => user.email === email);
  if (exist) return res.status(400).json({ message: '邮箱已被注册' });
  
  const hash = await bcrypt.hash(password, 10);
  const user = {
    id: nextId++,
    username,
    email,
    password: hash
  };
  users.push(user);
  
  res.json({ 
    message: '注册成功', 
    user: { id: user.id, username, email } 
  });
});

// 登录
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user) return res.status(400).json({ message: '用户不存在' });
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: '密码错误' });
  
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
  
  res.json({ 
    message: '登录成功', 
    token, 
    user: { id: user.id, username: user.username, email: user.email } 
  });
});

// 获取当前用户
app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: '未登录' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: '用户不存在' });
    
    res.json({ 
      user: { id: user.id, username: user.username, email: user.email } 
    });
  } catch (err) {
    return res.status(401).json({ message: '令牌无效' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log('Using in-memory storage (for testing only)');
}); 