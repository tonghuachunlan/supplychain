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
  Button,
  Badge,
  useColorModeValue,
  Progress,
  List,
  ListItem,
  ListIcon,
  Stack,
} from '@chakra-ui/react';
import { FiClock, FiUsers, FiStar, FiCheck, FiBookmark } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { courseService, Course } from '../../services/course.service';
import { CommentList } from '../components/CommentList';
import EnrollButton from '../components/EnrollButton';
import { useAuth } from '../../contexts/AuthContext';
import PageTemplate from '../../components/PageTemplate';
import { getDynamicPlaceholderImage } from '../../constants/images';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    if (!courseId) return;
    try {
      const data = await courseService.getCourse(courseId);
      setCourse(data);
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

  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} py={8}>
        <Container maxW="container.xl">
          <Text>加载中...</Text>
        </Container>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box minH="100vh" bg={bgColor} py={8}>
        <Container maxW="container.xl">
          <Text>课程不存在</Text>
        </Container>
      </Box>
    );
  }

  const isEnrolled = user && course.enrolledStudents?.includes(user.id);

  return (
    <PageTemplate
      title={course.title}
      subtitle={course.description}
      breadcrumbs={[
        { title: '供应链学院', link: '/academy' },
        { title: '课程详情' },
      ]}
    >
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <Stack spacing={8}>
            {/* 课程介绍 */}
            <Box>
              <Heading size="md" mb={4}>课程介绍</Heading>
              <Text color="gray.600">{course.description}</Text>
            </Box>

            {/* 学习目标 */}
            <Box>
              <Heading size="md" mb={4}>学习目标</Heading>
              <List spacing={3}>
                {course.learningObjectives.map((objective, index) => (
                  <ListItem key={index} display="flex">
                    <ListIcon as={FiCheck} color="green.500" mt={1} />
                    <Text color="gray.600">{objective}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* 适合人群 */}
            <Box>
              <Heading size="md" mb={4}>适合人群</Heading>
              <Text color="gray.600" whiteSpace="pre-line">
                {course.targetAudience}
              </Text>
            </Box>

            {/* 课程大纲 */}
            <Box>
              <Heading size="md" mb={4}>课程大纲</Heading>
              <List spacing={4}>
                {course.learningPath.map((step, index) => (
                  <ListItem
                    key={index}
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack>
                      <Text fontWeight="bold">{step.title}</Text>
                      <Text fontSize="sm" color="gray.500">
                        预计学习时间：{step.duration}
                      </Text>
                    </Stack>
                    <Badge
                      colorScheme={
                        step.status === 'completed'
                          ? 'green'
                          : step.status === 'current'
                          ? 'blue'
                          : 'gray'
                      }
                    >
                      {step.status === 'completed'
                        ? '已完成'
                        : step.status === 'current'
                        ? '进行中'
                        : '待学习'}
                    </Badge>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </GridItem>

        {/* 右侧信息栏 */}
        <GridItem>
          <Box
            position="sticky"
            top="2rem"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            bg="white"
          >
            <Stack spacing={6}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  ¥{course.price}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {course.enrolledCount}人已报名
                </Text>
              </Box>

              <Stack>
                <Text fontWeight="bold">课程信息</Text>
                <List spacing={3}>
                  <ListItem>
                    <Text color="gray.600">
                      讲师：{course.instructor}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color="gray.600">
                      时长：{course.duration}分钟
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text color="gray.600">
                      评分：{course.rating}
                    </Text>
                  </ListItem>
                </List>
              </Stack>

              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                isDisabled={course.isEnrolled}
              >
                {course.isEnrolled ? '已报名' : '立即报名'}
              </Button>

              {course.prerequisites.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={2}>
                    学习要求
                  </Text>
                  <List spacing={2}>
                    {course.prerequisites.map((prerequisite, index) => (
                      <ListItem
                        key={index}
                        fontSize="sm"
                        color="gray.600"
                      >
                        • {prerequisite}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </PageTemplate>
  );
} 