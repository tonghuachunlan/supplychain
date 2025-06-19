import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Progress,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FiMoreVertical, FiPlay, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Course } from '../api/services/course.service';
import { getPlaceholderImage } from '../constants/images';

interface MyCourseListProps {
  courses: (Course & {
    progress: number;
    lastAccessTime?: string;
    completedChapters: string[];
  })[];
  onRemove?: (courseId: string) => Promise<void>;
}

export function MyCourseList({ courses, onRemove }: MyCourseListProps) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleRemove = async (courseId: string) => {
    try {
      await onRemove?.(courseId);
      toast({
        title: '移除成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '移除失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const formatLastAccessTime = (time?: string) => {
    if (!time) return '尚未开始学习';
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return '今天';
    } else if (days === 1) {
      return '昨天';
    } else if (days < 30) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCourseStatus = (progress: number) => {
    if (progress === 100) {
      return { label: '已完成', color: 'green' };
    }
    if (progress > 0) {
      return { label: '学习中', color: 'blue' };
    }
    return { label: '未开始', color: 'gray' };
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="medium">
            我的课程
          </Text>
          <Text color="gray.600">
            共 {courses.length} 门课程
          </Text>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course) => (
            <Box
              key={course.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            >
              <Image
                src={course.coverImage || getPlaceholderImage('course', 'medium')}
                alt={course.title}
                height="160px"
                width="100%"
                objectFit="cover"
                fallbackSrc={getPlaceholderImage('course', 'medium')}
              />

              <Box p={4}>
                <HStack justify="space-between" mb={2}>
                  <Badge colorScheme={getCourseStatus(course.progress).color}>
                    {getCourseStatus(course.progress).label}
                  </Badge>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreVertical />}
                      variant="ghost"
                      size="sm"
                      aria-label="更多操作"
                    />
                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          navigate(`/courses/${course.id}/learn/${course.chapters[0].id}`)
                        }
                      >
                        继续学习
                      </MenuItem>
                      <MenuItem onClick={() => handleRemove(course.id)}>
                        移除课程
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>

                <Text
                  fontWeight="semibold"
                  fontSize="md"
                  noOfLines={2}
                  mb={2}
                >
                  {course.title}
                </Text>

                <Progress
                  value={course.progress}
                  size="sm"
                  borderRadius="full"
                  colorScheme="brand"
                  mb={3}
                />

                <HStack justify="space-between" fontSize="sm" color="gray.600">
                  <HStack>
                    <FiClock />
                    <Text>
                      上次学习：{formatLastAccessTime(course.lastAccessTime)}
                    </Text>
                  </HStack>
                  <Text>
                    {course.completedChapters.length}/{course.chapters.length} 章节
                  </Text>
                </HStack>

                <Button
                  leftIcon={<FiPlay />}
                  colorScheme="brand"
                  variant="ghost"
                  size="sm"
                  width="100%"
                  mt={4}
                  onClick={() =>
                    navigate(`/courses/${course.id}/learn/${course.chapters[0].id}`)
                  }
                >
                  继续学习
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {courses.length === 0 && (
          <Box
            py={12}
            textAlign="center"
            bg="gray.50"
            borderRadius="md"
          >
            <Text color="gray.600">
              还没有报名任何课程，快去选择感兴趣的课程吧！
            </Text>
            <Button
              colorScheme="brand"
              mt={4}
              onClick={() => navigate('/courses')}
            >
              浏览课程
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
} 