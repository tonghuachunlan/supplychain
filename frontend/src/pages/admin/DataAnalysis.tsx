import { Box, Heading, SimpleGrid, Card, CardBody, Text } from '@chakra-ui/react';

const DataAnalysis = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>数据分析</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>用户行为分析</Heading>
            <Text>数据分析功能开发中...</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>学习路径分析</Heading>
            <Text>数据分析功能开发中...</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>课程效果分析</Heading>
            <Text>数据分析功能开发中...</Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>收入分析</Heading>
            <Text>数据分析功能开发中...</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DataAnalysis; 