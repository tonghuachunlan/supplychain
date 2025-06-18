import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Image,
  Tag,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  Icon,
  Progress,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { FiBook, FiVideo, FiMessageSquare, FiArrowRight, FiAward, FiUsers, FiTarget, FiCheckCircle, FiClock } from 'react-icons/fi';

// 模拟课程数据
const courseData = {
  'sct-basic': {
    id: 'sct-basic',
    title: '供应链思维基础课程',
    subtitle: '掌握供应链思维的核心理念',
    instructor: '吴树贵',
    instructorTitle: '供应链管理专家',
    instructorAvatar: '/images/experts/expert-wu.svg',
    coverImage: '/images/courses/sct-basic.svg',
    price: 299,
    originalPrice: 399,
    duration: '12课时',
    students: 1200,
    rating: 4.9,
    description: '本课程从数字化转型和数字技术应用等角度，重新定义了供应链，介绍了其发展趋势，全面分析了如何运用供应链思维统筹数字化转型。课程详细探讨了供应链七大链性，以及交易在其中的关键作用，揭示了供应链在企业战略制定与执行中的重要地位。',
    learningObjectives: [
      '理解供应链思维的核心概念和基本原理',
      '掌握供应链七大链性的理论框架',
      '了解供应链认知"四段式"理念',
      '掌握数字化转型的基础知识'
    ],
    chapters: [
      {
        title: '第一章：供应链思维导论',
        lessons: [
          { title: '1.1 什么是供应链思维', duration: '30分钟' },
          { title: '1.2 供应链思维的重要性', duration: '25分钟' },
          { title: '1.3 供应链思维的应用场景', duration: '35分钟' }
        ]
      },
      {
        title: '第二章：供应链七大链性',
        lessons: [
          { title: '2.1 七大链性概述', duration: '40分钟' },
          { title: '2.2 需求链与资源链', duration: '45分钟' },
          { title: '2.3 价值链与协同链', duration: '40分钟' },
          { title: '2.4 知识链、数据链与风险链', duration: '50分钟' }
        ]
      },
      {
        title: '第三章：供应链认知四段式',
        lessons: [
          { title: '3.1 认知四段式概述', duration: '35分钟' },
          { title: '3.2 各阶段特征分析', duration: '45分钟' },
          { title: '3.3 阶段提升策略', duration: '40分钟' }
        ]
      },
      {
        title: '第四章：数字化转型基础',
        lessons: [
          { title: '4.1 数字化转型概述', duration: '30分钟' },
          { title: '4.2 数字化工具与方法', duration: '45分钟' },
          { title: '4.3 转型路径规划', duration: '40分钟' }
        ]
      }
    ],
    features: [
      { icon: FiVideo, title: '在线视频课程', description: '精心制作的高清视频课程' },
      { icon: FiMessageSquare, title: '专家答疑解惑', description: '资深专家在线答疑' },
      { icon: FiUsers, title: '同学社群交流', description: '与同学互动学习' },
      { icon: FiBook, title: '课后练习题', description: '巩固所学知识' }
    ]
  },
  'sct-advanced': {
    id: 'sct-advanced',
    title: '供应链数字化转型实战',
    subtitle: '深入供应链转型实践案例',
    instructor: '吴树贵',
    instructorTitle: '供应链管理专家',
    instructorAvatar: '/images/experts/wushugui.jpg',
    coverImage: 'https://via.placeholder.com/1200x600/2B6CB0/FFFFFF?text=供应链数字化转型实战',
    price: 499,
    originalPrice: 599,
    duration: '16课时',
    students: 800,
    rating: 4.8,
    description: '本课程深入探讨供应链数字化转型的实践案例，帮助学员掌握转型方法论和实施技巧。通过大量实际案例分析，学员将了解如何在企业中推进数字化转型项目，应对转型过程中的各种挑战。',
    learningObjectives: [
      '掌握供应链数字化转型的方法论',
      '学习数字化平台建设的关键要素',
      '了解企业转型案例的实践经验',
      '掌握转型方案设计的技巧'
    ],
    chapters: [
      {
        title: '第一章：数字化转型战略规划',
        lessons: [
          { title: '1.1 转型战略制定方法', duration: '45分钟' },
          { title: '1.2 转型目标设定', duration: '40分钟' },
          { title: '1.3 转型路径规划', duration: '45分钟' }
        ]
      },
      {
        title: '第二章：供应链数字平台建设',
        lessons: [
          { title: '2.1 平台架构设计', duration: '50分钟' },
          { title: '2.2 核心功能模块', duration: '55分钟' },
          { title: '2.3 数据治理策略', duration: '45分钟' }
        ]
      },
      {
        title: '第三章：企业转型案例分析',
        lessons: [
          { title: '3.1 制造业转型案例', duration: '60分钟' },
          { title: '3.2 零售业转型案例', duration: '55分钟' },
          { title: '3.3 物流业转型案例', duration: '50分钟' }
        ]
      },
      {
        title: '第四章：转型方案设计实践',
        lessons: [
          { title: '4.1 需求分析方法', duration: '45分钟' },
          { title: '4.2 方案设计技巧', duration: '50分钟' },
          { title: '4.3 实施计划制定', duration: '45分钟' },
          { title: '4.4 效果评估体系', duration: '40分钟' }
        ]
      }
    ],
    features: [
      { icon: FiBook, title: '深度案例解析', description: '真实企业转型案例' },
      { icon: FiTarget, title: '实战项目指导', description: '专家实战指导' },
      { icon: FiMessageSquare, title: '专家在线答疑', description: '及时解答疑问' },
      { icon: FiAward, title: '方案点评', description: '专业方案点评' }
    ]
  }
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseData[courseId as keyof typeof courseData];
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  if (!course) {
    return <Box>课程不存在</Box>;
  }

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* 课程头部信息 */}
          <Box bg={bg} p={8} borderRadius="xl" shadow="lg">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <VStack align="flex-start" spacing={6}>
                <VStack align="flex-start" spacing={2}>
                  <Heading size="xl">{course.title}</Heading>
                  <Text color="gray.600" fontSize="xl">
                    {course.subtitle}
                  </Text>
                </VStack>

                <HStack spacing={4}>
                  <Image
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    boxSize="60px"
                    borderRadius="full"
                  />
                  <VStack align="flex-start" spacing={1}>
                    <Text fontWeight="bold">{course.instructor}</Text>
                    <Text color="gray.600">{course.instructorTitle}</Text>
                  </VStack>
                </HStack>

                <SimpleGrid columns={3} spacing={6}>
                  <VStack>
                    <Icon as={FiClock} color="blue.500" boxSize={6} />
                    <Text fontWeight="bold">{course.duration}</Text>
                    <Text color="gray.600" fontSize="sm">课程时长</Text>
                  </VStack>
                  <VStack>
                    <Icon as={FiUsers} color="blue.500" boxSize={6} />
                    <Text fontWeight="bold">{course.students}</Text>
                    <Text color="gray.600" fontSize="sm">在学人数</Text>
                  </VStack>
                  <VStack>
                    <Icon as={FiAward} color="blue.500" boxSize={6} />
                    <Text fontWeight="bold">{course.rating}</Text>
                    <Text color="gray.600" fontSize="sm">课程评分</Text>
                  </VStack>
                </SimpleGrid>

                <VStack align="flex-start" spacing={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    ¥{course.price}
                  </Text>
                  <Text color="gray.500" textDecoration="line-through">
                    原价 ¥{course.originalPrice}
                  </Text>
                </VStack>

                <HStack spacing={4}>
                  <Button
                    as={Link}
                    to={`/course/${course.id}/learn`}
                    colorScheme="blue"
                    size="lg"
                    rightIcon={<FiVideo />}
                  >
                    立即学习
                  </Button>
                  <Button
                    as={Link}
                    to={`/course/${course.id}/qa`}
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
                    rightIcon={<FiMessageSquare />}
                  >
                    课程问答
                  </Button>
                </HStack>
              </VStack>

              <Box>
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  borderRadius="lg"
                  w="full"
                  h="400px"
                  objectFit="cover"
                />
              </Box>
            </SimpleGrid>
          </Box>

          {/* 课程详情标签页 */}
          <Box bg={bg} p={8} borderRadius="xl" shadow="lg">
            <Tabs>
              <TabList>
                <Tab>课程介绍</Tab>
                <Tab>课程大纲</Tab>
                <Tab>课程特色</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    <Box>
                      <Heading size="md" mb={4}>课程简介</Heading>
                      <Text color="gray.600" whiteSpace="pre-line">
                        {course.description}
                      </Text>
                    </Box>

                    <Box>
                      <Heading size="md" mb={4}>学习目标</Heading>
                      <List spacing={3}>
                        {course.learningObjectives.map((objective, index) => (
                          <ListItem key={index}>
                            <HStack>
                              <ListIcon as={FiCheckCircle} color="green.500" />
                              <Text>{objective}</Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={6}>
                    {course.chapters.map((chapter, index) => (
                      <Box key={index}>
                        <Heading size="md" mb={4}>{chapter.title}</Heading>
                        <List spacing={3}>
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <ListItem
                              key={lessonIndex}
                              p={3}
                              bg="gray.50"
                              borderRadius="md"
                            >
                              <HStack justify="space-between">
                                <HStack>
                                  <Icon as={FiVideo} color="blue.500" />
                                  <Text>{lesson.title}</Text>
                                </HStack>
                                <Text color="gray.600">{lesson.duration}</Text>
                              </HStack>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>

                <TabPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    {course.features.map((feature, index) => (
                      <HStack
                        key={index}
                        p={6}
                        bg="gray.50"
                        borderRadius="lg"
                        spacing={4}
                      >
                        <Icon as={feature.icon} boxSize={8} color="blue.500" />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">{feature.title}</Text>
                          <Text color="gray.600">{feature.description}</Text>
                        </VStack>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 