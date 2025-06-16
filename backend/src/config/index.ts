import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number | string;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiration: string;
  alipay: {
    appId: string;
    privateKey: string;
    publicKey: string;
    encryptKey: string;
  };
  wechat: {
    appId: string;
    mchId: string;
    apiKey: string;
    notifyUrl: string;
  };
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
  };
}

export const config: Config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/supplychain',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiration: process.env.JWT_EXPIRATION || '24h',
  alipay: {
    appId: process.env.ALIPAY_APP_ID || '',
    privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
    publicKey: process.env.ALIPAY_PUBLIC_KEY || '',
    encryptKey: process.env.ALIPAY_ENCRYPT_KEY || '',
  },
  wechat: {
    appId: process.env.WECHAT_APP_ID || '',
    mchId: process.env.WECHAT_MCH_ID || '',
    apiKey: process.env.WECHAT_API_KEY || '',
    notifyUrl: process.env.WECHAT_NOTIFY_URL || 'http://localhost:3000/api/payment/wechat/notify',
  },
  aws: {
    region: process.env.AWS_REGION || 'ap-northeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucket: process.env.AWS_BUCKET_NAME || '',
  },
}; 