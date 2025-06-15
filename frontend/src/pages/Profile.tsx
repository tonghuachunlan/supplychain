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
} from '@chakra-ui/react';
import { FiUser, FiBook, FiClock, FiFileText } from 'react-icons/fi';
import { ProfileCard } from '../components/ProfileCard';
import { LearningStats } from '../components/LearningStats';
import { MyCourseList } from '../components/MyCourseList';
import { OrderHistory } from '../components/OrderHistory';
import { useAuth } from '../contexts/AuthContext';
import { courseService, paymentService } from '../api/services';

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
    </Container>
    </Box>
  );
} 