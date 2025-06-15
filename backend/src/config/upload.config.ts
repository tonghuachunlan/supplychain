import { S3ClientConfig } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

export const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
};

export const uploadConfig = {
  bucket: process.env.AWS_BUCKET_NAME || '',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '100000000', 10), // 100MB default
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || '')
    .split(',')
    .map(type => type.trim()),
  
  // 不同类型文件的存储路径
  paths: {
    avatar: 'avatars',
    course: {
      video: 'courses/videos',
      cover: 'courses/covers',
      material: 'courses/materials',
    },
  },
  
  // 文件大小限制（字节）
  limits: {
    avatar: 5 * 1024 * 1024, // 5MB
    video: 500 * 1024 * 1024, // 500MB
    cover: 10 * 1024 * 1024, // 10MB
    material: 50 * 1024 * 1024, // 50MB
  },
  
  // 允许的文件类型
  mimeTypes: {
    avatar: ['image/jpeg', 'image/png', 'image/gif'],
    video: ['video/mp4', 'video/webm'],
    cover: ['image/jpeg', 'image/png'],
    material: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
}; 