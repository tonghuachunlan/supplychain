import express from 'express';

const router = express.Router();

// 获取课程列表
router.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      title: '供应链管理基础',
      description: '学习供应链管理的基本概念和原理',
      price: 199,
      instructor: '张教授',
      thumbnail: 'https://example.com/course1.jpg',
      totalDuration: 120,
      enrolledCount: 100,
      rating: 4.5
    }
  ]);
});

// 获取单个课程
router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    title: '供应链管理基础',
    description: '学习供应链管理的基本概念和原理',
    price: 199,
    instructor: '张教授',
    thumbnail: 'https://example.com/course1.jpg',
    totalDuration: 120,
    enrolledCount: 100,
    rating: 4.5
  });
});

export default router; 