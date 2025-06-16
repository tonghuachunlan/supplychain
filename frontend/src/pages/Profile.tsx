import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  VStack,
  useToast,
  Alert,
  AlertIcon,
  Skeleton,
  Heading,
  Text,
  HStack,
  Avatar,
  Button,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Icon,
  Progress,
} from '@chakra-ui/react';
import { FiUser, FiBook, FiClock, FiFileText, FiAward, FiTrendingUp } from 'react-icons/fi';
import { ProfileCard } from '../components/ProfileCard';
import { LearningStats } from '../components/LearningStats';
import { MyCourseList } from '../components/MyCourseList';
import { OrderHistory } from '../components/OrderHistory';
import { useAuth } from '../contexts/AuthContext';
import { courseService, paymentService } from '../api/services';
import type { LearningStats as LearningStatsType } from '../types/user';

export default function Profile() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 并行获取所有需要的数据
      const [courses, orders, learningStats] = await Promise.all([
        courseService.getUserCourses(),
        paymentService.getUserOrders(),
        courseService.getUserLearningStats(),
      ]);

      setProfileData({
        courses,
        orders,
        learningStats,
      });
    } catch (error: any) {
      setError(error.message || '获取个人信息失败');
      toast({
        title: '加载失败',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (data: any) => {
    try {
      // TODO: 实现个人信息更新
      toast({
        title: '更新成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '更新失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleCourseRemove = async (courseId: string) => {
    try {
      // TODO: 实现课程移除
      await fetchProfileData(); // 刷新数据
    } catch (error: any) {
      toast({
        title: '移除失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRefundRequest = async (orderId: string) => {
    try {
      await paymentService.requestRefund(orderId, {
        reason: '用户申请退款',
      });
      await fetchProfileData(); // 刷新数据
    } catch (error: any) {
      toast({
        title: '退款申请失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  const LoadingSkeleton = () => (
    <VStack spacing={8}>
      <Skeleton height="200px" width="100%" />
      <Skeleton height="200px" width="100%" />
      <Skeleton height="400px" width="100%" />
    </VStack>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={8}>
          {/* 左侧个人信息 */}
          <GridItem>
            <VStack spacing={8}>
              {isLoading ? (
                <Skeleton height="200px" width="100%" />
              ) : (
                <ProfileCard
                  user={{
                    ...user!,
                    joinDate: user!.joinDate || new Date().toISOString(),
                  }}
                  onUpdate={handleProfileUpdate}
                />
              )}

              {isLoading ? (
                <Skeleton height="200px" width="100%" />
              ) : (
                <LearningStats stats={profileData?.learningStats} />
              )}
            </VStack>
          </GridItem>

          {/* 右侧内容区 */}
          <GridItem>
            <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
              <Tabs colorScheme="brand" isLazy>
                <TabList px={6} pt={4}>
                  <Tab gap={2}>
                    <FiBook />
                    我的课程
                  </Tab>
                  <Tab gap={2}>
                    <FiClock />
                    学习记录
                  </Tab>
                  <Tab gap={2}>
                    <FiFileText />
                    订单记录
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel p={6}>
                    {isLoading ? (
                      <LoadingSkeleton />
                    ) : (
                      <MyCourseList
                        courses={profileData?.courses}
                        onRemove={handleCourseRemove}
                      />
                    )}
                  </TabPanel>

                  <TabPanel p={6}>
                    {isLoading ? (
                      <LoadingSkeleton />
                    ) : (
                      <VStack spacing={6} align="stretch">
                        {/* TODO: 实现学习记录组件 */}
                        <Alert status="info">
                          <AlertIcon />
                          学习记录功能开发中...
                        </Alert>
                      </VStack>
                    )}
                  </TabPanel>

                  <TabPanel p={6}>
                    {isLoading ? (
                      <LoadingSkeleton />
                    ) : (
                      <OrderHistory
                        orders={profileData?.orders}
                        onRequestRefund={handleRefundRequest}
                      />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>

        {/* 个人信息卡片 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" mb={8} mt={8}>
          <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={6}>
            <GridItem>
              <VStack>
                <Avatar size="2xl" name={user?.name} src={user?.avatar} />
                <Text fontSize="xl" fontWeight="bold">{user?.name}</Text>
                <Text color="gray.500">{user?.email}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack align="stretch" spacing={4}>
                <Heading size="md">个人简介</Heading>
                <Text color="gray.600">
                  热爱学习，专注供应链管理领域的知识探索。目标是成为供应链管理专家。
                </Text>
                <HStack>
                  <Button colorScheme="blue">编辑资料</Button>
                  <Button variant="outline">修改密码</Button>
                </HStack>
              </VStack>
            </GridItem>
          </Grid>
        </Box>

        {/* 学习统计 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Stat bg="white" p={6} borderRadius="lg" shadow="sm">
            <StatLabel>总课程数</StatLabel>
            <StatNumber>{profileData?.learningStats.totalCourses}</StatNumber>
            <StatHelpText>
              已完成 {profileData?.learningStats.completedCourses} 门
            </StatHelpText>
          </Stat>
          <Stat bg="white" p={6} borderRadius="lg" shadow="sm">
            <StatLabel>总学习时长</StatLabel>
            <StatNumber>{Math.floor(profileData?.learningStats.totalLearningTime / 60)}小时</StatNumber>
            <StatHelpText>
              平均每天 {Math.floor(profileData?.learningStats.averageDailyTime)} 分钟
            </StatHelpText>
          </Stat>
          <Stat bg="white" p={6} borderRadius="lg" shadow="sm">
            <StatLabel>本周学习时长</StatLabel>
            <StatNumber>{profileData?.learningStats.thisWeekTime}分钟</StatNumber>
            <StatHelpText>
              <StatArrow type={profileData?.learningStats.thisWeekTime > profileData?.learningStats.lastWeekTime ? 'increase' : 'decrease'} />
              {Math.abs(((profileData?.learningStats.thisWeekTime - profileData?.learningStats.lastWeekTime) / profileData?.learningStats.lastWeekTime) * 100).toFixed(1)}%
            </StatHelpText>
          </Stat>
          <Stat bg="white" p={6} borderRadius="lg" shadow="sm">
            <StatLabel>学习天数</StatLabel>
            <StatNumber>{profileData?.learningStats.learningDays}天</StatNumber>
            <StatHelpText>
              连续学习中
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* 学习进度 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm" mb={8}>
          <VStack align="stretch" spacing={6}>
            <Heading size="md">学习进度</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[
                { name: '供应链管理基础', progress: 80 },
                { name: '库存管理与优化', progress: 60 },
                { name: '采购与供应商管理', progress: 40 },
                { name: '物流运输管理', progress: 20 },
              ].map((course, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text>{course.name}</Text>
                    <Text>{course.progress}%</Text>
                  </HStack>
                  <Progress value={course.progress} colorScheme="blue" borderRadius="full" />
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>

        {/* 学习目标 */}
        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <VStack align="stretch" spacing={6}>
            <Heading size="md">学习目标</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {[
                { icon: FiBook, title: '完成课程', value: '5门', target: '10门' },
                { icon: FiClock, title: '学习时长', value: '20小时', target: '50小时' },
                { icon: FiAward, title: '获得证书', value: '2个', target: '5个' },
                { icon: FiTrendingUp, title: '知识点掌握', value: '60%', target: '90%' },
              ].map((goal, index) => (
                <VStack
                  key={index}
                  p={4}
                  spacing={3}
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor="gray.200"
                >
                  <Icon as={goal.icon} boxSize={6} color="blue.500" />
                  <Text fontWeight="bold">{goal.title}</Text>
                  <HStack spacing={2}>
                    <Text fontSize="lg" color="blue.500">{goal.value}</Text>
                    <Text color="gray.500">/ {goal.target}</Text>
                  </HStack>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
} 