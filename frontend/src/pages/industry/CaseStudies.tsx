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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiBookOpen,
  FiAward,
  FiBarChart,
  FiShare2,
  FiBookmark,
  FiCheck,
  FiTrendingUp,
  FiTarget,
} from 'react-icons/fi';

const CaseStudies: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const cases = [
    {
      id: 1,
      title: '全渠道供应链转型案例：某大型零售企业',
      summary: '探讨该企业如何通过数字化转型实现全渠道供应链整合，提升运营效率',
      background: '企业面临线上线下渠道整合、库存管理效率低下等挑战',
      challenges: [
        '多渠道库存管理复杂',
        '订单履行效率不高',
        '供应链可视化程度低',
      ],
      solutions: [
        '构建统一库存管理平台',
        '优化订单分配算法',
        '建设供应链控制塔',
      ],
      results: [
        '库存周转率提升30%',
        '订单履行时间缩短50%',
        '运营成本降低20%',
      ],
      category: '数字化转型',
      industry: '零售',
      date: '2024-03-01',
      image: '/images/cases/retail-transformation.svg',
      tags: ['全渠道', '数字化', '库存优化'],
    },
    {
      id: 2,
      title: '绿色供应链实践：某制造企业可持续发展之路',
      summary: '分析该企业如何通过绿色供应链建设，实现可持续发展目标',
      background: '企业致力于减少环境影响，提升供应链可持续性',
      challenges: [
        '供应商环境表现参差不齐',
        '碳排放监控难度大',
        '绿色物流成本高',
      ],
      solutions: [
        '建立供应商环境评估体系',
        '部署碳排放监控系统',
        '优化物流网络设计',
      ],
      results: [
        '碳排放降低25%',
        '供应商环境合规率提升40%',
        '物流成本优化15%',
      ],
      category: '可持续发展',
      industry: '制造业',
      date: '2024-02-15',
      image: '/images/cases/green-supply-chain.svg',
      tags: ['绿色供应链', '可持续发展', '环境保护'],
    },
    {
      id: 3,
      title: '智能供应链规划：某高科技企业的创新实践',
      summary: '解析该企业如何运用AI技术优化供应链规划，提升决策效率',
      background: '企业需要应对市场快速变化，提高供应链响应速度',
      challenges: [
        '需求预测准确度低',
        '库存规划不够精准',
        '供应链决策效率低',
      ],
      solutions: [
        '部署AI预测系统',
        '实施智能库存规划',
        '建设决策支持平台',
      ],
      results: [
        '预测准确率提升40%',
        '库存水平降低25%',
        '决策时间缩短60%',
      ],
      category: '智能规划',
      industry: '高科技',
      date: '2024-02-01',
      image: '/images/cases/ai-planning.svg',
      tags: ['人工智能', '智能规划', '决策优化'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">案例研究</Heading>
          <Text fontSize="xl" color="gray.600">
            深度解析供应链管理优秀实践案例
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索案例..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 案例列表 */}
      <VStack spacing={8} align="stretch">
        {cases.map((case_) => (
          <Box
            key={case_.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
          >
            <Image
              src={case_.image}
              alt={case_.title}
              fallbackSrc="/images/placeholder-case.svg"
              objectFit="cover"
              h="200px"
              w="100%"
            />
            <Box p={6}>
              <VStack align="stretch" spacing={6}>
                <HStack justify="space-between">
                  <Badge colorScheme="green" fontSize="sm">
                    {case_.category}
                  </Badge>
                  <Badge colorScheme="blue" fontSize="sm">
                    {case_.industry}
                  </Badge>
                </HStack>

                <VStack align="start" spacing={2}>
                  <Heading size="lg">{case_.title}</Heading>
                  <Text color="gray.600">{case_.summary}</Text>
                </VStack>

                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton px={0}>
                      <Box flex="1" textAlign="left">
                        <HStack>
                          <Icon as={FiBookOpen} />
                          <Text fontWeight="bold">查看详情</Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} px={0}>
                      <VStack align="stretch" spacing={4}>
                        {/* 背景 */}
                        <Box>
                          <Heading size="sm" mb={2}>
                            项目背景
                          </Heading>
                          <Text color="gray.600">{case_.background}</Text>
                        </Box>

                        {/* 挑战 */}
                        <Box>
                          <Heading size="sm" mb={2}>
                            主要挑战
                          </Heading>
                          <List spacing={2}>
                            {case_.challenges.map((challenge, index) => (
                              <ListItem key={index}>
                                <ListIcon as={FiTarget} color="red.500" />
                                <Text as="span" color="gray.600">
                                  {challenge}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        {/* 解决方案 */}
                        <Box>
                          <Heading size="sm" mb={2}>
                            解决方案
                          </Heading>
                          <List spacing={2}>
                            {case_.solutions.map((solution, index) => (
                              <ListItem key={index}>
                                <ListIcon as={FiTrendingUp} color="blue.500" />
                                <Text as="span" color="gray.600">
                                  {solution}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        {/* 成果 */}
                        <Box>
                          <Heading size="sm" mb={2}>
                            实施成果
                          </Heading>
                          <List spacing={2}>
                            {case_.results.map((result, index) => (
                              <ListItem key={index}>
                                <ListIcon as={FiCheck} color="green.500" />
                                <Text as="span" color="gray.600">
                                  {result}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <HStack spacing={2}>
                  {case_.tags.map((tag, index) => (
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
                    leftIcon={<FiAward />}
                    colorScheme="green"
                    flex="1"
                  >
                    查看完整案例
                  </Button>
                  <Button
                    leftIcon={<FiBookmark />}
                    variant="outline"
                    colorScheme="green"
                  >
                    收藏
                  </Button>
                  <Button
                    leftIcon={<FiShare2 />}
                    variant="outline"
                    colorScheme="green"
                  >
                    分享
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default CaseStudies; 