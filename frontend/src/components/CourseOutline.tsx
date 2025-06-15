import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  HStack,
  Icon,
  Progress,
  Badge,
} from '@chakra-ui/react';
import { FiClock, FiPlay, FiLock } from 'react-icons/fi';
import { Chapter } from '../api/services/course.service';

interface CourseOutlineProps {
  chapters: Chapter[];
  currentChapterId?: string;
  completedChapters?: string[];
  isEnrolled?: boolean;
}

export function CourseOutline({
  chapters,
  currentChapterId,
  completedChapters = [],
  isEnrolled = false,
}: CourseOutlineProps) {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getChapterStatus = (chapterId: string) => {
    if (completedChapters.includes(chapterId)) {
      return 'completed';
    }
    if (currentChapterId === chapterId) {
      return 'current';
    }
    return 'pending';
  };

  const calculateProgress = () => {
    return (completedChapters.length / chapters.length) * 100;
  };

  return (
    <Box bg="white" borderRadius="lg" shadow="sm">
      {isEnrolled && (
        <Box p={4} borderBottom="1px" borderColor="gray.100">
          <Text mb={2} fontWeight="medium">
            学习进度
          </Text>
          <Progress
            value={calculateProgress()}
            size="sm"
            colorScheme="brand"
            borderRadius="full"
          />
          <Text mt={2} fontSize="sm" color="gray.600">
            已完成 {completedChapters.length} / {chapters.length} 章节
          </Text>
        </Box>
      )}

      <Accordion allowMultiple defaultIndex={[0]}>
        {chapters.map((chapter, index) => (
          <AccordionItem key={chapter.id} border="0">
            <AccordionButton
              py={4}
              px={4}
              _hover={{ bg: 'gray.50' }}
              borderBottom="1px"
              borderColor="gray.100"
            >
              <HStack flex="1" spacing={4}>
                <Text fontWeight="medium" color="gray.700">
                  {index + 1}. {chapter.title}
                </Text>
                {getChapterStatus(chapter.id) === 'completed' && (
                  <Badge colorScheme="green">已完成</Badge>
                )}
                {getChapterStatus(chapter.id) === 'current' && (
                  <Badge colorScheme="blue">学习中</Badge>
                )}
              </HStack>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4} bg="gray.50">
              <Box>
                <Text color="gray.600" fontSize="sm" mb={3}>
                  {chapter.description}
                </Text>
                <HStack spacing={4} fontSize="sm" color="gray.500">
                  <HStack>
                    <Icon as={FiClock} />
                    <Text>{formatDuration(chapter.duration)}</Text>
                  </HStack>
                  {!isEnrolled && (
                    <HStack color="brand.500">
                      <Icon as={FiLock} />
                      <Text>需要报名</Text>
                    </HStack>
                  )}
                  {isEnrolled && (
                    <HStack color="brand.500">
                      <Icon as={FiPlay} />
                      <Text>开始学习</Text>
                    </HStack>
                  )}
                </HStack>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
} 