import {
  Box,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../services/api';

interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalOrders: number;
  totalRevenue: number;
  orderStats: {
    today: number;
    growth: number;
  };
  revenueStats: {
    today: number;
    growth: number;
  };
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  user: {
    name: string;
  };
  course: {
    title: string;
  };
  amount: number;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>管理仪表盘</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>总用户数</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>总课程数</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>总订单数</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Stat>
              <StatLabel>今日活跃用户</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Box mt={8}>
        <Text>更多统计数据开发中...</Text>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 