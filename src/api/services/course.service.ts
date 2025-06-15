import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  duration: number;
  chapters: Chapter[];
  price: number;
  enrolledCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  order: number;
}

export interface CourseProgress {
  courseId: string;
  completedChapters: string[];
  lastChapterId: string;
  progress: number;
  lastAccessedAt: string;
}

export interface CourseFilters {
  search?: string;
  sortBy?: 'price' | 'rating' | 'enrolledCount' | 'createdAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

class CourseService {
  async getCourses(filters: CourseFilters = {}): Promise<{ courses: Course[]; total: number }> {
    const response = await apiClient.get(API_ENDPOINTS.COURSES.BASE, { params: filters });
    return response.data;
  }

  async getCourseById(id: string): Promise<Course> {
    const response = await apiClient.get(API_ENDPOINTS.COURSES.DETAIL(id));
    return response.data;
  }

  async enrollCourse(courseId: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.COURSES.ENROLL(courseId));
  }

  async getCourseProgress(courseId: string): Promise<CourseProgress> {
    const response = await apiClient.get(API_ENDPOINTS.COURSES.PROGRESS(courseId));
    return response.data;
  }

  async updateCourseProgress(courseId: string, chapterId: string): Promise<CourseProgress> {
    const response = await apiClient.post(API_ENDPOINTS.COURSES.PROGRESS(courseId), {
      chapterId,
      completedAt: new Date().toISOString(),
    });
    return response.data;
  }

  async getUserCourses(): Promise<Course[]> {
    const response = await apiClient.get(API_ENDPOINTS.USER.COURSES);
    return response.data;
  }
}

export const courseService = new CourseService(); 