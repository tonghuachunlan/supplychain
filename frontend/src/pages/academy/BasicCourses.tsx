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

const BasicCourses: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const courses = [
    {
      id: 1,
      title: '供应链管理基础',
      description: '了解供应链管理的基本概念、原理和框架',
      duration: '10小时',
      students: 1200,
      rating: 4.8,
      image: 'https://example.com/course1.jpg',
      tags: ['入门', '理论基础'],
    },
    {
      id: 2,
      title: '库存管理入门',
      description: '掌握库存管理的基本方法和工具',
      duration: '8小时',
      students: 980,
      rating: 4.7,
      image: 'https://example.com/course2.jpg',
      tags: ['入门', '库存管理'],
    },
    {
      id: 3,
      title: '采购管理基础',
      description: '学习采购管理的基本流程和策略',
      duration: '12小时',
      students: 1500,
      rating: 4.9,
      image: 'https://example.com/course3.jpg',
      tags: ['入门', '采购管理'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">基础课程</Heading>
        <Text fontSize="xl" color="gray.600">
          从零开始，系统学习供应链管理的基础知识
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
              fallbackSrc="https://via.placeholder.com/400x225"
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
                <HStack spacing={2}>
                  {course.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="blue"
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
                  colorScheme="blue"
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

export default BasicCourses; 