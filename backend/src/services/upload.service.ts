import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Config } from '../config/upload.config';
import {
  FileType,
  UploadedFile,
  validateFileType,
  validateFileSize,
  generateFileName,
  getUploadPath,
} from '../utils/upload.utils';

class UploadService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client(s3Config);
  }

  async uploadFile(
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

  async deleteFile(key: string): Promise<void> {
    try {
      await this.s3Client.send({
        Command: 'DeleteObject',
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });
    } catch (error: any) {
      throw new Error(`文件删除失败: ${error.message}`);
    }
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    try {
      const command = {
        Command: 'GetObject',
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      };

      return await this.s3Client.getSignedUrl('getObject', {
        ...command,
        Expires: expiresIn,
      });
    } catch (error: any) {
      throw new Error(`获取签名URL失败: ${error.message}`);
    }
  }

  async getFileMetadata(key: string): Promise<any> {
    try {
      const response = await this.s3Client.send({
        Command: 'HeadObject',
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      });

      return {
        contentType: response.ContentType,
        size: response.ContentLength,
        lastModified: response.LastModified,
        metadata: response.Metadata,
      };
    } catch (error: any) {
      throw new Error(`获取文件元数据失败: ${error.message}`);
    }
  }
}

export const uploadService = new UploadService(); 