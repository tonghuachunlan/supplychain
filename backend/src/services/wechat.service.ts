import { createHash, createSign } from 'crypto';
import { readFileSync } from 'fs';
import axios from 'axios';
import { wechatPayConfig } from '../config/payment.config';

class WechatPayService {
  private readonly appId: string;
  private readonly mchId: string;
  private readonly apiKey: string;
  private readonly apiV3Key: string;
  private readonly certPath: string;
  private readonly keyPath: string;
  private readonly notifyUrl: string;

  constructor() {
    this.appId = wechatPayConfig.appId;
    this.mchId = wechatPayConfig.mchId;
    this.apiKey = wechatPayConfig.apiKey;
    this.apiV3Key = wechatPayConfig.apiV3Key;
    this.certPath = wechatPayConfig.certPath;
    this.keyPath = wechatPayConfig.keyPath;
    this.notifyUrl = wechatPayConfig.notifyUrl;
  }

  private generateNonceStr(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateSign(params: Record<string, any>, signType = 'MD5'): string {
    // 1. 对参数按字典序排序
    const sortedKeys = Object.keys(params).sort();
    
    // 2. 拼接字符串
    let stringToSign = sortedKeys
      .map(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          return `${key}=${params[key]}`;
        }
        return '';
      })
      .filter(str => str)
      .join('&');

    // 3. 加入API密钥
    stringToSign += `&key=${this.apiKey}`;

    // 4. 生成签名
    if (signType === 'MD5') {
      return createHash('md5').update(stringToSign).digest('hex').toUpperCase();
    } else if (signType === 'HMAC-SHA256') {
      return createSign('sha256')
        .update(stringToSign)
        .sign(this.apiKey, 'hex')
        .toUpperCase();
    }

    throw new Error('不支持的签名类型');
  }

  async createPayment(order: {
    outTradeNo: string;
    totalAmount: number;
    description: string;
    openid?: string;
  }): Promise<{ codeUrl: string }> {
    try {
      const params = {
        appid: this.appId,
        mch_id: this.mchId,
        nonce_str: this.generateNonceStr(),
        body: order.description,
        out_trade_no: order.outTradeNo,
        total_fee: Math.round(order.totalAmount * 100), // 转换为分
        spbill_create_ip: '127.0.0.1', // 可以根据实际情况获取客户端IP
        notify_url: this.notifyUrl,
        trade_type: order.openid ? 'JSAPI' : 'NATIVE',
        openid: order.openid,
      };

      // 生成签名
      const sign = this.generateSign(params);
      const requestData = {
        ...params,
        sign,
      };

      // 发送请求
      const response = await axios.post(
        'https://api.mch.weixin.qq.com/pay/unifiedorder',
        requestData,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );

      // 解析响应
      if (response.data.return_code === 'SUCCESS' && response.data.result_code === 'SUCCESS') {
        return {
          codeUrl: response.data.code_url,
        };
      }

      throw new Error(response.data.err_code_des || '创建支付失败');
    } catch (error: any) {
      throw new Error(`微信支付创建失败: ${error.message}`);
    }
  }

  async queryOrder(outTradeNo: string): Promise<{
    tradeState: string;
    transactionId?: string;
    openid?: string;
    totalFee?: number;
  }> {
    try {
      const params = {
        appid: this.appId,
        mch_id: this.mchId,
        out_trade_no: outTradeNo,
        nonce_str: this.generateNonceStr(),
      };

      const sign = this.generateSign(params);
      const requestData = {
        ...params,
        sign,
      };

      const response = await axios.post(
        'https://api.mch.weixin.qq.com/pay/orderquery',
        requestData,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );

      if (response.data.return_code === 'SUCCESS') {
        return {
          tradeState: response.data.trade_state,
          transactionId: response.data.transaction_id,
          openid: response.data.openid,
          totalFee: response.data.total_fee ? Number(response.data.total_fee) / 100 : undefined,
        };
      }

      throw new Error(response.data.return_msg || '查询订单失败');
    } catch (error: any) {
      throw new Error(`查询订单失败: ${error.message}`);
    }
  }

  async refund(params: {
    outTradeNo: string;
    outRefundNo: string;
    totalFee: number;
    refundFee: number;
    refundDesc?: string;
  }): Promise<{
    refundId: string;
    refundFee: number;
  }> {
    try {
      const requestData = {
        appid: this.appId,
        mch_id: this.mchId,
        nonce_str: this.generateNonceStr(),
        out_trade_no: params.outTradeNo,
        out_refund_no: params.outRefundNo,
        total_fee: Math.round(params.totalFee * 100),
        refund_fee: Math.round(params.refundFee * 100),
        refund_desc: params.refundDesc,
      };

      const sign = this.generateSign(requestData);
      const finalData = {
        ...requestData,
        sign,
      };

      // 读取证书
      const cert = readFileSync(this.certPath);
      const key = readFileSync(this.keyPath);

      const response = await axios.post(
        'https://api.mch.weixin.qq.com/secapi/pay/refund',
        finalData,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
          httpsAgent: new (require('https').Agent)({
            cert,
            key,
          }),
        }
      );

      if (response.data.return_code === 'SUCCESS' && response.data.result_code === 'SUCCESS') {
        return {
          refundId: response.data.refund_id,
          refundFee: Number(response.data.refund_fee) / 100,
        };
      }

      throw new Error(response.data.err_code_des || '退款失败');
    } catch (error: any) {
      throw new Error(`退款失败: ${error.message}`);
    }
  }

  verifyNotify(params: Record<string, string>, sign: string): boolean {
    const generatedSign = this.generateSign(params);
    return generatedSign === sign;
  }

  async closeOrder(outTradeNo: string): Promise<void> {
    try {
      const params = {
        appid: this.appId,
        mch_id: this.mchId,
        out_trade_no: outTradeNo,
        nonce_str: this.generateNonceStr(),
      };

      const sign = this.generateSign(params);
      const requestData = {
        ...params,
        sign,
      };

      const response = await axios.post(
        'https://api.mch.weixin.qq.com/pay/closeorder',
        requestData,
        {
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      );

      if (response.data.return_code !== 'SUCCESS' || response.data.result_code !== 'SUCCESS') {
        throw new Error(response.data.err_code_des || '关闭订单失败');
      }
    } catch (error: any) {
      throw new Error(`关闭订单失败: ${error.message}`);
    }
  }
}

export const wechatPayService = new WechatPayService(); 