import { Box, Heading, SimpleGrid, Card, CardBody, Text, Button, VStack } from '@chakra-ui/react';

const OperationTools = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>运营工具</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">系统维护</Heading>
              <Button colorScheme="blue" isDisabled>清理缓存</Button>
              <Button colorScheme="blue" isDisabled>系统备份</Button>
              <Text fontSize="sm" color="gray.500">功能开发中...</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">内容运营</Heading>
              <Button colorScheme="blue" isDisabled>内容推送</Button>
              <Button colorScheme="blue" isDisabled>活动管理</Button>
              <Text fontSize="sm" color="gray.500">功能开发中...</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">用户运营</Heading>
              <Button colorScheme="blue" isDisabled>消息推送</Button>
              <Button colorScheme="blue" isDisabled>用户分群</Button>
              <Text fontSize="sm" color="gray.500">功能开发中...</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">数据导出</Heading>
              <Button colorScheme="blue" isDisabled>用户数据</Button>
              <Button colorScheme="blue" isDisabled>订单数据</Button>
              <Text fontSize="sm" color="gray.500">功能开发中...</Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default OperationTools; 