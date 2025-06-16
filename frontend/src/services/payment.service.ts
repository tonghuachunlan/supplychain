import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Order {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: string;
  paymentMethod: string;
}

export const paymentService = {
  async createOrder(courseId: string): Promise<Order> {
    const response = await axios.post(`${API_URL}/orders`, { courseId });
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  },

  async requestRefund(orderId: string): Promise<void> {
    await axios.post(`${API_URL}/orders/${orderId}/refund`);
  },

  async processPayment(orderId: string, paymentMethod: string): Promise<void> {
    await axios.post(`${API_URL}/orders/${orderId}/pay`, { paymentMethod });
  }
}; 