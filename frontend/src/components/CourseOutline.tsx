import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiPlay, FiCheck, FiLock } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

interface Chapter {
  id: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
}

interface CourseOutlineProps {
  chapters: Chapter[];
  currentChapterId: string;
  isEnrolled: boolean;
}

export default function CourseOutline({
  chapters,
  currentChapterId,
  isEnrolled,
}: CourseOutlineProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack spacing={0} align="stretch" divider={<Box borderColor={borderColor} borderBottomWidth="1px" />}>
        {chapters.map((chapter) => {
          const isCurrent = chapter.id === currentChapterId;
          const isCompleted = chapter.status === 'completed';
          const isLocked = chapter.status === 'locked';

          return (
            <Box
              key={chapter.id}
              p={4}
              bg={isCurrent ? 'blue.50' : undefined}
              _hover={{ bg: isLocked ? undefined : hoverBg }}
              transition="background 0.2s"
            >
              <HStack spacing={4}>
                <Icon
                  as={isCompleted ? FiCheck : isLocked ? FiLock : FiPlay}
                  color={isCompleted ? 'green.500' : isLocked ? 'gray.400' : 'blue.500'}
                />
                <VStack align="start" spacing={1} flex={1}>
                  <Text
                    fontWeight={isCurrent ? 'bold' : 'normal'}
                    color={isLocked ? 'gray.400' : undefined}
                  >
                    {chapter.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {chapter.duration}
                  </Text>
                </VStack>
                {!isLocked && isEnrolled && (
                  <Button
                    as={RouterLink}
                    to={`/learn/${chapter.id}`}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                  >
                    {isCompleted ? '复习' : '学习'}
                  </Button>
                )}
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
} 