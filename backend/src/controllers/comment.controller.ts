import { Request, Response } from 'express';
import { Comment } from '../models/comment.model';
import { Types } from 'mongoose';

export class CommentController {
  async getComments(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const comments = await Comment.find({ courseId: new Types.ObjectId(courseId) }).populate('userId', 'name');
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: '获取评论失败' });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const { content } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const comment = new Comment({
        courseId: new Types.ObjectId(courseId),
        userId: new Types.ObjectId(req.user.id),
        content,
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: '创建评论失败' });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      
      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const comment = await Comment.findOneAndUpdate(
        { 
          _id: new Types.ObjectId(commentId),
          userId: new Types.ObjectId(req.user.id)
        },
        { content },
        { new: true }
      );

      if (!comment) {
        return res.status(404).json({ message: '评论不存在或无权修改' });
      }

      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: '更新评论失败' });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      
      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const comment = await Comment.findOneAndDelete({
        _id: new Types.ObjectId(commentId),
        userId: new Types.ObjectId(req.user.id)
      });

      if (!comment) {
        return res.status(404).json({ message: '评论不存在或无权删除' });
      }

      res.json({ message: '评论已删除' });
    } catch (error) {
      res.status(500).json({ message: '删除评论失败' });
    }
  }

  async toggleLike(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      
      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const userId = new Types.ObjectId(req.user.id);
      const comment = await Comment.findById(new Types.ObjectId(commentId));

      if (!comment) {
        return res.status(404).json({ message: '评论不存在' });
      }

      const likeIndex = comment.likes.findIndex(id => id.equals(userId));
      if (likeIndex === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes.splice(likeIndex, 1);
      }

      await comment.save();
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: '操作失败' });
    }
  }
} 