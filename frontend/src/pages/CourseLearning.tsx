import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Button,
  useToast,
  Alert,
  AlertIcon,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { VideoPlayer } from '../components/VideoPlayer';
import { CourseOutline } from '../components/CourseOutline';
import { courseService } from '../api/services';
import type { Course, Chapter } from '../api/services/course.service';

export default function CourseLearning() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  useEffect(() => {
    if (course && chapterId && course.chapters?.length > 0) {
      const chapterExists = course.chapters.find((c: Chapter) => c.id === chapterId);
      if (!chapterExists) {
        navigate(`/courses/${courseId}/learn/${course.chapters[0].id}`);
      } else {
        setCurrentChapter(chapterExists);
      }
    }
  }, [course, chapterId, navigate, courseId]);

  const fetchCourseData = async () => {
    try {
      setError(null);
      const courseData = await courseService.getCourse(courseId!);
      setCourse(courseData);
      if (!chapterId && courseData.chapters?.length > 0) {
        navigate(`/courses/${courseId}/learn/${courseData.chapters[0].id}`);
      }
    } catch (error: any) {
      setError(error.message || '获取课程信息失败');
      toast({
        title: '加载失败',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

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

  if (!course || !currentChapter) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  const CourseContent = () => (
    <VStack spacing={6} align="stretch">
      <CourseOutline
        chapters={course.chapters}
        currentChapterId={currentChapter.id}
        completedChapters={[]}
        isEnrolled={true}
      />
    </VStack>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={8}>
          <GridItem>
            <VStack spacing={8} align="stretch">
              {isMobile && (
                <Button
                  leftIcon={<FiMenu />}
                  onClick={onOpen}
                  display={{ base: 'flex', lg: 'none' }}
                >
                  课程目录
                </Button>
              )}

              <Box bg="white" p={4} borderRadius="lg" shadow="sm">
                <VideoPlayer
                  videoUrl={""}
                />
              </Box>

              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <Heading as="h1" size="lg" mb={2}>
                  {currentChapter.title}
                </Heading>
              </Box>
            </VStack>
          </GridItem>

          {!isMobile && (
            <GridItem>
              <Box position="sticky" top="20px">
                <CourseContent />
              </Box>
            </GridItem>
          )}
        </Grid>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>课程目录</DrawerHeader>
          <DrawerBody>
            <CourseContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
} 