import { Request, Response } from 'express';
import { uploadService } from '../services/upload.service';
import { parseFileType } from '../utils/upload.utils';
import { AuthRequest } from '../types/auth';

export const uploadController = {
  async uploadFile(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: '未找到上传文件' });
      }

      const type = parseFileType(req);
      const result = await uploadService.uploadFile(req.file, type, req.user.id);

      res.status(200).json({
        message: '文件上传成功',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '文件上传失败',
      });
    }
  },

  async deleteFile(req: AuthRequest, res: Response) {
    try {
      const { key } = req.params;
      await uploadService.deleteFile(key);

      res.status(200).json({
        message: '文件删除成功',
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '文件删除失败',
      });
    }
  },

  async getSignedUrl(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const { expiresIn } = req.query;

      const url = await uploadService.getSignedUrl(
        key,
        expiresIn ? parseInt(expiresIn as string, 10) : undefined
      );

      res.status(200).json({
        message: '获取签名URL成功',
        data: { url },
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '获取签名URL失败',
      });
    }
  },

  async getFileMetadata(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const metadata = await uploadService.getFileMetadata(key);

      res.status(200).json({
        message: '获取文件元数据成功',
        data: metadata,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '获取文件元数据失败',
      });
    }
  },
}; 