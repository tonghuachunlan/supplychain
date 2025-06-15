import { Router } from 'express';
import multer from 'multer';
import { uploadController } from '../controllers/upload.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// 上传文件
router.post(
  '/:type',
  authMiddleware,
  upload.single('file'),
  uploadController.uploadFile
);

// 删除文件
router.delete(
  '/:key',
  authMiddleware,
  uploadController.deleteFile
);

// 获取签名URL
router.get(
  '/signed-url/:key',
  authMiddleware,
  uploadController.getSignedUrl
);

// 获取文件元数据
router.get(
  '/metadata/:key',
  authMiddleware,
  uploadController.getFileMetadata
);

export const uploadRoutes = router; 