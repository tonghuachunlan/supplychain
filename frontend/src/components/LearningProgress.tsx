import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiClock, FiCalendar } from 'react-icons/fi';

interface LearningProgressProps {
  currentSection: {
    title: string;
    progress: number;
    duration: string;
  };
  overallProgress: number;
  timeSpent: string;
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
          <Progress
            value={overallProgress}
            size="sm"
            colorScheme="blue"
            borderRadius="full"
          />
          <Text fontSize="sm" color="gray.500" mt={1}>
            总完成度 {overallProgress}%
          </Text>
        </Box>

        {/* 学习统计 */}
        <VStack spacing={3}>
          <HStack w="full" justify="space-between">
            <HStack>
              <Icon as={FiClock} color="blue.500" />
              <Text fontSize="sm" color="gray.600">
                学习时长
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="bold">
              {timeSpent}
            </Text>
          </HStack>

          <HStack w="full" justify="space-between">
            <HStack>
              <Icon as={FiCalendar} color="blue.500" />
              <Text fontSize="sm" color="gray.600">
                最近学习
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="bold">
              {lastActivity}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
} 