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
  useColorModeValue,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from '@chakra-ui/react';
import {
  FiClock,
  FiUsers,
  FiStar,
  FiBookOpen,
  FiTool,
  FiFileText,
  FiAward,
  FiTrendingUp,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const PracticalGuides: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const guides = [
    {
      id: 1,
      title: '供应链数字化转型实施指南',
      description: '详细指导企业如何制定和实施供应链数字化转型战略',
      category: '数字化转型',
      difficulty: '中级',
      duration: '2-3个月',
      image: '/images/guides/digital-transformation-guide.svg',
      steps: [
        '现状评估与需求分析',
        '制定转型战略规划',
        '选择合适的技术方案',
        '实施与监控',
        '效果评估与优化'
      ]
    },
    {
      id: 2,
      title: '供应商管理最佳实践',
      description: '建立高效的供应商管理体系，提升供应链整体竞争力',
      category: '供应商管理',
      difficulty: '初级',
      duration: '1-2个月',
      image: '/images/guides/supplier-management-guide.svg',
      steps: [
        '供应商评估与选择',
        '建立合作关系',
        '制定管理流程',
        '绩效监控与改进',
        '持续优化'
      ]
    },
    {
      id: 3,
      title: '库存优化管理指南',
      description: '通过科学的方法优化库存管理，降低库存成本',
      category: '库存管理',
      difficulty: '中级',
      duration: '2-4个月',
      image: '/images/guides/inventory-optimization-guide.svg',
      steps: [
        '需求预测分析',
        '安全库存设定',
        '补货策略制定',
        '库存监控系统',
        '持续优化调整'
      ]
    },
    {
      id: 4,
      title: '供应链风险管理手册',
      description: '识别、评估和管理供应链风险，提升供应链韧性',
      category: '风险管理',
      difficulty: '高级',
      duration: '3-6个月',
      image: '/images/guides/risk-management-guide.svg',
      steps: [
        '风险识别与分类',
        '风险评估与分析',
        '制定应对策略',
        '建立监控机制',
        '应急预案制定'
      ]
    },
    {
      id: 5,
      title: '物流网络优化指南',
      description: '优化物流网络布局，提升物流效率和降低成本',
      category: '物流管理',
      difficulty: '高级',
      duration: '4-8个月',
      image: '/images/guides/logistics-optimization-guide.svg',
      steps: [
        '网络现状分析',
        '需求预测建模',
        '优化方案设计',
        '成本效益分析',
        '实施与监控'
      ]
    },
    {
      id: 6,
      title: '采购流程标准化指南',
      description: '建立标准化的采购流程，提升采购效率和合规性',
      category: '采购管理',
      difficulty: '初级',
      duration: '1-3个月',
      image: '/images/guides/procurement-standardization-guide.svg',
      steps: [
        '流程现状梳理',
        '标准化设计',
        '系统化实施',
        '培训与推广',
        '持续改进'
      ]
    }
  ];

  const tools = [
    {
      id: 1,
      title: '供应链成本计算器',
      description: '帮助计算和优化供应链各环节成本',
      icon: FiTool,
    },
    {
      id: 2,
      title: '库存水平优化工具',
      description: '计算最优库存水平和补货点',
      icon: FiTrendingUp,
    },
    {
      id: 3,
      title: '供应商评估模板',
      description: '标准化的供应商评估和选择工具',
      icon: FiFileText,
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">实操指南</Heading>
        <Text fontSize="xl" color="gray.600">
          基于真实案例的供应链管理实践指导
        </Text>
      </VStack>

      {/* 实用工具区 */}
      <Box mb={12}>
        <Heading size="lg" mb={6}>实用工具</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {tools.map((tool) => (
            <Box
              key={tool.id}
              p={6}
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              transition="all 0.3s"
            >
              <VStack align="start" spacing={4}>
                <Icon as={tool.icon} boxSize={8} color="blue.500" />
                <Heading size="md">{tool.title}</Heading>
                <Text color="gray.600">{tool.description}</Text>
                <Button colorScheme="blue" size="sm">
                  立即使用
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Divider my={8} />

      {/* 实践指南区 */}
      <Box>
        <Heading size="lg" mb={6}>实践指南</Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>全部</Tab>
            <Tab>数字化转型</Tab>
            <Tab>优化提升</Tab>
            <Tab>管理实践</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {guides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {guides
                  .filter((guide) => guide.category === '数字化转型')
                  .map((guide) => (
                    <GuideCard key={guide.id} guide={guide} />
                  ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {guides
                  .filter((guide) => guide.category === '优化提升')
                  .map((guide) => (
                    <GuideCard key={guide.id} guide={guide} />
                  ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {guides
                  .filter((guide) => guide.category === '管理实践')
                  .map((guide) => (
                    <GuideCard key={guide.id} guide={guide} />
                  ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

// 指南卡片组件
const GuideCard = ({ guide }: { guide: any }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
      transition="all 0.3s"
    >
      <Image
        src={guide.image}
        alt={guide.title}
        objectFit="cover"
        h="200px"
        w="100%"
      />
      <Box p={6}>
        <VStack align="start" spacing={4}>
          <Heading size="md">{guide.title}</Heading>
          <Text color="gray.600" noOfLines={2}>
            {guide.description}
          </Text>
          <HStack spacing={4}>
            <HStack>
              <Icon as={FiClock} color="gray.500" />
              <Text color="gray.600">{guide.duration}</Text>
            </HStack>
            <HStack>
              <Icon as={FiUsers} color="gray.500" />
              <Text color="gray.600">{guide.students}</Text>
            </HStack>
            <HStack>
              <Icon as={FiStar} color="yellow.500" />
              <Text color="gray.600">{guide.rating}</Text>
            </HStack>
          </HStack>
          <HStack spacing={2}>
            {guide.tags.map((tag: string, index: number) => (
              <Badge key={index} colorScheme="blue">
                {tag}
              </Badge>
            ))}
          </HStack>
          <Button
            as={RouterLink}
            to={`/academy/guides/${guide.id}`}
            colorScheme="blue"
            width="full"
          >
            开始学习
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PracticalGuides; 