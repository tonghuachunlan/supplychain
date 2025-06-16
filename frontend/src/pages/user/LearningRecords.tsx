import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Progress,
  Badge,
  Button,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FiBook,
  FiClock,
  FiAward,
  FiBarChart,
  FiPlayCircle,
  FiCheckCircle,
} from 'react-icons/fi';

const LearningRecords: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const learningRecords = {
    inProgress: [
      {
        id: 1,
        title: '供应链管理基础',
        progress: 60,
        totalHours: 10,
        completedHours: 6,
        lastStudyDate: '2024-03-10',
        category: '基础课程',
      },
      {
        id: 2,
        title: '库存优化与管理',
        progress: 30,
        totalHours: 15,
        completedHours: 4.5,
        lastStudyDate: '2024-03-09',
        category: '进阶课程',
      },
    ],
    completed: [
      {
        id: 3,
        title: '采购管理实务',
        completionDate: '2024-02-28',
        score: 95,
        totalHours: 12,
        category: '实践课程',
        certificate: true,
      },
      {
        id: 4,
        title: '供应商关系管理',
        completionDate: '2024-02-15',
        score: 88,
        totalHours: 8,
        category: '基础课程',
        certificate: true,
      },
    ],
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">学习记录</Heading>
        <Text fontSize="xl" color="gray.600">
          追踪您的学习进度和成果
        </Text>
      </VStack>

      {/* 学习统计 */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack align="start" spacing={2}>
            <Icon as={FiBook} boxSize={6} color="blue.500" />
            <Text color="gray.500">在学课程</Text>
            <Heading size="lg">2</Heading>
          </VStack>
        </Box>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack align="start" spacing={2}>
            <Icon as={FiCheckCircle} boxSize={6} color="green.500" />
            <Text color="gray.500">已完成课程</Text>
            <Heading size="lg">8</Heading>
          </VStack>
        </Box>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack align="start" spacing={2}>
            <Icon as={FiClock} boxSize={6} color="purple.500" />
            <Text color="gray.500">总学习时长</Text>
            <Heading size="lg">30.5h</Heading>
          </VStack>
        </Box>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack align="start" spacing={2}>
            <Icon as={FiAward} boxSize={6} color="orange.500" />
            <Text color="gray.500">获得证书</Text>
            <Heading size="lg">2</Heading>
          </VStack>
        </Box>
      </SimpleGrid>

      {/* 课程记录 */}
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
      >
        <Tabs>
          <TabList px={6} pt={4}>
            <Tab>进行中</Tab>
            <Tab>已完成</Tab>
          </TabList>

          <TabPanels>
            {/* 进行中的课程 */}
            <TabPanel p={6}>
              <VStack spacing={6} align="stretch">
                {learningRecords.inProgress.map((course) => (
                  <Box
                    key={course.id}
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Heading size="md">{course.title}</Heading>
                        <Badge colorScheme="blue">{course.category}</Badge>
                      </HStack>

                      <Box>
                        <Text mb={2}>学习进度</Text>
                        <Progress
                          value={course.progress}
                          colorScheme="blue"
                          borderRadius="full"
                        />
                      </Box>

                      <HStack spacing={6}>
                        <HStack>
                          <Icon as={FiClock} color="gray.500" />
                          <Text color="gray.600">
                            {course.completedHours}/{course.totalHours}小时
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={FiBarChart} color="gray.500" />
                          <Text color="gray.600">
                            完成度 {course.progress}%
                          </Text>
                        </HStack>
                      </HStack>

                      <HStack spacing={4}>
                        <Button
                          leftIcon={<FiPlayCircle />}
                          colorScheme="blue"
                          flex="1"
                        >
                          继续学习
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>

            {/* 已完成的课程 */}
            <TabPanel p={6}>
              <VStack spacing={6} align="stretch">
                {learningRecords.completed.map((course) => (
                  <Box
                    key={course.id}
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Heading size="md">{course.title}</Heading>
                        <Badge colorScheme="green">{course.category}</Badge>
                      </HStack>

                      <HStack spacing={6}>
                        <HStack>
                          <Icon as={FiClock} color="gray.500" />
                          <Text color="gray.600">
                            总时长 {course.totalHours}小时
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={FiBarChart} color="gray.500" />
                          <Text color="gray.600">得分 {course.score}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FiAward} color="gray.500" />
                          <Text color="gray.600">
                            {course.certificate ? '已获得证书' : '无证书'}
                          </Text>
                        </HStack>
                      </HStack>

                      <HStack spacing={4}>
                        <Button
                          leftIcon={<FiBook />}
                          colorScheme="green"
                          variant="outline"
                          flex="1"
                        >
                          复习课程
                        </Button>
                        {course.certificate && (
                          <Button
                            leftIcon={<FiAward />}
                            colorScheme="green"
                            flex="1"
                          >
                            查看证书
                          </Button>
                        )}
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default LearningRecords; 