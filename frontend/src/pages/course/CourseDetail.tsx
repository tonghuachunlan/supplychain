import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  HStack,
  Icon,
  Badge,
  Divider,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { FiPlay, FiClock, FiUsers, FiCheckCircle, FiMessageSquare, FiBook } from 'react-icons/fi';

// 模拟数据
const courses = {
  'sct-basic': {
    id: 'sct-basic',
    title: '供应链思维基础课程',
    subtitle: '掌握供应链思维的核心理念',
    cover: '/images/courses/sct-basic.svg',
    description: '本课程将帮助您全面理解供应链思维的核心概念，掌握供应链七大链性理论，以及供应链认知四段式理念。通过实际案例分析，深入理解供应链在企业战略制定与执行中的重要地位。',
    instructor: {
      name: '吴树贵',
      title: '供应链管理专家',
      avatar: '/images/experts/expert-wu.svg',
    },
    chapters: [
      {
        id: 'ch1',
        title: '第一章：供应链思维导论',
        duration: '45分钟',
        description: '介绍供应链思维的基本概念和发展历程',
        videoUrl: '#',
      },
      {
        id: 'ch2',
        title: '第二章：供应链七大链性',
        duration: '60分钟',
        description: '深入解析供应链七大链性理论',
        videoUrl: '#',
      },
      {
        id: 'ch3',
        title: '第三章：供应链认知四段式',
        duration: '45分钟',
        description: '详细讲解供应链认知四段式理念',
        videoUrl: '#',
      },
      {
        id: 'ch4',
        title: '第四章：数字化转型基础',
        duration: '60分钟',
        description: '探讨供应链数字化转型的基础知识',
        videoUrl: '#',
      },
    ],
    features: [
      '在线视频课程',
      '专家答疑解惑',
      '同学社群交流',
      '课后练习题',
    ],
    duration: '12课时',
    students: 1200,
    price: 299,
  },
  'sct-advanced': {
    id: 'sct-advanced',
    title: '供应链数字化转型实战',
    subtitle: '深入供应链转型实践案例',
    cover: '/images/courses/sct-advanced.svg',
    description: '本课程将带您深入供应链数字化转型的实践领域，通过真实案例分析，掌握数字化转型战略规划、供应链数字平台建设等核心技能。',
    instructor: {
      name: '吴树贵',
      title: '供应链管理专家',
      avatar: '/images/experts/expert-wu.svg',
    },
    chapters: [
      {
        id: 'ch1',
        title: '第一章：数字化转型战略规划',
        duration: '60分钟',
        description: '制定企业数字化转型战略',
        videoUrl: '#',
      },
      {
        id: 'ch2',
        title: '第二章：供应链数字平台建设',
        duration: '90分钟',
        description: '构建供应链数字平台',
        videoUrl: '#',
      },
      {
        id: 'ch3',
        title: '第三章：企业转型案例分析',
        duration: '60分钟',
        description: '分析成功转型案例',
        videoUrl: '#',
      },
      {
        id: 'ch4',
        title: '第四章：转型方案设计实践',
        duration: '90分钟',
        description: '设计企业转型方案',
        videoUrl: '#',
      },
    ],
    features: [
      '深度案例解析',
      '实战项目指导',
      '专家在线答疑',
      '方案点评',
    ],
    duration: '16课时',
    students: 800,
    price: 499,
  },
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses[courseId as keyof typeof courses];
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!course) {
    return (
      <Box minH="100vh" bg="gray.50" py={12}>
        <Container maxW="container.lg">
          <Text>课程不存在</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Box w="full">
            <Image
              src={course.cover}
              alt={course.title}
              w="full"
              h="400px"
              objectFit="cover"
              borderRadius="xl"
            />
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
            <VStack align="flex-start" spacing={6}>
              <Box>
                <Heading size="xl">{course.title}</Heading>
                <Text color="gray.600" fontSize="lg" mt={2}>
                  {course.subtitle}
                </Text>
              </Box>

              <HStack spacing={6}>
                <HStack>
                  <Icon as={FiClock} />
                  <Text>{course.duration}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiUsers} />
                  <Text>{course.students}人在学</Text>
                </HStack>
                <Badge colorScheme="green">热门</Badge>
              </HStack>

              <Text color="gray.600">{course.description}</Text>

              <SimpleGrid columns={2} spacing={4} w="full">
                {course.features.map((feature, index) => (
                  <HStack key={index} spacing={2}>
                    <Icon as={FiCheckCircle} color="green.500" />
                    <Text>{feature}</Text>
                  </HStack>
                ))}
              </SimpleGrid>

              <HStack spacing={4}>
                <Button
                  as={Link}
                  to={`/course/${course.id}/learn`}
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FiPlay />}
                >
                  开始学习
                </Button>
                <Button
                  as={Link}
                  to={`/course/${course.id}/qa`}
                  variant="outline"
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FiMessageSquare />}
                >
                  课程问答
                </Button>
              </HStack>
            </VStack>

            <Card bg={bg} shadow="lg">
              <CardHeader>
                <Heading size="md">课程章节</Heading>
              </CardHeader>
              <CardBody>
                <List spacing={4}>
                  {course.chapters.map((chapter) => (
                    <ListItem key={chapter.id}>
                      <HStack spacing={4}>
                        <ListIcon as={FiBook} color="blue.500" />
                        <Box flex={1}>
                          <Text fontWeight="bold">{chapter.title}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {chapter.description}
                          </Text>
                        </Box>
                        <Text fontSize="sm" color="gray.500">
                          {chapter.duration}
                        </Text>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Divider />

          <Box w="full">
            <Heading size="lg" mb={6}>讲师介绍</Heading>
            <Card bg={bg} shadow="md">
              <CardBody>
                <HStack spacing={6}>
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    boxSize="100px"
                    borderRadius="full"
                  />
                  <VStack align="flex-start" spacing={2}>
                    <Heading size="md">{course.instructor.name}</Heading>
                    <Text color="blue.500">{course.instructor.title}</Text>
                    <Text color="gray.600">
                      20年+供应链管理和数字化转型经验，服务数百家企业供应链转型实践
                    </Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 