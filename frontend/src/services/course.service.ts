import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Stage {
  level: string;
  name: string;
  description: string;
}

export interface LearningPathStep {
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  coverImage: string;
  duration: number;
  enrolledCount: number;
  rating: number;
  stage: Stage;
  prerequisites: string[];
  learningPath: LearningPathStep[];
  learningObjectives: string[];
  targetAudience: string;
  isEnrolled?: boolean;
  progress?: number;
}

// 模拟数据服务
const mockCourseData: Course = {
  id: '1',
  title: '物流基础知识',
  description: '了解物流管理的基本概念和原理，掌握现代物流管理的核心要素。',
  coverImage: 'https://placehold.co/800x400',
  instructor: '张教授',
  duration: 600,
  enrolledCount: 100,
  rating: 4.5,
  price: 199,
  stage: {
    level: '第一阶段',
    name: '物流管理基础',
    description: '这是供应链认知四段式中的第一阶段，帮助您建立物流管理的基础认知。'
  },
  prerequisites: [
    '无需特殊前置知识',
    '适合供应链管理初学者',
    '建议具备基础的计算机使用能力'
  ],
  learningPath: [
    {
      title: '物流基础概念',
      status: 'completed',
      duration: '2小时'
    },
    {
      title: '仓储管理基础',
      status: 'current',
      duration: '3小时'
    },
    {
      title: '运输管理入门',
      status: 'upcoming',
      duration: '3小时'
    },
    {
      title: '物流信息系统',
      status: 'upcoming',
      duration: '2小时'
    }
  ],
  learningObjectives: [
    '理解现代物流的基本概念和发展趋势',
    '掌握仓储管理的核心原则和方法',
    '了解运输管理的基本理论和实践',
    '认识物流信息系统的重要性和应用'
  ],
  targetAudience: '本课程适合：\n1. 供应链管理初学者\n2. 物流行业新入职员工\n3. 对物流管理感兴趣的学生\n4. 需要了解物流基础知识的企业管理者',
  progress: 25
};

export const courseService = {
  async getCourses(): Promise<Course[]> {
    // 在实际API准备好之前，返回模拟数据
    return [mockCourseData];
  },

  async getCourse(id: string): Promise<Course> {
    // 在实际API准备好之前，返回模拟数据
    return mockCourseData;
  },

  async enroll(courseId: string): Promise<void> {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async updateProgress(courseId: string, progress: number): Promise<void> {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}; 