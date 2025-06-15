import { Router } from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// 获取支付方式
router.get('/methods', paymentController.getPaymentMethods);

// 创建支付订单
router.post(
  '/create',
  authMiddleware,
  paymentController.createPayment
);

// 查询支付状态
router.get(
  '/status/:orderId/:paymentMethod',
  authMiddleware,
  paymentController.queryPaymentStatus
);

// 申请退款
router.post(
  '/refund',
  authMiddleware,
  paymentController.refund
);

// 关闭支付订单
router.post(
  '/close/:orderId/:paymentMethod',
  authMiddleware,
  paymentController.closePayment
);

// 支付宝回调通知
router.post('/alipay/notify', paymentController.alipayNotify);

// 微信支付回调通知
router.post('/wechat/notify', paymentController.wechatNotify);

export const paymentRoutes = router; 