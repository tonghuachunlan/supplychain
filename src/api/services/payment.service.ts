import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

export interface CreateOrderData {
  courseId: string;
  paymentMethod: 'alipay' | 'wechat' | 'creditcard';
}

export interface Order {
  id: string;
  courseId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  refundId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefundData {
  reason: string;
}

class PaymentService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.CREATE_ORDER, data);
    return response.data;
  }

  async getOrderStatus(orderId: string): Promise<Order> {
    const response = await apiClient.get(API_ENDPOINTS.PAYMENTS.ORDER_STATUS(orderId));
    return response.data;
  }

  async requestRefund(orderId: string, data: RefundData): Promise<Order> {
    const response = await apiClient.post(API_ENDPOINTS.PAYMENTS.REFUND(orderId), data);
    return response.data;
  }

  async getUserOrders(): Promise<Order[]> {
    const response = await apiClient.get('/user/orders');
    return response.data;
  }

  // 支付宝支付
  async alipayOrder(orderId: string): Promise<{ payUrl: string }> {
    const response = await apiClient.post(`/payments/alipay/${orderId}`);
    return response.data;
  }

  // 微信支付
  async wechatOrder(orderId: string): Promise<{ qrCode: string }> {
    const response = await apiClient.post(`/payments/wechat/${orderId}`);
    return response.data;
  }

  // 信用卡支付
  async creditCardOrder(orderId: string, cardData: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  }): Promise<Order> {
    const response = await apiClient.post(`/payments/creditcard/${orderId}`, cardData);
    return response.data;
  }
}

export const paymentService = new PaymentService(); 