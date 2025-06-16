import {
  Box,
  VStack,
  HStack,
  Progress,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiClock, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';

interface LearningProgressProps {
  currentSection: {
    title: string;
    progress: number;
    duration: string;
  };
  overallProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
  timeSpent: {
    hours: number;
    minutes: number;
  };
  lastActivity: string;
}

export default function LearningProgress({
  currentSection,
  overallProgress,
  timeSpent,
  lastActivity,
}: LearningProgressProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={bgColor}
      p={6}
    >
      <VStack spacing={6} align="stretch">
        {/* 当前学习进度 */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            当前学习
          </Text>
          <VStack align="stretch" spacing={2}>
            <Text color="gray.600">{currentSection.title}</Text>
            <Progress
              value={currentSection.progress}
              size="sm"
              colorScheme="blue"
              borderRadius="full"
            />
            <HStack justify="space-between" fontSize="sm" color="gray.500">
              <Text>{currentSection.progress}% 完成</Text>
              <Text>{currentSection.duration}</Text>
            </HStack>
          </VStack>
        </Box>

        {/* 整体学习进度 */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            整体进度
          </Text>
          <VStack align="stretch" spacing={3}>
            <HStack spacing={4}>
              <Tooltip label="已完成章节">
                <HStack>
                  <Icon as={FiCheckCircle} color="green.500" />
                  <Text>
                    {overallProgress.completed}/{overallProgress.total} 章节
                  </Text>
                </HStack>
              </Tooltip>
              <Tooltip label="总体完成度">
                <Text color="blue.500" fontWeight="bold">
                  {overallProgress.percentage}%
                </Text>
              </Tooltip>
            </HStack>
            <Progress
              value={overallProgress.percentage}
              size="lg"
              colorScheme="blue"
              borderRadius="full"
              hasStripe
            />
          </VStack>
        </Box>

        {/* 学习时长统计 */}
        <Box>
          <Text fontWeight="bold" mb={2}>
            学习统计
          </Text>
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <HStack>
                <Icon as={FiClock} color="blue.500" />
                <Text>总学习时长</Text>
              </HStack>
              <Text fontWeight="bold">
                {timeSpent.hours}小时 {timeSpent.minutes}分钟
              </Text>
            </HStack>
            <HStack justify="space-between">
              <HStack>
                <Icon as={FiPlayCircle} color="blue.500" />
                <Text>最近学习</Text>
              </HStack>
              <Text color="gray.500">{lastActivity}</Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
} 