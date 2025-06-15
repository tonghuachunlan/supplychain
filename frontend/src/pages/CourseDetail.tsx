import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Skeleton,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { courseService, commentService } from '../api/services';
import { CourseOutline } from '../components/CourseOutline';
import { CommentList } from '../components/CommentList';
import { EnrollButton } from '../components/EnrollButton';
import { useAuth } from '../contexts/AuthContext';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 并行获取课程信息和评论
      const [courseData, commentsData] = await Promise.all([
        courseService.getCourseById(courseId!),
        commentService.getComments(courseId!),
      ]);
      
      setCourse(courseData);
      setComments(commentsData);
    } catch (error: any) {
      setError(error.message || '获取课程信息失败');
      toast({
        title: '加载失败',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <Skeleton height="400px" mb={8} />
            <Skeleton height="200px" />
          </GridItem>
          <GridItem>
            <Skeleton height="300px" />
          </GridItem>
        </Grid>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error || '课程不存在'}
        </Alert>
      </Container>
    );
  }

  const isEnrolled = user && course.enrolledStudents?.includes(user.id);

  return (
    <Box bg="gray.50" minH="100vh">
      {/* 课程头部信息 */}
      <Box bg="white" py={8} borderBottom="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <GridItem>
              <Image
                src={course.coverImage}
                alt={course.title}
                borderRadius="lg"
                objectFit="cover"
                width="100%"
                height="400px"
              />
            </GridItem>
            <GridItem>
              <VStack align="stretch" spacing={6}>
                <Heading as="h1" size="xl">
                  {course.title}
                </Heading>

                <Text color="gray.600">{course.description}</Text>

                <HStack spacing={6}>
                  <HStack>
                    <Icon as={FiClock} />
                    <Text>{Math.round(course.duration / 60)} 小时</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text>{course.enrolledCount} 人已报名</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiStar} />
                    <Text>{course.rating.toFixed(1)}</Text>
                  </HStack>
                </HStack>

                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="brand.500" mb={4}>
                    ¥ {course.price.toFixed(2)}
                  </Text>
                  <EnrollButton
                    courseId={course.id}
                    price={course.price}
                    isEnrolled={isEnrolled}
                  />
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* 课程内容和评论 */}
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <GridItem>
            <Tabs colorScheme="brand">
              <TabList mb={4}>
                <Tab>课程介绍</Tab>
                <Tab>课程评价</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0}>
                  <VStack align="stretch" spacing={6}>
                    <Box bg="white" p={6} borderRadius="lg">
                      <Heading as="h3" size="md" mb={4}>
                        课程介绍
                      </Heading>
                      <Text whiteSpace="pre-line">{course.description}</Text>
                    </Box>

                    <Box bg="white" p={6} borderRadius="lg">
                      <Heading as="h3" size="md" mb={4}>
                        你将学到
                      </Heading>
                      <VStack align="stretch" spacing={2}>
                        {course.learningObjectives?.map((objective: string, index: number) => (
                          <HStack key={index}>
                            <Text>•</Text>
                            <Text>{objective}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>

                    <Box bg="white" p={6} borderRadius="lg">
                      <Heading as="h3" size="md" mb={4}>
                        适合人群
                      </Heading>
                      <Text whiteSpace="pre-line">{course.targetAudience}</Text>
                    </Box>
                  </VStack>
                </TabPanel>

                <TabPanel p={0}>
                  <Box bg="white" p={6} borderRadius="lg">
                    <CommentList
                      courseId={course.id}
                      comments={comments}
                      onCommentUpdate={fetchCourseData}
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>

          <GridItem>
            <Box position="sticky" top="20px">
              <CourseOutline
                chapters={course.chapters}
                isEnrolled={isEnrolled}
                completedChapters={course.completedChapters}
                currentChapterId={course.currentChapterId}
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
} 