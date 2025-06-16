import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { uploadService } from '../services/upload.service';
import { parseFileType } from '../utils/upload.utils';
import { AuthRequest } from '../types/auth';

export class UploadController {
  async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: '未找到上传文件' });
      }

      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const fileBuffer = req.file.buffer;
      const fileName = `${new Types.ObjectId().toString()}-${req.file.originalname}`;
      const contentType = req.file.mimetype;

      const fileUrl = await uploadService.uploadFile(fileBuffer, fileName, contentType);
      res.json({ url: fileUrl });
    } catch (error) {
      res.status(500).json({ message: '文件上传失败' });
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const { key } = req.params;

      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      await uploadService.deleteFile(key);
      res.json({ message: '文件删除成功' });
    } catch (error) {
      res.status(500).json({ message: '文件删除失败' });
    }
  }

  async getDownloadUrl(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const url = await uploadService.getSignedDownloadUrl(key);
      res.json({ url });
    } catch (error) {
      res.status(500).json({ message: '获取下载链接失败' });
    }
  }

  async getFileInfo(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const fileInfo = await uploadService.getFileInfo(key);
      res.json(fileInfo);
    } catch (error) {
      res.status(500).json({ message: '获取文件信息失败' });
    }
  }

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
} 