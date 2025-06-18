import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Heading,
} from '@chakra-ui/react';
import { CourseCard } from '../components/CourseCard';
import { courseService } from '../api/services';
import type { Course } from '../api/services/course.service';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const fetchedCourses = await courseService.getCourses();
        setCourses(fetchedCourses);
      } catch (error: any) {
        setError(error.message || '获取课程列表失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading as="h1" size="xl">所有课程</Heading>
          {courses.length === 0 ? (
            <Text>暂无课程。</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="100%">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
} 