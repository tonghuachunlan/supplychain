import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { config } from '../config';
import { Readable } from 'stream';
import {
  FileType,
  UploadedFile,
  validateFileType,
  validateFileSize,
  generateFileName,
  getUploadPath,
} from '../utils/upload.utils';

interface FileInfo {
  key: string;
  contentType: string;
  size: number;
  lastModified: Date;
  metadata?: Record<string, string>;
}

export class UploadService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
    this.bucket = config.aws.bucket;
  }

  async uploadFile(fileBuffer: Buffer | Readable, key: string, contentType: string): Promise<string> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: fileBuffer,
          ContentType: contentType,
        },
      });

      const result = await upload.done();
      return result.Location || key;
    } catch (error) {
      console.error('File upload failed:', error);
      throw new Error('文件上传失败');
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('File deletion failed:', error);
      throw new Error('文件删除失败');
    }
  }

  async getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error('Failed to generate signed URL:', error);
      throw new Error('获取下载链接失败');
    }
  }

  async getFileInfo(key: string): Promise<FileInfo> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const response = await this.s3Client.send(command);

      return {
        key,
        contentType: response.ContentType || 'application/octet-stream',
        size: response.ContentLength || 0,
        lastModified: response.LastModified || new Date(),
        metadata: response.Metadata,
      };
    } catch (error) {
      console.error('Failed to get file info:', error);
      throw new Error('获取文件信息失败');
    }
  }

  async uploadFileWithMetadata(
    file: UploadedFile,
    type: FileType,
    userId: string
  ): Promise<{ url: string; key: string }> {
    try {
      // 验证文件类型
      const typeError = await validateFileType(file, type);
      if (typeError) {
        throw new Error(typeError);
      }

      // 验证文件大小
      const sizeError = validateFileSize(file, type);
      if (sizeError) {
        throw new Error(sizeError);
      }

      // 生成文件名和路径
      const fileName = generateFileName(file, userId);
      const key = getUploadPath(type, fileName);

      // 上传到S3
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
          Metadata: {
            originalname: file.originalname,
            userId,
            uploadType: type,
          },
        },
      });

      await upload.done();

      // 返回文件URL和key
      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      return { url, key };
    } catch (error: any) {
      throw new Error(`文件上传失败: ${error.message}`);
    }
  }
}

export const uploadService = new UploadService(); 