import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
  Alert,
  AlertIcon,
  Button,
  Center,
} from '@chakra-ui/react';
import { CourseCard } from '../components/CourseCard';
import { CourseFilters } from '../components/CourseFilters';
import { courseService, type Course, type CourseFilters as FilterOptions } from '../api/services';

const ITEMS_PER_PAGE = 12;

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: ITEMS_PER_PAGE,
  });
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await courseService.getCourses(filters);
      setCourses(response.courses);
      setTotalCourses(response.total);
    } catch (error: any) {
      setError(error.message || '获取课程列表失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Omit<FilterOptions, 'page' | 'limit'>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // 重置页码
    }));
  };

  const handleLoadMore = () => {
    setFilters(prev => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));
  };

  const LoadingSkeleton = () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <Skeleton key={index} height="400px" borderRadius="lg" />
      ))}
    </SimpleGrid>
  );

  const NoCoursesFound = () => (
    <Center py={12}>
      <VStack spacing={4}>
        <Text fontSize="lg" color="gray.600">
          没有找到相关课程
        </Text>
        <Button
          onClick={() => handleFilterChange({ search: '', sortBy: 'createdAt', order: 'desc' })}
          colorScheme="brand"
        >
          清除筛选条件
        </Button>
      </VStack>
    </Center>
  );

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <CourseFilters onFilterChange={handleFilterChange} isLoading={isLoading} />

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {isLoading ? (
            <LoadingSkeleton />
          ) : courses.length === 0 ? (
            <NoCoursesFound />
          ) : (
            <VStack spacing={8} width="100%">
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </SimpleGrid>

              {courses.length < totalCourses && (
                <Button
                  onClick={handleLoadMore}
                  colorScheme="brand"
                  variant="outline"
                  size="lg"
                  isLoading={isLoading}
                >
                  加载更多
                </Button>
              )}
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
} 