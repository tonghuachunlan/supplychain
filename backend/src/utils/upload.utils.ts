import { Request } from 'express';
import { FileTypeResult, fileTypeFromBuffer } from 'file-type';
import { createHash } from 'crypto';
import { uploadConfig } from '../config/upload.config';

export type FileType = 'avatar' | 'video' | 'cover' | 'material';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export const validateFileType = async (file: UploadedFile, type: FileType): Promise<string | null> => {
  // 检查MIME类型
  if (!uploadConfig.mimeTypes[type].includes(file.mimetype)) {
    return `不支持的文件类型: ${file.mimetype}。允许的类型: ${uploadConfig.mimeTypes[type].join(', ')}`;
  }

  // 使用file-type库进行深度检查
  const fileType: FileTypeResult | undefined = await fileTypeFromBuffer(file.buffer);
  if (!fileType || !uploadConfig.mimeTypes[type].includes(fileType.mime)) {
    return `文件内容类型验证失败`;
  }

  return null;
};

export const validateFileSize = (file: UploadedFile, type: FileType): string | null => {
  if (file.size > uploadConfig.limits[type]) {
    return `文件大小超过限制: ${file.size} bytes。最大允许: ${uploadConfig.limits[type]} bytes`;
  }
  return null;
};

export const generateFileName = (file: UploadedFile, userId: string): string => {
  const timestamp = Date.now();
  const hash = createHash('md5')
    .update(`${file.originalname}${timestamp}${userId}`)
    .digest('hex');
  const ext = file.originalname.split('.').pop();
  return `${hash}.${ext}`;
};

export const getUploadPath = (type: FileType, fileName: string): string => {
  if (type === 'avatar') {
    return `${uploadConfig.paths.avatar}/${fileName}`;
  }
  if (type === 'video') {
    return `${uploadConfig.paths.course.video}/${fileName}`;
  }
  if (type === 'cover') {
    return `${uploadConfig.paths.course.cover}/${fileName}`;
  }
  return `${uploadConfig.paths.course.material}/${fileName}`;
};

export const parseFileType = (req: Request): FileType => {
  const uploadType = req.params.type || req.query.type;
  if (!uploadType || typeof uploadType !== 'string') {
    throw new Error('未指定上传文件类型');
  }
  if (!['avatar', 'video', 'cover', 'material'].includes(uploadType)) {
    throw new Error('无效的文件类型');
  }
  return uploadType as FileType;
}; 