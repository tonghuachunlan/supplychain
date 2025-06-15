import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Comment {
  id: string;
  courseId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export const commentService = {
  async getComments(courseId: string): Promise<Comment[]> {
    const response = await axios.get(`${API_URL}/courses/${courseId}/comments`);
    return response.data;
  },

  async createComment(courseId: string, content: string): Promise<Comment> {
    const response = await axios.post(`${API_URL}/courses/${courseId}/comments`, { content });
    return response.data;
  },

  async likeComment(commentId: string): Promise<void> {
    await axios.post(`${API_URL}/comments/${commentId}/like`);
  },

  async replyToComment(commentId: string, content: string): Promise<Comment> {
    const response = await axios.post(`${API_URL}/comments/${commentId}/replies`, { content });
    return response.data;
  }
}; 