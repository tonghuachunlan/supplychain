export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  joinDate: string;
}

export interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  totalLearningTime: number;
  averageDailyTime: number;
  learningDays: number;
  lastWeekTime: number;
  thisWeekTime: number;
}

export interface UserProfile {
  user: User;
  learningStats: LearningStats;
} 