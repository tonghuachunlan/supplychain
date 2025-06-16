import React from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Grid,
  GridItem,
  HStack,
  Icon,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiLink,
  FiDatabase,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiBriefcase,
  FiBook,
} from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const stages = [
  {
    title: '物流管理基础阶段',
    description: '夯实物流管理基础，提升运营效率',
    features: ['仓储管理', '运输管理', '库存控制', '配送优化'],
  },
  {
    title: '供应链集成管理阶段',
    description: '整合供应链资源，优化端到端流程',
    features: ['采购管理', '供应商管理', '需求预测', '计划协同'],
  },
  {
    title: '供应链网络协同阶段',
    description: '构建协同网络，实现价值共创',
    features: ['网络优化', '协同决策', '风险管理', '价值分配'],
  },
  {
    title: '数字供应链转型阶段',
    description: '数字化赋能，打造智慧供应链',
    features: ['数字平台', '智能决策', '区块链应用', '生态构建'],
  },
];

const chainProperties = [
  {
    title: '需求链',
    icon: FiUsers,
    description: '深入理解和响应市场需求',
    color: 'blue',
  },
  {
    title: '资源链',
    icon: FiBriefcase,
    description: '优化资源配置和利用效率',
    color: 'green',
  },
  {
    title: '价值链',
    icon: FiTrendingUp,
    description: '创造和传递企业价值',
    color: 'purple',
  },
  {
    title: '协同链',
    icon: FiLink,
    description: '促进供应链各方协作',
    color: 'orange',
  },
  {
    title: '知识链',
    icon: FiBook,
    description: '积累和共享专业知识',
    color: 'cyan',
  },
  {
    title: '数据链',
    icon: FiDatabase,
    description: '数据驱动决策优化',
    color: 'pink',
  },
  {
    title: '风险链',
    icon: FiShield,
    description: '全面识别和管控风险',
    color: 'red',
  },
];

const stats = [
  {
    number: "10000+",
    label: "企业用户",
    description: "来自各行各业的企业选择我们",
  },
  {
    number: "200+",
    label: "行业专家",
    description: "顶尖供应链专家提供专业指导",
  },
  {
    number: "500+",
    label: "实践案例",
    description: "丰富的企业实践案例分享",
  },
  {
    number: "98%",
    label: "客户满意度",
    description: "企业用户的高度认可",
  },
];

const features = [
  {
    title: "专业课程体系",
    description: "四段式认知体系，循序渐进的学习路径",
    icon: FiBook,
    color: "blue",
  },
  {
    title: "数字化转型",
    description: "供应链数字化转型一站式解决方案",
    icon: FiDatabase,
    color: "purple",
  },
  {
    title: "专家咨询",
    description: "行业顶尖专家提供专业咨询服务",
    icon: FiUsers,
    color: "green",
  },
];

export default function Home() {
  const titleSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
  const subtitleSize = useBreakpointValue({ base: "lg", md: "xl" });
  
  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, blue.900, purple.900)'
  );

  return (
    <Box overflow="hidden">
      {/* 第一屏：主横幅 */}
      <Box
        minH="90vh"
        position="relative"
        bg={bg}
        color={textColor}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={bgGradient}
          opacity={0.8}
        />
        
        <Container maxW="container.xl" position="relative">
          {/* 主标题部分 */}
          <VStack spacing={8} align="center" pt={20} pb={16}>
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                fontSize={titleSize}
                fontWeight="bold"
                lineHeight="1.2"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                textAlign="center"
              >
                数字时代的
                <br />
                供应链思维革新
              </Heading>
            </MotionBox>
            
            <MotionText
              fontSize={subtitleSize}
              color="gray.600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              textAlign="center"
              maxW="2xl"
            >
              用供应链思维统筹数字化转型
              <br />
              打造企业核心竞争力
            </MotionText>
            
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <HStack spacing={4}>
                <Button
                  as={Link}
                  to="/consulting/contact"
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<FiArrowRight />}
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  开启转型之旅
                </Button>
                <Button
                  as={Link}
                  to="/academy"
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  了解更多
                </Button>
              </HStack>
            </MotionBox>
          </VStack>

          {/* 特色服务 */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} py={12}>
              {features.map((feature, index) => (
                <VStack
                  key={feature.title}
                  bg={useColorModeValue('white', 'gray.800')}
                  p={6}
                  borderRadius="lg"
                  spacing={4}
                  shadow="md"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                  transition="all 0.3s"
                >
                  <Circle size="50px" bg={`${feature.color}.500`} color="white">
                    <Icon as={feature.icon} w={6} h={6} />
                  </Circle>
                  <Heading size="md" color={textColor}>
                    {feature.title}
                  </Heading>
                  <Text color="gray.500" textAlign="center">
                    {feature.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* 数据统计 */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              spacing={8}
              py={12}
              px={{ base: 4, md: 0 }}
            >
              {stats.map((stat, index) => (
                <VStack
                  key={stat.label}
                  spacing={2}
                  p={4}
                  borderRadius="lg"
                  bg={useColorModeValue('whiteAlpha.800', 'whiteAlpha.100')}
                  backdropFilter="blur(8px)"
                >
                  <Heading
                    size="2xl"
                    bgGradient={`linear(to-r, ${index % 2 ? 'purple' : 'blue'}.400, ${index % 2 ? 'blue' : 'purple'}.500)`}
                    bgClip="text"
                  >
                    {stat.number}
                  </Heading>
                  <Text fontWeight="bold" color={textColor}>
                    {stat.label}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {stat.description}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </MotionBox>
        </Container>
      </Box>

      {/* 第二屏：四段式认知 */}
      <Box bg={bg} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={textColor}>
                供应链认知"四段式"
              </Heading>
              <Text color="gray.600" maxW="2xl">
                循序渐进的供应链管理发展路径，助力企业持续成长
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {stages.map((stage, index) => (
                <MotionBox
                  key={stage.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <VStack
                    bg={useColorModeValue('white', 'gray.700')}
                    p={6}
                    borderRadius="xl"
                    shadow="lg"
                    spacing={4}
                    h="full"
                    position="relative"
                    _hover={{ transform: 'translateY(-8px)' }}
                    transition="all 0.3s"
                  >
                    <Circle
                      size="40px"
                      bg={`blue.${500 + index * 100}`}
                      color="white"
                      fontSize="lg"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </Circle>
                    <Heading size="md" color={textColor}>
                      {stage.title}
                    </Heading>
                    <Text color="gray.500" fontSize="sm" textAlign="center">
                      {stage.description}
                    </Text>
                    <VStack spacing={2} align="stretch" w="full">
                      {stage.features.map((feature, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Icon as={FiArrowRight} color="blue.500" w={4} h={4} />
                          <Text color="gray.600" fontSize="sm">
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 第三屏：七大链性 */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="2xl" color={textColor}>
                供应链七大链性
              </Heading>
              <Text color="gray.600" maxW="2xl">
                全面把握供应链的核心要素，构建企业竞争优势
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {chainProperties.map((chain, index) => (
                <MotionBox
                  key={chain.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VStack
                    bg={useColorModeValue('white', 'gray.700')}
                    p={6}
                    borderRadius="xl"
                    shadow="lg"
                    spacing={4}
                    _hover={{ transform: 'translateY(-8px)' }}
                    transition="all 0.3s"
                  >
                    <Circle size="50px" bg={`${chain.color}.500`} color="white">
                      <Icon as={chain.icon} w={6} h={6} />
                    </Circle>
                    <Heading size="md" color={textColor}>
                      {chain.title}
                    </Heading>
                    <Text color="gray.500" textAlign="center">
                      {chain.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>

            <Button
              as={Link}
              to="/academy/courses"
              size="lg"
              colorScheme="blue"
              rightIcon={<FiArrowRight />}
              _hover={{ transform: 'translateX(10px)' }}
              transition="all 0.3s"
            >
              探索更多内容
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
} 