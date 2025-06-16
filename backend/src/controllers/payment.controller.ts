import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { paymentService, PaymentMethod } from '../services/payment.service';
import { AuthRequest } from '../types/auth';
import { paymentConfig } from '../config/payment.config';

export const paymentController = {
  async createPayment(req: AuthRequest, res: Response) {
    try {
      const { courseId, amount, method } = req.body;

      if (!req.user) {
        return res.status(401).json({ message: '未授权' });
      }

      const paymentInfo = {
        orderId: new Types.ObjectId().toString(),
        amount,
        currency: 'CNY',
        method: method as PaymentMethod,
        description: '课程购买',
        userId: new Types.ObjectId(req.user.id),
        courseId: new Types.ObjectId(courseId),
      };

      const result = await paymentService.createPayment(paymentInfo);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: '创建支付失败' });
    }
  },

  async queryPaymentStatus(req: Request, res: Response) {
    try {
      const { orderId, method } = req.params;
      const result = await paymentService.queryPaymentStatus(orderId, method as PaymentMethod);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: '查询支付状态失败' });
    }
  },

  async refund(req: AuthRequest, res: Response) {
    try {
      const { orderId, amount, reason } = req.body;
      const result = await paymentService.refund({
        orderId,
        amount,
        reason,
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: '退款失败' });
    }
  },

  async closePayment(req: Request, res: Response) {
    try {
      const { orderId, method } = req.params;
      await paymentService.closePayment(orderId, method as PaymentMethod);
      res.json({ message: '支付已关闭' });
    } catch (error) {
      res.status(500).json({ message: '关闭支付失败' });
    }
  },

  async alipayNotify(req: Request, res: Response) {
    try {
      const isValid = await paymentService.verifyPaymentNotify('alipay', req.body);
      if (!isValid) {
        return res.status(400).json({ message: '支付通知验证失败' });
      }
      // 处理支付成功逻辑
      res.send('success');
    } catch (error) {
      res.status(500).json({ message: '处理支付通知失败' });
    }
  },

  async wechatNotify(req: Request, res: Response) {
    try {
      const isValid = await paymentService.verifyPaymentNotify('wechat', req.body);
      if (!isValid) {
        return res.status(400).json({ message: '支付通知验证失败' });
      }
      // 处理支付成功逻辑
      res.send('success');
    } catch (error) {
      res.status(500).json({ message: '处理支付通知失败' });
    }
  },

  getPaymentMethods(req: Request, res: Response) {
    const availableMethods = Object.entries(paymentConfig.methods)
      .filter(([, config]) => config.enabled)
      .map(([key, config]) => ({
        id: key,
        label: config.label,
        icon: config.icon,
        minAmount: config.minAmount,
        maxAmount: config.maxAmount,
      }));

    res.status(200).json({
      message: '获取支付方式成功',
      data: availableMethods,
    });
  },
}; 