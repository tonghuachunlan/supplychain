import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Stack,
  useToast,
  VStack,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  Progress,
  useColorModeValue,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { courseService, Course } from '../../services/course.service';
import CourseOutline from '../../components/CourseOutline';
import VideoPlayer from '../../components/VideoPlayer';
import LearningProgress from '../../components/LearningProgress';
import PageTemplate from '../../components/PageTemplate';
import { FaPlay, FaLock, FaCheck, FaQuestionCircle } from 'react-icons/fa';

const CourseLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [currentLesson, setCurrentLesson] = useState(0);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  React.useEffect(() => {
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

  if (!course) {
    return null;
  }

  return (
    <PageTemplate
      title={course.title}
      subtitle="开始学习课程内容"
      breadcrumbs={[
        { title: '供应链学院', link: '/academy' },
        { title: '课程学习' },
      ]}
    >
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        {/* 视频播放区域 */}
        <GridItem>
          <Box
            bg={bgColor}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
          >
            <Box
              bg="black"
              aspectRatio="16/9"
              borderRadius="md"
              mb={4}
              position="relative"
            >
              {/* 视频播放器占位 */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <IconButton
                  aria-label="播放视频"
                  icon={<FaPlay />}
                  size="lg"
                  colorScheme="blue"
                  isRound
                />
              </Box>
            </Box>
            <Heading size="md" mb={2}>{course.currentChapter}</Heading>
            <Text color="gray.500">课程进度：{course.progress}%</Text>
            <Progress value={course.progress} size="sm" colorScheme="blue" mt={2} />
          </Box>
        </GridItem>

        {/* 课程目录 */}
        <GridItem>
          <Box
            bg={bgColor}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4}>课程目录</Heading>
            <List spacing={3}>
              {course.lessons.map((lesson, index) => (
                <ListItem
                  key={lesson.id}
                  p={3}
                  borderRadius="md"
                  bg={currentLesson === index ? 'blue.50' : 'transparent'}
                  cursor="pointer"
                  onClick={() => setCurrentLesson(index)}
                >
                  <HStack justify="space-between">
                    <HStack>
                      <ListIcon
                        as={lesson.completed ? FaCheck : FaPlay}
                        color={lesson.completed ? 'green.500' : 'blue.500'}
                      />
                      <Text>{lesson.title}</Text>
                    </HStack>
                    <Text color="gray.500">{lesson.duration}</Text>
                  </HStack>
                </ListItem>
              ))}
            </List>

            {/* 课程问答按钮 */}
            <Button
              leftIcon={<FaQuestionCircle />}
              colorScheme="blue"
              variant="outline"
              mt={6}
              w="full"
              onClick={() => window.location.href = `/courses/${courseId}/qa`}
            >
              课程问答
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </PageTemplate>
  );
};

export default CourseLearning; 