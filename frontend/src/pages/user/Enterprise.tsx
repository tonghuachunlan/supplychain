import { Box, Heading, Text, VStack, Card, CardBody, SimpleGrid } from '@chakra-ui/react';

const Enterprise = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>企业空间</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">企业信息</Heading>
              <Text>暂未关联企业信息</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">团队管理</Heading>
              <Text>暂无团队成员</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">学习数据</Heading>
              <Text>暂无团队学习数据</Text>
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">企业资源</Heading>
              <Text>暂无企业专属资源</Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default Enterprise; 