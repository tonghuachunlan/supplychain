import {
  Box,
  Progress,
  Text,
  VStack,
  HStack,
  Icon,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { FiClock, FiCheckCircle, FiAward } from 'react-icons/fi';
import { Chapter } from '../api/services/course.service';

interface LearningProgressProps {
  chapters: Chapter[];
  completedChapters: string[];
  totalDuration: number;
  watchedDuration: number;
}

export function LearningProgress({
  chapters,
  completedChapters,
  totalDuration,
  watchedDuration,
}: LearningProgressProps) {
  const completionPercentage = (completedChapters.length / chapters.length) * 100;
  const timePercentage = (watchedDuration / totalDuration) * 100;

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };

  const getProgressStatus = () => {
    if (completionPercentage === 100) {
      return '已完成全部课程';
    }
    if (completionPercentage > 0) {
      return '学习中';
    }
    return '尚未开始学习';
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        {/* 总体进度 */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="lg" fontWeight="medium">
              学习进度
            </Text>
            <Text color="gray.600">{getProgressStatus()}</Text>
          </HStack>
          <Progress
            value={completionPercentage}
            size="lg"
            borderRadius="full"
            colorScheme="brand"
          />
          <HStack justify="space-between" mt={2}>
            <Text fontSize="sm" color="gray.600">
              已完成 {completedChapters.length} / {chapters.length} 章节
            </Text>
            <Text fontSize="sm" color="brand.500" fontWeight="medium">
              {completionPercentage.toFixed(1)}%
            </Text>
          </HStack>
        </Box>

        {/* 学习时长 */}
        <Box>
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            学习时长
          </Text>
          <HStack spacing={8} align="center">
            <CircularProgress
              value={timePercentage}
              size="120px"
              thickness="8px"
              color="brand.500"
            >
              <CircularProgressLabel>
                {timePercentage.toFixed(1)}%
              </CircularProgressLabel>
            </CircularProgress>
            <VStack align="start" spacing={3}>
              <HStack>
                <Icon as={FiClock} color="gray.500" />
                <Text>总时长：{formatDuration(totalDuration)}</Text>
              </HStack>
              <HStack>
                <Icon as={FiCheckCircle} color="green.500" />
                <Text>已学习：{formatDuration(watchedDuration)}</Text>
              </HStack>
              <HStack>
                <Icon as={FiAward} color="brand.500" />
                <Text>剩余：{formatDuration(totalDuration - watchedDuration)}</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* 学习提示 */}
        {completionPercentage < 100 && (
          <Box bg="gray.50" p={4} borderRadius="md">
            <HStack spacing={2}>
              <Icon as={FiClock} color="gray.600" />
              <Text color="gray.600" fontSize="sm">
                继续加油！还有{' '}
                {formatDuration(totalDuration - watchedDuration)} 的内容等待学习
              </Text>
            </HStack>
          </Box>
        )}

        {/* 完成提示 */}
        {completionPercentage === 100 && (
          <Box bg="green.50" p={4} borderRadius="md">
            <HStack spacing={2}>
              <Icon as={FiAward} color="green.500" />
              <Text color="green.700" fontSize="sm">
                恭喜！你已完成全部课程内容
              </Text>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
} 