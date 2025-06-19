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
  Avatar,
  Divider,
  useColorModeValue,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiBook, FiVideo, FiMessageSquare, FiArrowRight, FiAward, FiUsers, FiTarget, FiCheckCircle } from 'react-icons/fi';
import { getPlaceholderImage } from '../../constants/images';

const mainExpert = {
  id: 'wushugui',
  name: '吴树贵',
  title: '供应链管理专家',
  avatar: getPlaceholderImage('avatar', 'large'),
  description: '20多年来一直从事企业数字化转型服务，结合自己对于企业管理和供应链的研究，深感当下正是一个"数字化"和"供应链"相互加持的时代。著有《供应链思维：链性、战略和数字化转型》等重要著作，提出了供应链认知"四段式"理念和供应链七大链性理论。',
  achievements: [
    '20年+供应链管理和数字化转型经验',
    '服务数百家企业供应链转型实践',
    '首创供应链七大链性理论',
    '提出供应链认知"四段式"理念'
  ],
  stats: [
    { label: '从业经验', value: '20年+' },
    { label: '服务企业', value: '300+' },
    { label: '学员数量', value: '10000+' },
    { label: '课程评分', value: '4.9' }
  ],
  latestBook: {
    title: '供应链思维：链性、战略和数字化转型',
    cover: getPlaceholderImage('book', 'medium'),
    description: '本书从数字化转型和数字技术应用等角度，重新定义了供应链，介绍了其发展趋势，全面分析了如何运用供应链思维统筹数字化转型。书中详细探讨了供应链七大链性，以及交易在其中的关键作用，揭示了供应链在企业战略制定与执行中的重要地位。',
    features: [
      '供应链七大链性详解',
      '数字化转型实践指南',
      '企业案例深度分析',
      '供应链认知"四段式"'
    ]
  },
  courses: [
    {
      id: 'sct-basic',
      title: '供应链思维基础课程',
      subtitle: '掌握供应链思维的核心理念',
      chapters: [
        '第一章：供应链思维导论',
        '第二章：供应链七大链性',
        '第三章：供应链认知四段式',
        '第四章：数字化转型基础'
      ],
      duration: '12课时',
      students: 1200,
      price: 299,
      features: [
        '在线视频课程',
        '专家答疑解惑',
        '同学社群交流',
        '课后练习题'
      ]
    },
    {
      id: 'sct-advanced',
      title: '供应链数字化转型实战',
      subtitle: '深入供应链转型实践案例',
      chapters: [
        '第一章：数字化转型战略规划',
        '第二章：供应链数字平台建设',
        '第三章：企业转型案例分析',
        '第四章：转型方案设计实践'
      ],
      duration: '16课时',
      students: 800,
      price: 499,
      features: [
        '深度案例解析',
        '实战项目指导',
        '专家在线答疑',
        '方案点评'
      ]
    }
  ]
};

const otherExperts = [
  {
    id: 'expert2',
    name: '张教授',
    title: '供应链战略专家',
    avatar: getPlaceholderImage('avatar', 'medium'),
    description: '专注供应链战略规划与优化',
  },
  {
    id: 'expert3',
    name: '李博士',
    title: '数字化转型专家',
    avatar: getPlaceholderImage('avatar', 'medium'),
    description: '深耕企业数字化转型领域',
  },
];

export default function ExpertColumns() {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const statsBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* 主专家展示区 */}
          <Box
            w="full"
            bg={bg}
            p={8}
            borderRadius="xl"
            shadow="lg"
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <VStack align="flex-start" spacing={6}>
                <HStack spacing={6} w="full">
                  <Image
                    src={mainExpert.avatar}
                    alt={mainExpert.name}
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="xl"
                    shadow="lg"
                  />
                  <VStack align="flex-start" spacing={3}>
                    <Heading size="lg">{mainExpert.name}</Heading>
                    <Text color="blue.500" fontWeight="bold">
                      {mainExpert.title}
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      <Tag colorScheme="blue">供应链专家</Tag>
                      <Tag colorScheme="green">数字化转型</Tag>
                      <Tag colorScheme="purple">著名作者</Tag>
                      <Tag colorScheme="orange">实战派专家</Tag>
                    </HStack>
                  </VStack>
                </HStack>

                <Text color="gray.600" fontSize="lg" lineHeight="tall">
                  {mainExpert.description}
                </Text>

                <SimpleGrid columns={4} spacing={4} w="full">
                  {mainExpert.stats.map((stat, index) => (
                    <Box
                      key={index}
                      bg={statsBg}
                      p={4}
                      borderRadius="lg"
                      textAlign="center"
                    >
                      <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                        {stat.value}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {stat.label}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {mainExpert.achievements.map((achievement, index) => (
                    <HStack key={index} spacing={2}>
                      <Icon as={FiAward} color="blue.500" />
                      <Text color="gray.600">{achievement}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>

                <HStack spacing={4}>
                  <Button
                    as={Link}
                    to={`/expert/${mainExpert.id}`}
                    colorScheme="blue"
                    rightIcon={<FiArrowRight />}
                    size="lg"
                  >
                    专家主页
                  </Button>
                  <Button
                    as={Link}
                    to={`/expert/qa/${mainExpert.id}`}
                    variant="outline"
                    colorScheme="blue"
                    rightIcon={<FiMessageSquare />}
                    size="lg"
                  >
                    向专家提问
                  </Button>
                </HStack>
              </VStack>

              <VStack spacing={6}>
                <Box
                  w="full"
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <VStack spacing={4}>
                    <Heading size="md" color="blue.600">
                      最新著作
                    </Heading>
                    <HStack spacing={6} align="start">
                      <Image
                        src={mainExpert.latestBook.cover}
                        alt={mainExpert.latestBook.title}
                        w="150px"
                        borderRadius="md"
                        shadow="lg"
                      />
                      <VStack align="flex-start" spacing={3}>
                        <Heading size="md">{mainExpert.latestBook.title}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {mainExpert.latestBook.description}
                        </Text>
                        <SimpleGrid columns={2} spacing={2} w="full">
                          {mainExpert.latestBook.features.map((feature, index) => (
                            <HStack key={index} spacing={2}>
                              <Icon as={FiTarget} color="blue.500" />
                              <Text fontSize="sm">{feature}</Text>
                            </HStack>
                          ))}
                        </SimpleGrid>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>

                <VStack spacing={4} w="full">
                  <Heading size="md" color="blue.600" alignSelf="flex-start">
                    精品课程
                  </Heading>
                  {mainExpert.courses.map((course) => (
                    <Box
                      key={course.id}
                      p={6}
                      borderRadius="lg"
                      borderWidth="1px"
                      borderColor={borderColor}
                      _hover={{ shadow: 'lg', borderColor: 'blue.200' }}
                      transition="all 0.3s"
                      w="full"
                    >
                      <VStack align="stretch" spacing={4}>
                        <VStack align="flex-start" spacing={1}>
                          <Heading size="md">{course.title}</Heading>
                          <Text color="gray.600">{course.subtitle}</Text>
                          <HStack spacing={4} color="gray.500" fontSize="sm">
                            <Text>{course.duration}</Text>
                            <Text>{course.students}人在学</Text>
                            <Badge colorScheme="green">热门</Badge>
                          </HStack>
                        </VStack>
                        
                        <SimpleGrid columns={2} spacing={2}>
                          {course.features.map((feature, idx) => (
                            <HStack key={idx} spacing={2}>
                              <Icon as={FiCheckCircle} color="green.500" />
                              <Text fontSize="sm">{feature}</Text>
                            </HStack>
                          ))}
                        </SimpleGrid>

                        <Divider />

                        <HStack justify="space-between" align="center">
                          <VStack align="flex-start" spacing={0}>
                            <Text color="gray.500" fontSize="sm">课程价格</Text>
                            <Text color="orange.500" fontSize="2xl" fontWeight="bold">
                              ¥{course.price}
                            </Text>
                          </VStack>
                          <HStack spacing={2}>
                            <Button
                              as={Link}
                              to={`/academy/courses/${course.id}`}
                              colorScheme="blue"
                              rightIcon={<FiVideo />}
                            >
                              立即学习
                            </Button>
                            <Button
                              as={Link}
                              to={`/expert/qa/${mainExpert.id}`}
                              variant="outline"
                              colorScheme="blue"
                              rightIcon={<FiMessageSquare />}
                            >
                              课程问答
                            </Button>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </SimpleGrid>
          </Box>

          <Divider />

          {/* 其他专家列表 */}
          <VStack w="full" spacing={6}>
            <Heading size="lg">更多专家</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
              {otherExperts.map((expert) => (
                <Box
                  key={expert.id}
                  bg={bg}
                  p={6}
                  borderRadius="lg"
                  shadow="md"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                  transition="all 0.3s"
                >
                  <VStack spacing={4}>
                    <Avatar size="xl" name={expert.name} src={expert.avatar} />
                    <VStack spacing={1}>
                      <Heading size="md">{expert.name}</Heading>
                      <Text color="blue.500" fontWeight="bold">
                        {expert.title}
                      </Text>
                    </VStack>
                    <Text color="gray.600" textAlign="center" noOfLines={2}>
                      {expert.description}
                    </Text>
                    <Button
                      as={Link}
                      to={`/expert/${expert.id}`}
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      rightIcon={<FiArrowRight />}
                    >
                      了解更多
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 