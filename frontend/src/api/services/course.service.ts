import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Chapter {
  id: string;
  title: string;
  duration: number;
  isLocked: boolean;
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  thumbnail: string;
  chapters: Chapter[];
  totalDuration: number;
  enrolledCount: number;
  rating: number;
  isEnrolled?: boolean;
}

export const courseService = {
  async getCourses(): Promise<Course[]> {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  },

  async getCourse(id: string): Promise<Course> {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  },

  async enroll(courseId: string): Promise<void> {
    await axios.post(`${API_URL}/courses/${courseId}/enroll`);
  },

  async updateProgress(courseId: string, chapterId: string, progress: number): Promise<void> {
    await axios.post(`${API_URL}/courses/${courseId}/chapters/${chapterId}/progress`, { progress });
  }
}; 