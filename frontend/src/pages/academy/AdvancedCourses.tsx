import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  Badge,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const AdvancedCourses: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const courses = [
    {
      id: 1,
      title: '供应链战略规划',
      description: '深入学习供应链战略规划的方法论和实践',
      duration: '15小时',
      students: 800,
      rating: 4.9,
      image: '/images/courses/strategy-planning.svg',
      tags: ['进阶', '战略规划'],
      prerequisites: ['供应链管理基础'],
    },
    {
      id: 2,
      title: '供应链网络优化',
      description: '掌握供应链网络设计和优化的高级技能',
      duration: '20小时',
      students: 600,
      rating: 4.8,
      image: '/images/courses/network-optimization.svg',
      tags: ['进阶', '网络优化'],
      prerequisites: ['供应链管理基础', '运营管理'],
    },
    {
      id: 3,
      title: '供应链风险管理',
      description: '学习供应链风险识别、评估和管理的高级方法',
      duration: '18小时',
      students: 750,
      rating: 4.9,
      image: '/images/courses/risk-management.svg',
      tags: ['进阶', '风险管理'],
      prerequisites: ['供应链管理基础', '风险管理基础'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">进阶课程</Heading>
        <Text fontSize="xl" color="gray.600">
          深入学习供应链管理的高级知识和技能
        </Text>
      </VStack>

      {/* 课程列表 */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {courses.map((course) => (
          <Box
            key={course.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <Image
              src={course.image}
              alt={course.title}
              fallbackSrc="/images/placeholder-course.svg"
              objectFit="cover"
              h="200px"
              w="100%"
            />
            <Box p={6}>
              <VStack align="start" spacing={4}>
                <Heading size="md">{course.title}</Heading>
                <Text color="gray.600" noOfLines={2}>
                  {course.description}
                </Text>
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiClock} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {course.duration}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiUsers} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {course.students}人学习
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiStar} color="yellow.500" />
                    <Text fontSize="sm" color="gray.500">
                      {course.rating}
                    </Text>
                  </HStack>
                </HStack>
                <VStack align="start" spacing={2} width="100%">
                  <Text fontSize="sm" fontWeight="bold">
                    课程要求：
                  </Text>
                  {course.prerequisites.map((prerequisite, index) => (
                    <Text key={index} fontSize="sm" color="gray.600">
                      • {prerequisite}
                    </Text>
                  ))}
                </VStack>
                <HStack spacing={2}>
                  {course.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="purple"
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>
                <Button
                  as={RouterLink}
                  to={`/academy/courses/${course.id}`}
                  colorScheme="purple"
                  width="100%"
                >
                  开始学习
                </Button>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default AdvancedCourses; 