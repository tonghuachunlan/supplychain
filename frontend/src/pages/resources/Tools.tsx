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
} from '@chakra-ui/react';
import {
  FiDownload,
  FiSearch,
  FiTool,
  FiStar,
  FiCalendar,
  FiExternalLink,
} from 'react-icons/fi';

const Tools: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const tools = [
    {
      id: 1,
      title: '供应链成本分析工具',
      description: '全面的供应链成本分析和优化工具，支持多维度成本核算',
      category: '分析工具',
      format: 'Excel',
      rating: 4.8,
      downloads: 2500,
      lastUpdate: '2024-02-20',
      tags: ['成本分析', 'Excel模板', '数据分析'],
    },
    {
      id: 2,
      title: '库存管理计算器',
      description: '帮助计算安全库存、再订货点等关键库存指标的专业工具',
      category: '计算工具',
      format: 'Web App',
      rating: 4.7,
      downloads: 1800,
      lastUpdate: '2024-02-15',
      tags: ['库存管理', '在线工具', '决策支持'],
    },
    {
      id: 3,
      title: '供应商评估模板',
      description: '标准化的供应商评估和选择工具，包含多维度评估指标',
      category: '评估工具',
      format: 'Excel',
      rating: 4.9,
      downloads: 3200,
      lastUpdate: '2024-02-10',
      tags: ['供应商管理', 'Excel模板', '评估体系'],
    },
    {
      id: 4,
      title: '运输路线优化工具',
      description: '基于多种算法的运输路线优化工具，支持多点配送规划',
      category: '优化工具',
      format: 'Desktop App',
      rating: 4.6,
      downloads: 1500,
      lastUpdate: '2024-02-05',
      tags: ['物流优化', '路线规划', '配送管理'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">实用工具</Heading>
          <Text fontSize="xl" color="gray.600">
            提供专业的供应链管理工具和模板，提升工作效率
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索工具..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 工具列表 */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {tools.map((tool) => (
          <Box
            key={tool.id}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Badge colorScheme="green" fontSize="sm">
                  {tool.category}
                </Badge>
                <Badge colorScheme="blue" fontSize="sm">
                  {tool.format}
                </Badge>
              </HStack>

              <VStack align="start" spacing={2}>
                <Heading size="md">{tool.title}</Heading>
                <Text color="gray.600" noOfLines={2}>
                  {tool.description}
                </Text>
              </VStack>

              <HStack spacing={4}>
                <HStack>
                  <Icon as={FiStar} color="yellow.500" />
                  <Text fontSize="sm" color="gray.500">
                    {tool.rating}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={FiDownload} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {tool.downloads}
                  </Text>
                </HStack>
              </HStack>

              <HStack>
                <Icon as={FiCalendar} color="gray.500" />
                <Text fontSize="sm" color="gray.500">
                  最后更新：{tool.lastUpdate}
                </Text>
              </HStack>

              <HStack spacing={2}>
                {tool.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="green"
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
                  leftIcon={<FiDownload />}
                  colorScheme="green"
                  flex="1"
                >
                  下载
                </Button>
                <Button
                  leftIcon={<FiExternalLink />}
                  variant="outline"
                  colorScheme="green"
                  flex="1"
                >
                  在线使用
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Tools; 