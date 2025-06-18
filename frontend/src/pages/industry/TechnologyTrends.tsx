import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Image,
  Progress,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiTrendingUp,
  FiClock,
  FiBarChart,
  FiShare2,
  FiBookmark,
  FiThumbsUp,
} from 'react-icons/fi';

const TechnologyTrends: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const trends = [
    {
      id: 1,
      title: '人工智能在供应链预测中的应用趋势',
      summary: '探讨AI技术如何革新供应链预测和需求规划，提升预测准确性',
      content: '详细内容...',
      category: '技术趋势',
      maturity: 75,
      impact: '高',
      timeframe: '1-2年',
      author: '张三',
      date: '2024-03-10',
      views: 2500,
      likes: 180,
      image: '/images/trends/ai-trend.svg',
      tags: ['人工智能', '预测分析', '需求规划'],
    },
    {
      id: 2,
      title: '区块链技术在供应链追溯中的发展',
      summary: '分析区块链如何提升供应链透明度和可追溯性，实现端到端可视化',
      content: '详细内容...',
      category: '技术应用',
      maturity: 60,
      impact: '中高',
      timeframe: '2-3年',
      author: '李四',
      date: '2024-03-08',
      views: 2000,
      likes: 150,
      image: '/images/trends/blockchain-trend.svg',
      tags: ['区块链', '追溯系统', '透明度'],
    },
    {
      id: 3,
      title: '物联网技术在智能仓储中的创新',
      summary: '解析IoT技术如何推动仓储智能化，提升运营效率和准确性',
      content: '详细内容...',
      category: '创新应用',
      maturity: 85,
      impact: '高',
      timeframe: '当前',
      author: '王五',
      date: '2024-03-05',
      views: 3000,
      likes: 220,
      image: '/images/trends/iot-trend.svg',
      tags: ['物联网', '智能仓储', '自动化'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">技术趋势</Heading>
          <Text fontSize="xl" color="gray.600">
            探索供应链管理领域的前沿技术趋势
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索技术趋势..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 趋势列表 */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {trends.map((trend) => (
          <Box
            key={trend.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <Image
              src={trend.image}
              alt={trend.title}
              fallbackSrc="/images/placeholder-trend.svg"
              objectFit="cover"
              h="200px"
              w="100%"
            />
            <Box p={6}>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Badge colorScheme="teal" fontSize="sm">
                    {trend.category}
                  </Badge>
                  <Badge
                    colorScheme={
                      trend.impact === '高'
                        ? 'red'
                        : trend.impact === '中高'
                        ? 'orange'
                        : 'yellow'
                    }
                    fontSize="sm"
                  >
                    影响力：{trend.impact}
                  </Badge>
                </HStack>

                <VStack align="start" spacing={2}>
                  <Heading size="md">{trend.title}</Heading>
                  <Text color="gray.600" noOfLines={2}>
                    {trend.summary}
                  </Text>
                </VStack>

                <Box>
                  <Text fontSize="sm" mb={2}>
                    技术成熟度
                  </Text>
                  <Progress
                    value={trend.maturity}
                    colorScheme="teal"
                    borderRadius="full"
                    size="sm"
                  />
                </Box>

                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiClock} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      预计实现：{trend.timeframe}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiBarChart} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {trend.views} 浏览
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiThumbsUp} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {trend.likes}
                    </Text>
                  </HStack>
                </HStack>

                <HStack spacing={2}>
                  {trend.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="teal"
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>

                <HStack spacing={4}>
                  <Button
                    leftIcon={<FiTrendingUp />}
                    colorScheme="teal"
                    flex="1"
                  >
                    了解详情
                  </Button>
                  <Button
                    leftIcon={<FiBookmark />}
                    variant="outline"
                    colorScheme="teal"
                  >
                    收藏
                  </Button>
                  <Button
                    leftIcon={<FiShare2 />}
                    variant="outline"
                    colorScheme="teal"
                  >
                    分享
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default TechnologyTrends; 