import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { courseService, Course } from '../../services/course.service';
import CourseOutline from '../../components/CourseOutline';
import VideoPlayer from '../../components/VideoPlayer';
import LearningProgress from '../../components/LearningProgress';
import PageTemplate from '../../components/PageTemplate';

export default function CourseLearning() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={8}>
        <GridItem>
          <Stack spacing={8}>
            {/* 视频播放器 */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
            >
              <VideoPlayer
                videoUrl="https://example.com/video.mp4"
                poster={course.coverImage}
              />
            </Box>

            {/* 课程大纲 */}
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="sm"
            >
              <CourseOutline
                title="课程大纲"
                steps={course.learningPath}
              />
            </Box>
          </Stack>
        </GridItem>

        {/* 右侧学习进度 */}
        <GridItem>
          <Box
            position="sticky"
            top="2rem"
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="sm"
          >
            <LearningProgress
              progress={course.progress || 0}
              steps={course.learningPath}
            />
          </Box>
        </GridItem>
      </Grid>
    </PageTemplate>
  );
} 