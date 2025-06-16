import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

interface CreateCommentData {
  content: string;
  courseId: string;
  parentId?: string | null;
}

interface UpdateCommentData {
  content: string;
}

export const commentService = {
  async getComments(courseId: string): Promise<Comment[]> {
    const response = await axios.get(`${API_URL}/courses/${courseId}/comments`);
    return response.data;
  },

  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await axios.post(`${API_URL}/courses/${data.courseId}/comments`, data);
    return response.data;
  },

  async updateComment(courseId: string, commentId: string, data: UpdateCommentData): Promise<Comment> {
    const response = await axios.put(`${API_URL}/courses/${courseId}/comments/${commentId}`, data);
    return response.data;
  },

  async deleteComment(courseId: string, commentId: string): Promise<void> {
    await axios.delete(`${API_URL}/courses/${courseId}/comments/${commentId}`);
  },

  async likeComment(courseId: string, commentId: string): Promise<void> {
    await axios.post(`${API_URL}/courses/${courseId}/comments/${commentId}/like`);
  },

  async unlikeComment(courseId: string, commentId: string): Promise<void> {
    await axios.delete(`${API_URL}/courses/${courseId}/comments/${commentId}/like`);
  }
}; 