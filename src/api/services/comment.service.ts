import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

export interface Comment {
  id: string;
  content: string;
  courseId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  courseId: string;
  parentId?: string;
}

export interface UpdateCommentData {
  content: string;
}

class CommentService {
  async getComments(courseId: string): Promise<Comment[]> {
    const response = await apiClient.get(API_ENDPOINTS.COMMENTS.LIST(courseId));
    return response.data;
  }

  async createComment(data: CreateCommentData): Promise<Comment> {
    const response = await apiClient.post(API_ENDPOINTS.COMMENTS.CREATE(data.courseId), data);
    return response.data;
  }

  async updateComment(courseId: string, commentId: string, data: UpdateCommentData): Promise<Comment> {
    const response = await apiClient.put(API_ENDPOINTS.COMMENTS.UPDATE(courseId, commentId), data);
    return response.data;
  }

  async deleteComment(courseId: string, commentId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.COMMENTS.DELETE(courseId, commentId));
  }

  async likeComment(courseId: string, commentId: string): Promise<Comment> {
    const response = await apiClient.post(
      `${API_ENDPOINTS.COMMENTS.UPDATE(courseId, commentId)}/like`
    );
    return response.data;
  }

  async unlikeComment(courseId: string, commentId: string): Promise<Comment> {
    const response = await apiClient.post(
      `${API_ENDPOINTS.COMMENTS.UPDATE(courseId, commentId)}/unlike`
    );
    return response.data;
  }
}

export const commentService = new CommentService(); 