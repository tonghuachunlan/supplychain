import { Types } from 'mongoose';
import AlipaySDK from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import axios from 'axios';
import { config } from '../config';

export enum PaymentMethod {
  ALIPAY = 'alipay',
  WECHAT = 'wechat',
  CREDIT_CARD = 'credit_card'
}

export interface PaymentInfo {
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  description: string;
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
}

interface RefundInfo {
  orderId: string;
  amount: number;
  reason?: string;
}

class PaymentService {
  private alipay: AlipaySDK;
  private wechatConfig: any; // 微信支付配置

  constructor() {
    // 初始化支付宝SDK
    this.alipay = new AlipaySDK({
      appId: config.alipay.appId,
      privateKey: config.alipay.privateKey,
      encryptKey: config.alipay.encryptKey,
      alipayPublicKey: config.alipay.publicKey,
    });

    // 初始化微信支付配置
    this.wechatConfig = {
      appId: config.wechat.appId,
      mchId: config.wechat.mchId,
      apiKey: config.wechat.apiKey,
    };
  }

  async createPayment(paymentInfo: PaymentInfo) {
    switch (paymentInfo.method) {
      case PaymentMethod.ALIPAY:
        return this.createAlipayPayment(paymentInfo);
      case PaymentMethod.WECHAT:
        return this.createWechatPayment(paymentInfo);
      case PaymentMethod.CREDIT_CARD:
        return this.createCreditCardPayment(paymentInfo);
      default:
        throw new Error('不支持的支付方式');
    }
  }

  async queryPaymentStatus(orderId: string, method: PaymentMethod) {
    switch (method) {
      case PaymentMethod.ALIPAY:
        return this.queryAlipayStatus(orderId);
      case PaymentMethod.WECHAT:
        return this.queryWechatStatus(orderId);
      case PaymentMethod.CREDIT_CARD:
        return this.queryCreditCardStatus(orderId);
      default:
        throw new Error('不支持的支付方式');
    }
  }

  async refund(refundInfo: RefundInfo) {
    // 实现退款逻辑
    return { success: true, message: '退款申请已提交' };
  }

  async closePayment(orderId: string, method: PaymentMethod) {
    switch (method) {
      case PaymentMethod.ALIPAY:
        return this.closeAlipayPayment(orderId);
      case PaymentMethod.WECHAT:
        return this.closeWechatPayment(orderId);
      case PaymentMethod.CREDIT_CARD:
        return this.closeCreditCardPayment(orderId);
      default:
        throw new Error('不支持的支付方式');
    }
  }

  async verifyPaymentNotify(method: 'alipay' | 'wechat', data: any) {
    switch (method) {
      case 'alipay':
        return this.verifyAlipayNotify(data);
      case 'wechat':
        return this.verifyWechatNotify(data);
      default:
        throw new Error('不支持的支付方式');
    }
  }

  private async createAlipayPayment(paymentInfo: PaymentInfo) {
    const formData = new AlipayFormData();
    formData.setMethod('alipay.trade.page.pay');
    formData.addField('bizContent', {
      outTradeNo: paymentInfo.orderId,
      totalAmount: paymentInfo.amount,
      subject: paymentInfo.description,
      productCode: 'FAST_INSTANT_TRADE_PAY',
    });

    try {
      const result = await this.alipay.exec('alipay.trade.page.pay', {}, { formData });
      return { success: true, data: result };
    } catch (error) {
      console.error('Alipay payment creation failed:', error);
      return { success: false, error: '支付宝支付创建失败' };
    }
  }

  private async createWechatPayment(paymentInfo: PaymentInfo) {
    try {
      const response = await axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', {
        appid: this.wechatConfig.appId,
        mch_id: this.wechatConfig.mchId,
        nonce_str: this.generateNonceStr(),
        body: paymentInfo.description,
        out_trade_no: paymentInfo.orderId,
        total_fee: Math.round(paymentInfo.amount * 100), // 转换为分
        spbill_create_ip: '127.0.0.1', // 应该从请求中获取
        notify_url: config.wechat.notifyUrl,
        trade_type: 'JSAPI',
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Wechat payment creation failed:', error);
      return { success: false, error: '微信支付创建失败' };
    }
  }

  private async createCreditCardPayment(paymentInfo: PaymentInfo) {
    return { success: true, data: { message: '信用卡支付功能待实现' } };
  }

  private async queryAlipayStatus(orderId: string) {
    return { status: 'PENDING' };
  }

  private async queryWechatStatus(orderId: string) {
    return { status: 'PENDING' };
  }

  private async queryCreditCardStatus(orderId: string) {
    return { status: 'PENDING' };
  }

  private async closeAlipayPayment(orderId: string) {
    return { success: true };
  }

  private async closeWechatPayment(orderId: string) {
    return { success: true };
  }

  private async closeCreditCardPayment(orderId: string) {
    return { success: true };
  }

  private async verifyAlipayNotify(data: any) {
    return true;
  }

  private async verifyWechatNotify(data: any) {
    return true;
  }

  private generateNonceStr(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const paymentService = new PaymentService(); 