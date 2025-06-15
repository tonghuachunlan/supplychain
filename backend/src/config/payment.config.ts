import dotenv from 'dotenv';

dotenv.config();

export const alipayConfig = {
  appId: process.env.ALIPAY_APP_ID || '',
  privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
  publicKey: process.env.ALIPAY_PUBLIC_KEY || '',
  gateway: process.env.NODE_ENV === 'production'
    ? 'https://openapi.alipay.com/gateway.do'
    : 'https://openapi.alipaydev.com/gateway.do',
  notifyUrl: `${process.env.API_BASE_URL}/api/payments/alipay/notify`,
  returnUrl: `${process.env.CLIENT_BASE_URL}/payments/result`,
};

export const wechatPayConfig = {
  appId: process.env.WECHAT_APP_ID || '',
  mchId: process.env.WECHAT_MCH_ID || '',
  apiKey: process.env.WECHAT_API_KEY || '',
  apiV3Key: process.env.WECHAT_API_V3_KEY || '',
  certPath: process.env.WECHAT_CERT_PATH || '',
  keyPath: process.env.WECHAT_KEY_PATH || '',
  notifyUrl: `${process.env.API_BASE_URL}/api/payments/wechat/notify`,
};

export const paymentConfig = {
  currency: 'CNY',
  timeoutMinutes: 30,
  refundExpirationDays: 7,
  
  // 支付方式配置
  methods: {
    alipay: {
      enabled: true,
      minAmount: 0.01,
      maxAmount: 100000,
      label: '支付宝',
      icon: 'alipay',
    },
    wechat: {
      enabled: true,
      minAmount: 0.01,
      maxAmount: 100000,
      label: '微信支付',
      icon: 'wechat',
    },
    creditCard: {
      enabled: false, // 暂不支持信用卡支付
      minAmount: 1,
      maxAmount: 50000,
      label: '信用卡',
      icon: 'credit-card',
    },
  },
  
  // 订单状态
  orderStatus: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDING: 'refunding',
    REFUNDED: 'refunded',
  } as const,
  
  // 退款原因
  refundReasons: [
    '课程内容不满意',
    '购买错误',
    '其他原因',
  ],
  
  // 支付结果页面路由
  resultPages: {
    success: '/payment/success',
    failure: '/payment/failure',
    cancel: '/payment/cancel',
  },
}; 