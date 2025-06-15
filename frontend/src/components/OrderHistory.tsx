import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useToast,
  Collapse,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';
import { Order } from '../api/services/payment.service';

interface OrderHistoryProps {
  orders: Order[];
  onRequestRefund: (orderId: string) => Promise<void>;
}

export function OrderHistory({ orders, onRequestRefund }: OrderHistoryProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isRefunding, setIsRefunding] = useState<string | null>(null);
  const toast = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPaymentMethod = (method: string) => {
    const methods: { [key: string]: string } = {
      alipay: '支付宝',
      wechat: '微信支付',
      creditcard: '信用卡',
    };
    return methods[method] || method;
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig: {
      [key: string]: { label: string; colorScheme: string };
    } = {
      pending: { label: '待支付', colorScheme: 'yellow' },
      paid: { label: '已支付', colorScheme: 'green' },
      failed: { label: '支付失败', colorScheme: 'red' },
      refunded: { label: '已退款', colorScheme: 'gray' },
    };
    return statusConfig[status] || { label: status, colorScheme: 'gray' };
  };

  const handleRefund = async (orderId: string) => {
    try {
      setIsRefunding(orderId);
      await onRequestRefund(orderId);
      toast({
        title: '退款申请已提交',
        description: '我们将尽快处理您的退款请求',
        status: 'success',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: '退款申请失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsRefunding(null);
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="medium">
            订单记录
          </Text>
          <Text color="gray.600">
            共 {orders.length} 笔订单
          </Text>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>订单号</Th>
              <Th>课程</Th>
              <Th>金额</Th>
              <Th>状态</Th>
              <Th>时间</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <>
                <Tr key={order.id}>
                  <Td>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order.id ? null : order.id
                        )
                      }
                      rightIcon={
                        <Icon
                          as={
                            expandedOrder === order.id
                              ? FiChevronUp
                              : FiChevronDown
                          }
                        />
                      }
                    >
                      详情
                    </Button>
                  </Td>
                  <Td>{order.id}</Td>
                  <Td>
                    <Link color="brand.500" href={`/courses/${order.courseId}`}>
                      {order.courseTitle}
                    </Link>
                  </Td>
                  <Td>¥ {order.amount.toFixed(2)}</Td>
                  <Td>
                    <Badge
                      colorScheme={getStatusBadge(order.status).colorScheme}
                    >
                      {getStatusBadge(order.status).label}
                    </Badge>
                  </Td>
                  <Td>{formatDate(order.createdAt)}</Td>
                  <Td>
                    {order.status === 'paid' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        isLoading={isRefunding === order.id}
                        onClick={() => handleRefund(order.id)}
                      >
                        申请退款
                      </Button>
                    )}
                    {order.status === 'paid' && (
                      <Button
                        size="sm"
                        leftIcon={<FiDownload />}
                        ml={2}
                        onClick={() => {
                          // TODO: 实现发票下载功能
                          toast({
                            title: '发票下载',
                            description: '发票下载功能即将上线',
                            status: 'info',
                            duration: 2000,
                          });
                        }}
                      >
                        发票
                      </Button>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={7} p={0}>
                    <Collapse in={expandedOrder === order.id}>
                      <Box bg="gray.50" p={4}>
                        <VStack align="stretch" spacing={2}>
                          <HStack>
                            <Text fontWeight="medium">支付方式：</Text>
                            <Text>{formatPaymentMethod(order.paymentMethod)}</Text>
                          </HStack>
                          {order.paymentId && (
                            <HStack>
                              <Text fontWeight="medium">支付流水号：</Text>
                              <Text>{order.paymentId}</Text>
                            </HStack>
                          )}
                          {order.refundId && (
                            <HStack>
                              <Text fontWeight="medium">退款流水号：</Text>
                              <Text>{order.refundId}</Text>
                            </HStack>
                          )}
                          <HStack>
                            <Text fontWeight="medium">更新时间：</Text>
                            <Text>{formatDate(order.updatedAt)}</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>

        {orders.length === 0 && (
          <Box py={8} textAlign="center">
            <Text color="gray.600">暂无订单记录</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
} 