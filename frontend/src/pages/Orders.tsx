import {
  Box,
  Container,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Text,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Order } from '../types';

const statusMap = {
  pending: { label: '待支付', color: 'yellow' },
  paid: { label: '已支付', color: 'green' },
  failed: { label: '支付失败', color: 'red' },
  refunded: { label: '已退款', color: 'gray' },
};

export default function Orders() {
  const [status, setStatus] = useState<string>('');
  const toast = useToast();

  // 获取订单列表
  const { data: orders, refetch } = useQuery({
    queryKey: ['orders', status],
    queryFn: async () => {
      const response = await apiService.get<Order[]>('/orders', {
        params: { status },
      });
      return response.data;
    },
  });

  // 验证支付状态
  const verifyMutation = useMutation({
    mutationFn: async (orderId: string) => {
      return apiService.post(`/orders/${orderId}/verify-payment`);
    },
    onSuccess: () => {
      refetch();
      toast({
        title: '支付状态已更新',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: '验证支付状态失败',
        description: error.message || '请稍后重试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // 申请退款
  const refundMutation = useMutation({
    mutationFn: async (orderId: string) => {
      return apiService.post(`/orders/${orderId}/refund`);
    },
    onSuccess: () => {
      refetch();
      toast({
        title: '退款申请已提交',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: '申请退款失败',
        description: error.message || '请稍后重试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleVerifyPayment = (orderId: string) => {
    verifyMutation.mutate(orderId);
  };

  const handleRefund = (orderId: string) => {
    refundMutation.mutate(orderId);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <Heading size="xl" mb={4}>
            我的订单
          </Heading>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            maxW="200px"
            mb={4}
          >
            <option value="">全部状态</option>
            {Object.entries(statusMap).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>

        {orders?.length === 0 ? (
          <Text>暂无订单</Text>
        ) : (
          <Box overflowX="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>订单号</Th>
                  <Th>课程</Th>
                  <Th>金额</Th>
                  <Th>状态</Th>
                  <Th>创建时间</Th>
                  <Th>操作</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders?.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order.orderNumber}</Td>
                    <Td>{order.course.title}</Td>
                    <Td>¥{order.amount}</Td>
                    <Td>
                      <Badge colorScheme={statusMap[order.status].color}>
                        {statusMap[order.status].label}
                      </Badge>
                    </Td>
                    <Td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Td>
                    <Td>
                      <Stack direction="row" spacing={2}>
                        {order.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              colorScheme="brand"
                              onClick={() =>
                                handleVerifyPayment(order._id)
                              }
                              isLoading={verifyMutation.isLoading}
                            >
                              验证支付
                            </Button>
                            <Button
                              as="a"
                              href={`/pay/${order.orderNumber}`}
                              size="sm"
                              variant="outline"
                            >
                              继续支付
                            </Button>
                          </>
                        )}
                        {order.status === 'paid' && (
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => handleRefund(order._id)}
                            isLoading={refundMutation.isLoading}
                          >
                            申请退款
                          </Button>
                        )}
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 