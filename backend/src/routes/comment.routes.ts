import express from 'express';
import { auth } from '../middleware/auth';
import { CommentController } from '../controllers/comment.controller';

const router = express.Router();
const commentController = new CommentController();

// 获取评论列表
router.get('/:courseId', commentController.getComments);

// 创建评论
router.post('/:courseId', auth, commentController.createComment);

// 更新评论
router.put('/:commentId', auth, commentController.updateComment);

// 删除评论
router.delete('/:commentId', auth, commentController.deleteComment);

// 点赞/取消点赞评论
router.post('/:commentId/like', auth, commentController.toggleLike);

export default router; 