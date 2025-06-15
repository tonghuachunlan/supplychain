import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Heading,
  Text,
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
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { VideoPlayer } from '../components/VideoPlayer';
import { CourseOutline } from '../components/CourseOutline';
import { NoteEditor } from '../components/NoteEditor';
import { LearningProgress } from '../components/LearningProgress';
import { courseService } from '../api/services';
import { useAuth } from '../contexts/AuthContext';

export default function CourseLearning() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [currentChapter, setCurrentChapter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchedDuration, setWatchedDuration] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  useEffect(() => {
    if (course && (!chapterId || !course.chapters.find((c: any) => c.id === chapterId))) {
      // 如果没有指定章节或章节不存在，跳转到第一章
      navigate(`/courses/${courseId}/learn/${course.chapters[0].id}`);
    } else if (course && chapterId) {
      setCurrentChapter(course.chapters.find((c: any) => c.id === chapterId));
    }
  }, [course, chapterId, navigate, courseId]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const courseData = await courseService.getCourseById(courseId!);
      setCourse(courseData);
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

  const handleProgressUpdate = async (progress: number) => {
    setWatchedDuration(progress);
    // 可以添加节流来减少更新频率
  };

  const handleChapterComplete = async () => {
    try {
      await courseService.updateCourseProgress(courseId!, currentChapter.id);
      toast({
        title: '进度已更新',
        description: '本章节已完成！',
        status: 'success',
        duration: 3000,
      });
      fetchCourseData(); // 刷新课程数据
    } catch (error: any) {
      toast({
        title: '更新进度失败',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleSaveNote = async (content: string) => {
    // TODO: 实现笔记保存逻辑
    return Promise.resolve();
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
    return null;
  }

  const CourseContent = () => (
    <VStack spacing={6} align="stretch">
      <CourseOutline
        chapters={course.chapters}
        currentChapterId={currentChapter.id}
        completedChapters={course.completedChapters}
        isEnrolled={true}
      />
      <LearningProgress
        chapters={course.chapters}
        completedChapters={course.completedChapters}
        totalDuration={course.duration}
        watchedDuration={watchedDuration}
      />
    </VStack>
                );

                return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid
          templateColumns={{ base: '1fr', lg: '3fr 1fr' }}
          gap={8}
        >
          <GridItem>
            <VStack spacing={8} align="stretch">
              {/* 移动端菜单按钮 */}
              {isMobile && (
                <Button
                  leftIcon={<FiMenu />}
                  onClick={onOpen}
                  display={{ base: 'flex', lg: 'none' }}
                >
                  课程目录
              </Button>
            )}

              {/* 视频播放器 */}
              <Box bg="white" p={4} borderRadius="lg" shadow="sm">
                <VideoPlayer
                  src={currentChapter.videoUrl}
                  title={currentChapter.title}
                  onProgressUpdate={handleProgressUpdate}
                  onComplete={handleChapterComplete}
                  startTime={currentChapter.lastWatchedTime}
                />
              </Box>

              {/* 章节信息 */}
              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <Heading as="h1" size="lg" mb={2}>
                  {currentChapter.title}
                </Heading>
                <Text color="gray.600">{currentChapter.description}</Text>
              </Box>

              {/* 笔记编辑器 */}
              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <NoteEditor
                  courseId={courseId!}
                  chapterId={currentChapter.id}
                  initialNote={currentChapter.note}
                  timestamp={watchedDuration}
                  onSave={handleSaveNote}
                />
              </Box>
            </VStack>
          </GridItem>

          {/* 桌面端侧边栏 */}
          {!isMobile && (
            <GridItem>
              <Box position="sticky" top="20px">
                <CourseContent />
              </Box>
      </GridItem>
          )}
    </Grid>
      </Container>

      {/* 移动端抽屉 */}
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