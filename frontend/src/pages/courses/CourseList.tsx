import { useEffect, useState } from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Stack,
  Input,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import { courseService, Course } from '../../services/course.service';
import CourseCard from '../../components/CourseCard';
import CourseCategory from '../../components/CourseCategory';
import CourseFilters from '../../components/CourseFilters';
import PageTemplate from '../../components/PageTemplate';

const courseCategories = [
  {
    id: 'basic',
    title: '物流管理基础',
    description: '学习供应链管理的基础知识，掌握物流、仓储、运输等核心概念和实践技能。',
    level: '第一阶段',
    courseCount: 4,
    courses: [
      {
        id: '1',
        title: '物流基础知识',
        description: '了解物流管理的基本概念和原理',
        instructor: '张教授',
        duration: '10小时',
      },
      {
        id: '2',
        title: '仓储管理实践',
        description: '掌握现代仓储管理方法和技术',
        instructor: '李教授',
        duration: '12小时',
      },
    ]
  },
  {
    id: 'integration',
    title: '供应链集成管理',
    description: '学习企业内部资源整合、生产计划与控制、采购与库存管理等进阶知识。',
    level: '第二阶段',
    courseCount: 4,
    courses: []
  },
  {
    id: 'network',
    title: '供应链网络协同',
    description: '深入学习供应商关系管理、客户关系管理、跨企业协同等高级主题。',
    level: '第三阶段',
    courseCount: 4,
    courses: []
  },
  {
    id: 'digital',
    title: '数字供应链转型',
    description: '掌握供应链数字化转型方法论、数字技术应用和实施路径。',
    level: '第四阶段',
    courseCount: 4,
    courses: []
  }
];

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await courseService.getCourses();
      setCourses(data);
    } catch (error) {
      toast({
        title: '加载课程失败',
        description: '请稍后重试',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate
      title="课程列表"
      subtitle="探索供应链管理的专业课程"
      breadcrumbs={[
        { title: '供应链学院', link: '/academy' },
        { title: '课程列表' },
      ]}
    >
      <Stack spacing={8}>
        <CourseFilters />
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </SimpleGrid>
      </Stack>
    </PageTemplate>
  );
} 