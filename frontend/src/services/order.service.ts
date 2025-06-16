import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Course {
  id: string;
  title: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  course: Course;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

class OrderService {
  async getUserOrders(status?: string): Promise<Order[]> {
    const response = await axios.get(`${API_URL}/orders`, {
      params: { status },
    });
    return response.data;
  }

  async verifyPayment(orderId: string): Promise<void> {
    await axios.post(`${API_URL}/orders/${orderId}/verify-payment`);
  }

  async requestRefund(orderId: string): Promise<void> {
    await axios.post(`${API_URL}/orders/${orderId}/refund`);
  }

  async getOrderDetails(orderId: string): Promise<Order> {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  }
}

export const orderService = new OrderService(); 