import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Progress,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import {
  FiBookmark,
  FiCheck,
  FiClock,
  FiArrowRight,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiBook,
  FiTarget,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const LearningPaths: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const paths = [
    {
      id: 1,
      title: '供应链管理师认证路径',
      description: '系统学习供应链管理知识，获取专业认证',
      duration: '6个月',
      progress: 65,
      level: '初级到高级',
      enrolledCount: 1500,
      courses: [
        {
          title: '供应链管理基础',
          duration: '30小时',
          status: 'completed',
        },
        {
          title: '库存管理与优化',
          duration: '25小时',
          status: 'completed',
        },
        {
          title: '采购管理实务',
          duration: '28小时',
          status: 'current',
        },
        {
          title: '物流运输管理',
          duration: '32小时',
          status: 'upcoming',
        },
        {
          title: '供应链风险管理',
          duration: '24小时',
          status: 'upcoming',
        },
        {
          title: '供应链战略规划',
          duration: '35小时',
          status: 'upcoming',
        },
      ],
      certification: '供应链管理师（SCM）认证',
      skills: ['供应链规划', '库存管理', '采购管理', '物流管理', '风险管理'],
    },
    {
      id: 2,
      title: '数字供应链转型专家路径',
      description: '掌握供应链数字化转型所需的知识和技能',
      duration: '8个月',
      progress: 30,
      level: '中级到高级',
      enrolledCount: 980,
      courses: [
        {
          title: '供应链数字化基础',
          duration: '28小时',
          status: 'completed',
        },
        {
          title: '数据分析与可视化',
          duration: '35小时',
          status: 'current',
        },
        {
          title: '供应链系统集成',
          duration: '40小时',
          status: 'upcoming',
        },
        {
          title: '区块链技术应用',
          duration: '32小时',
          status: 'upcoming',
        },
        {
          title: 'AI在供应链中的应用',
          duration: '38小时',
          status: 'upcoming',
        },
        {
          title: '数字化转型实践',
          duration: '45小时',
          status: 'upcoming',
        },
      ],
      certification: '数字供应链专家认证',
      skills: ['数字化转型', '数据分析', '系统集成', '区块链', 'AI应用'],
    },
    {
      id: 3,
      title: '供应链运营优化专家路径',
      description: '深入学习供应链运营优化的方法和工具',
      duration: '7个月',
      progress: 15,
      level: '中级',
      enrolledCount: 750,
      courses: [
        {
          title: '运营管理基础',
          duration: '25小时',
          status: 'completed',
        },
        {
          title: '流程优化方法论',
          duration: '30小时',
          status: 'current',
        },
        {
          title: '精益供应链管理',
          duration: '35小时',
          status: 'upcoming',
        },
        {
          title: '供应链成本控制',
          duration: '28小时',
          status: 'upcoming',
        },
        {
          title: '绩效管理与改进',
          duration: '32小时',
          status: 'upcoming',
        },
        {
          title: '运营效率提升实践',
          duration: '38小时',
          status: 'upcoming',
        },
      ],
      certification: '供应链运营优化专家认证',
      skills: ['运营管理', '流程优化', '精益管理', '成本控制', '绩效管理'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">学习路径</Heading>
        <Text fontSize="xl" color="gray.600">
          选择适合您的职业发展路径，系统提升供应链管理能力
        </Text>
      </VStack>

      {/* 统计概览 */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
        <Stat
          px={6}
          py={4}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="lg">总学习路径</StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="blue.500">
            3
          </StatNumber>
          <StatHelpText>
            <HStack>
              <Icon as={FiBook} />
              <Text>专业认证路径</Text>
            </HStack>
          </StatHelpText>
        </Stat>

        <Stat
          px={6}
          py={4}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="lg">总课程数</StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="green.500">
            18
          </StatNumber>
          <StatHelpText>
            <HStack>
              <Icon as={FiTarget} />
              <Text>系统化课程</Text>
            </HStack>
          </StatHelpText>
        </Stat>

        <Stat
          px={6}
          py={4}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="lg">学习人数</StatLabel>
          <StatNumber fontSize="3xl" fontWeight="bold" color="purple.500">
            3230
          </StatNumber>
          <StatHelpText>
            <HStack>
              <Icon as={FiUsers} />
              <Text>正在学习</Text>
            </HStack>
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* 路径列表 */}
      <VStack spacing={8} align="stretch">
        {paths.map((path) => (
          <Box
            key={path.id}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={6}>
              <HStack justify="space-between">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Heading size="lg">{path.title}</Heading>
                    <Badge colorScheme="blue">{path.level}</Badge>
                  </HStack>
                  <Text color="gray.600">{path.description}</Text>
                </VStack>
                <Icon as={FiTrendingUp} boxSize={8} color="blue.500" />
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <HStack>
                  <Icon as={FiClock} color="gray.500" />
                  <Text color="gray.600">学习时长：{path.duration}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiUsers} color="gray.500" />
                  <Text color="gray.600">{path.enrolledCount}人在学</Text>
                </HStack>
                <HStack>
                  <Icon as={FiAward} color="gray.500" />
                  <Text color="gray.600">获得{path.certification}</Text>
                </HStack>
              </SimpleGrid>

              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">学习进度</Text>
                  <Text>{path.progress}%</Text>
                </HStack>
                <Progress
                  value={path.progress}
                  colorScheme="blue"
                  borderRadius="full"
                  size="sm"
                />
              </Box>

              <Divider />

              <VStack align="start" spacing={4}>
                <Text fontWeight="bold">课程安排：</Text>
                <List spacing={3} width="100%">
                  {path.courses.map((course, index) => (
                    <ListItem
                      key={index}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      bg={course.status === 'current' ? 'blue.50' : 'transparent'}
                      borderRadius="md"
                    >
                      <HStack>
                        <ListIcon
                          as={course.status === 'completed' ? FiCheck : FiBookmark}
                          color={
                            course.status === 'completed'
                              ? 'green.500'
                              : course.status === 'current'
                              ? 'blue.500'
                              : 'gray.500'
                          }
                        />
                        <Text color="gray.700">{course.title}</Text>
                      </HStack>
                      <HStack spacing={4}>
                        <Text color="gray.500" fontSize="sm">
                          {course.duration}
                        </Text>
                        <Badge
                          colorScheme={
                            course.status === 'completed'
                              ? 'green'
                              : course.status === 'current'
                              ? 'blue'
                              : 'gray'
                          }
                        >
                          {course.status === 'completed'
                            ? '已完成'
                            : course.status === 'current'
                            ? '学习中'
                            : '待学习'}
                        </Badge>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </VStack>

              <VStack align="start" spacing={4}>
                <Text fontWeight="bold">核心技能：</Text>
                <HStack wrap="wrap" spacing={2}>
                  {path.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      colorScheme="purple"
                      variant="subtle"
                      px={3}
                      py={1}
                    >
                      {skill}
                    </Badge>
                  ))}
                </HStack>
              </VStack>

              <Button
                as={RouterLink}
                to={`/academy/paths/${path.id}`}
                colorScheme="blue"
                size="lg"
                rightIcon={<FiArrowRight />}
              >
                继续学习
              </Button>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default LearningPaths; 