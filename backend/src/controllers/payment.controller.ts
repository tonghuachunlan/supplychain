import { Request, Response } from 'express';
import { paymentService, PaymentMethod } from '../services/payment.service';
import { AuthRequest } from '../types/auth';
import { paymentConfig } from '../config/payment.config';

export const paymentController = {
  async createPayment(req: AuthRequest, res: Response) {
    try {
      const { courseId, amount, paymentMethod, description } = req.body;

      if (!courseId || !amount || !paymentMethod) {
        return res.status(400).json({
          message: '缺少必要参数',
        });
      }

      const result = await paymentService.createPayment({
        userId: req.user.id,
        courseId,
        amount,
        paymentMethod: paymentMethod as PaymentMethod,
        description,
      });

      res.status(200).json({
        message: '创建支付订单成功',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '创建支付订单失败',
      });
    }
  },

  async queryPaymentStatus(req: Request, res: Response) {
    try {
      const { orderId, paymentMethod } = req.params;

      const result = await paymentService.queryPaymentStatus(
        orderId,
        paymentMethod as PaymentMethod
      );

      res.status(200).json({
        message: '查询支付状态成功',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '查询支付状态失败',
      });
    }
  },

  async refund(req: AuthRequest, res: Response) {
    try {
      const { orderId, paymentMethod, amount, reason } = req.body;

      if (!orderId || !paymentMethod || !amount) {
        return res.status(400).json({
          message: '缺少必要参数',
        });
      }

      const result = await paymentService.refund({
        orderId,
        paymentMethod: paymentMethod as PaymentMethod,
        amount,
        reason,
      });

      res.status(200).json({
        message: '退款申请成功',
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '退款申请失败',
      });
    }
  },

  async closePayment(req: Request, res: Response) {
    try {
      const { orderId, paymentMethod } = req.params;

      await paymentService.closePayment(orderId, paymentMethod as PaymentMethod);

      res.status(200).json({
        message: '关闭支付订单成功',
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || '关闭支付订单失败',
      });
    }
  },

  async alipayNotify(req: Request, res: Response) {
    try {
      const isValid = await paymentService.verifyPaymentNotify('alipay', req.body);

      if (!isValid) {
        return res.status(400).send('fail');
      }

      // TODO: 更新订单状态

      res.send('success');
    } catch (error: any) {
      console.error('支付宝回调处理失败:', error);
      res.status(500).send('fail');
    }
  },

  async wechatNotify(req: Request, res: Response) {
    try {
      const isValid = await paymentService.verifyPaymentNotify('wechat', req.body);

      if (!isValid) {
        return res.status(400).json({
          return_code: 'FAIL',
          return_msg: '签名验证失败',
        });
      }

      // TODO: 更新订单状态

      res.json({
        return_code: 'SUCCESS',
        return_msg: 'OK',
      });
    } catch (error: any) {
      console.error('微信支付回调处理失败:', error);
      res.status(500).json({
        return_code: 'FAIL',
        return_msg: error.message,
      });
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