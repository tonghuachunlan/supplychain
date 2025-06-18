import { Box, Image, Text, Stack, Badge, Button, HStack, Icon } from '@chakra-ui/react';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import type { Course } from '../api/services/course.service';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image
        src={course.thumbnail}
        alt={course.title}
        height="200px"
        width="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/400x200?text=课程封面"
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="brand">
            NEW
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {course.instructor}
          </Box>
        </Box>

        <Text
          mt="2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={2}
          fontSize="lg"
        >
          {course.title}
        </Text>

        <Text mt="2" color="gray.600" fontSize="sm" noOfLines={2}>
          {course.description}
        </Text>

        <Stack mt="4" spacing={2}>
          <HStack spacing={4} fontSize="sm" color="gray.600">
            <HStack>
              <Icon as={FiClock} />
              <Text>{Math.round(course.totalDuration / 60)} 分钟</Text>
            </HStack>
            <HStack>
              <Icon as={FiUsers} />
              <Text>{course.enrolledCount} 人已报名</Text>
            </HStack>
            <HStack>
              <Icon as={FiStar} />
              <Text>{course.rating.toFixed(1)}</Text>
            </HStack>
          </HStack>

          <HStack justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg" color="brand.500">
              ¥ {course.price.toFixed(2)}
            </Text>
            <Button
              as={RouterLink}
              to={`/courses/${course.id}`}
              colorScheme="brand"
              size="sm"
            >
              查看详情
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
} 