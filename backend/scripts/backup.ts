import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';
import { compress } from 'zlib';
import dotenv from 'dotenv';

dotenv.config();

const execAsync = promisify(exec);
const compressAsync = promisify(compress);

const BACKUP_DIR = path.join(__dirname, '../backups');
const BACKUP_RETENTION_DAYS = 7;
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supplychain';

async function createBackup() {
  const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm');
  const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

  try {
    // 确保备份目录存在
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // 执行 MongoDB 备份
    console.log('开始数据库备份...');
    await execAsync(`mongodump --uri="${DB_URI}" --out="${backupPath}"`);

    // 压缩备份文件
    console.log('压缩备份文件...');
    const tarCommand = `tar -czf "${backupPath}.tar.gz" -C "${path.dirname(backupPath)}" "${path.basename(backupPath)}"`;
    await execAsync(tarCommand);

    // 删除原始备份文件
    await execAsync(`rm -rf "${backupPath}"`);

    // 清理旧备份
    await cleanOldBackups();

    console.log(`备份完成: ${backupPath}.tar.gz`);
  } catch (error) {
    console.error('备份失败:', error);
    throw error;
  }
}

async function cleanOldBackups() {
  const files = fs.readdirSync(BACKUP_DIR);
  const now = new Date();

  for (const file of files) {
    const filePath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filePath);
    const daysOld = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

    if (daysOld > BACKUP_RETENTION_DAYS) {
      fs.unlinkSync(filePath);
      console.log(`删除过期备份: ${file}`);
    }
  }
}

// 如果直接运行脚本则执行备份
if (require.main === module) {
  createBackup()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('备份过程中出错:', error);
      process.exit(1);
    });
}

export { createBackup }; 