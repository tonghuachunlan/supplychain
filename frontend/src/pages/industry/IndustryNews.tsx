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
} from '@chakra-ui/react';
import {
  FiSearch,
  FiClock,
  FiEye,
  FiShare2,
  FiBookmark,
} from 'react-icons/fi';

const IndustryNews: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const news = [
    {
      id: 1,
      title: '全球供应链数字化转型加速',
      summary: '随着技术发展和市场需求变化，全球供应链数字化转型进程明显加快，企业纷纷布局数字化战略',
      content: '详细内容...',
      category: '趋势分析',
      date: '2024-03-10',
      author: '张三',
      source: '供应链周刊',
      views: 1500,
      image: 'https://example.com/news1.jpg',
      tags: ['数字化转型', '全球供应链', '技术创新'],
    },
    {
      id: 2,
      title: '新能源汽车供应链布局调整',
      summary: '新能源汽车产业链重构，上游原材料供应和电池制造环节竞争加剧',
      content: '详细内容...',
      category: '产业动态',
      date: '2024-03-09',
      author: '李四',
      source: '产业观察',
      views: 1200,
      image: 'https://example.com/news2.jpg',
      tags: ['新能源汽车', '产业链', '原材料'],
    },
    {
      id: 3,
      title: '供应链金融创新模式探索',
      summary: '区块链技术在供应链金融领域的应用不断深化，新型融资模式助力中小企业发展',
      content: '详细内容...',
      category: '金融创新',
      date: '2024-03-08',
      author: '王五',
      source: '金融科技报',
      views: 1800,
      image: 'https://example.com/news3.jpg',
      tags: ['供应链金融', '区块链', '创新'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">行业动态</Heading>
          <Text fontSize="xl" color="gray.600">
            及时掌握供应链管理领域的最新动态和趋势
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索新闻..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 新闻列表 */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {news.map((item) => (
          <Box
            key={item.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <Image
              src={item.image}
              alt={item.title}
              fallbackSrc="https://via.placeholder.com/600x300"
              objectFit="cover"
              h="200px"
              w="100%"
            />
            <Box p={6}>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Badge colorScheme="blue" fontSize="sm">
                    {item.category}
                  </Badge>
                  <HStack>
                    <Icon as={FiEye} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {item.views}
                    </Text>
                  </HStack>
                </HStack>

                <VStack align="start" spacing={2}>
                  <Heading size="md">{item.title}</Heading>
                  <Text color="gray.600" noOfLines={3}>
                    {item.summary}
                  </Text>
                </VStack>

                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiClock} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {item.date}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    来源：{item.source}
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  {item.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="blue"
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
                    colorScheme="blue"
                    flex="1"
                  >
                    阅读全文
                  </Button>
                  <Button
                    leftIcon={<FiBookmark />}
                    variant="outline"
                    colorScheme="blue"
                  >
                    收藏
                  </Button>
                  <Button
                    leftIcon={<FiShare2 />}
                    variant="outline"
                    colorScheme="blue"
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

export default IndustryNews; 