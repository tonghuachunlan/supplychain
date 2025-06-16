import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Heading,
  Button,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { Course } from '../services/course.service';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
    >
      <Image
        src={course.coverImage}
        alt={course.title}
        height="200px"
        width="100%"
        objectFit="cover"
      />

      <Stack p={4} spacing={3}>
        <HStack>
          <Badge colorScheme="blue">{course.stage.level}</Badge>
          {course.isEnrolled && <Badge colorScheme="green">已报名</Badge>}
        </HStack>

        <Heading size="md" noOfLines={2}>
          {course.title}
        </Heading>

        <Text color={textColor} noOfLines={2}>
          {course.description}
        </Text>

        <HStack spacing={4}>
          <HStack>
            <Icon as={FiClock} color="gray.500" />
            <Text fontSize="sm" color="gray.500">
              {course.duration}分钟
            </Text>
          </HStack>
          <HStack>
            <Icon as={FiUsers} color="gray.500" />
            <Text fontSize="sm" color="gray.500">
              {course.enrolledCount}人
            </Text>
          </HStack>
          <HStack>
            <Icon as={FiStar} color="gray.500" />
            <Text fontSize="sm" color="gray.500">
              {course.rating}
            </Text>
          </HStack>
        </HStack>

        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg" color="blue.500">
            ¥{course.price}
          </Text>
          <Button
            as={RouterLink}
            to={`/academy/courses/${course.id}`}
            colorScheme="blue"
            size="sm"
          >
            {course.isEnrolled ? '继续学习' : '查看详情'}
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
} 