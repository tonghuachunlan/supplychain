import AlipaySdk from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import { alipayConfig } from '../config/payment.config';

class AlipayService {
  private alipay: AlipaySdk;

  constructor() {
    this.alipay = new AlipaySdk({
      appId: alipayConfig.appId,
      privateKey: alipayConfig.privateKey,
      encryptKey: '',
      alipayPublicKey: alipayConfig.publicKey,
      gateway: alipayConfig.gateway,
      timeout: 5000,
      camelcase: true,
    });
  }

  async createPayment(order: {
    outTradeNo: string;
    totalAmount: number;
    subject: string;
    body?: string;
  }): Promise<{ payUrl: string }> {
    try {
      const formData = new AlipayFormData();
      formData.setMethod('get');
      formData.addField('bizContent', {
        outTradeNo: order.outTradeNo,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: order.totalAmount.toFixed(2),
        subject: order.subject,
        body: order.body,
      });
      formData.addField('returnUrl', alipayConfig.returnUrl);
      formData.addField('notifyUrl', alipayConfig.notifyUrl);

      const result = await this.alipay.exec(
        'alipay.trade.page.pay',
        {},
        { formData }
      );

      if (typeof result === 'string') {
        return { payUrl: result };
      }
      throw new Error('创建支付链接失败');
    } catch (error: any) {
      throw new Error(`支付宝支付创建失败: ${error.message}`);
    }
  }

  async queryOrder(outTradeNo: string): Promise<{
    tradeStatus: string;
    tradeNo?: string;
    buyerId?: string;
    totalAmount?: string;
  }> {
    try {
      const result = await this.alipay.exec('alipay.trade.query', {
        bizContent: {
          outTradeNo,
        },
      });

      return {
        tradeStatus: result.tradeStatus,
        tradeNo: result.tradeNo,
        buyerId: result.buyerId,
        totalAmount: result.totalAmount,
      };
    } catch (error: any) {
      throw new Error(`查询订单失败: ${error.message}`);
    }
  }

  async refund(params: {
    outTradeNo: string;
    refundAmount: number;
    refundReason?: string;
    outRequestNo: string;
  }): Promise<{
    refundStatus: string;
    refundFee?: string;
  }> {
    try {
      const result = await this.alipay.exec('alipay.trade.refund', {
        bizContent: {
          outTradeNo: params.outTradeNo,
          refundAmount: params.refundAmount.toFixed(2),
          refundReason: params.refundReason,
          outRequestNo: params.outRequestNo,
        },
      });

      return {
        refundStatus: result.refundStatus,
        refundFee: result.refundFee,
      };
    } catch (error: any) {
      throw new Error(`退款失败: ${error.message}`);
    }
  }

  async verifyNotify(params: Record<string, string>): Promise<boolean> {
    try {
      return await this.alipay.checkNotifySign(params);
    } catch (error: any) {
      throw new Error(`验证通知签名失败: ${error.message}`);
    }
  }

  async closeOrder(outTradeNo: string): Promise<void> {
    try {
      await this.alipay.exec('alipay.trade.close', {
        bizContent: {
          outTradeNo,
        },
      });
    } catch (error: any) {
      throw new Error(`关闭订单失败: ${error.message}`);
    }
  }
}

export const alipayService = new AlipayService(); 