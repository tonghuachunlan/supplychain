import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  Icon,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  FiCheckCircle,
  FiTrendingUp,
  FiSearch,
  FiBarChart2,
  FiShield,
  FiSettings,
  FiRefreshCw,
  FiCheck,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TechHeading from '../../components/common/TechHeading';
import GlassCard from '../../components/common/GlassCard';

const SupplyChainAssessment = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const assessmentAreas = [
    {
      title: '战略规划评估',
      description: '评估供应链战略与企业战略的匹配度',
      icon: FiTrendingUp,
      metrics: [
        '战略一致性',
        '市场竞争力',
        '资源配置',
        '发展规划',
      ],
    },
    {
      title: '运营效率评估',
      description: '评估供应链各环节的运营效率',
      icon: FiBarChart2,
      metrics: [
        '流程效率',
        '成本控制',
        '库存周转',
        '交付时效',
      ],
    },
    {
      title: '风险管理评估',
      description: '识别和评估供应链风险点',
      icon: FiShield,
      metrics: [
        '供应风险',
        '需求风险',
        '运营风险',
        '合规风险',
      ],
    },
    {
      title: '数字化水平评估',
      description: '评估供应链数字化转型程度',
      icon: FiSettings,
      metrics: [
        '系统集成度',
        '数据质量',
        '自动化水平',
        '智能决策',
      ],
    },
  ];

  const assessmentProcess = [
    {
      title: '前期调研',
      description: '深入了解企业现状和需求',
      icon: FiSearch,
      steps: [
        '企业背景调研',
        '需求分析访谈',
        '资料收集整理',
        '评估范围确定',
      ],
    },
    {
      title: '现状评估',
      description: '全面评估供应链各维度表现',
      icon: FiBarChart2,
      steps: [
        '数据分析',
        '实地考察',
        '流程梳理',
        '绩效评估',
      ],
    },
    {
      title: '问题诊断',
      description: '识别关键问题和改进机会',
      icon: FiCheckCircle,
      steps: [
        '问题识别',
        '根因分析',
        '影响评估',
        '优先级排序',
      ],
    },
    {
      title: '优化建议',
      description: '提供可行的改进方案',
      icon: FiRefreshCw,
      steps: [
        '方案设计',
        '成本效益分析',
        '实施路径规划',
        '效果预估',
      ],
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 测试提示 */}
          {isLoaded && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              供应链评估页面已成功加载！
            </Alert>
          )}

          {/* 评估介绍 */}
          <Box textAlign="center">
            <TechHeading size="2xl" mb={6}>
              供应链评估服务
            </TechHeading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              通过科学的评估方法，帮助企业全面了解供应链现状，发现问题与机会
            </Text>
          </Box>

          {/* 评估领域 */}
          <Box w="full">
            <TechHeading size="xl" mb={8}>
              评估领域
            </TechHeading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {assessmentAreas.map((area) => (
                <GlassCard key={area.title} p={8}>
                  <VStack spacing={6} align="flex-start">
                    <Icon
                      as={area.icon}
                      w={10}
                      h={10}
                      color="brand.primary"
                    />
                    <TechHeading size="lg">
                      {area.title}
                    </TechHeading>
                    <Text color="gray.600">
                      {area.description}
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                      {area.metrics.map((metric) => (
                        <GridItem key={metric}>
                          <HStack>
                            <Icon as={FiCheck} color="brand.green" />
                            <Text>{metric}</Text>
                          </HStack>
                        </GridItem>
                      ))}
                    </Grid>
                  </VStack>
                </GlassCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 评估流程 */}
          <Box w="full">
            <TechHeading size="xl" mb={8}>
              评估流程
            </TechHeading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {assessmentProcess.map((process, index) => (
                <Box
                  key={process.title}
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    right: { base: '50%', lg: '-25%' },
                    top: { base: '100%', lg: '50%' },
                    width: { base: '2px', lg: '50%' },
                    height: { base: '20px', lg: '2px' },
                    bg: 'brand.primary',
                    display: index === assessmentProcess.length - 1 ? 'none' : 'block',
                  }}
                >
                  <GlassCard p={6}>
                    <VStack spacing={4}>
                      <Icon
                        as={process.icon}
                        w={8}
                        h={8}
                        color="brand.primary"
                      />
                      <TechHeading size="md">
                        {process.title}
                      </TechHeading>
                      <Text color="gray.600" textAlign="center">
                        {process.description}
                      </Text>
                      <List spacing={2} fontSize="sm">
                        {process.steps.map((step) => (
                          <ListItem key={step}>
                            <ListIcon as={FiCheck} color="brand.green" />
                            {step}
                          </ListItem>
                        ))}
                      </List>
                    </VStack>
                  </GlassCard>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* 评估报告 */}
          <Box
            bg="brand.primary"
            color="white"
            p={12}
            borderRadius="2xl"
            w="full"
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="center">
              <Box>
                <TechHeading size="xl" color="white" mb={4}>
                  专业的评估报告
                </TechHeading>
                <List spacing={4}>
                  <ListItem>
                    <ListIcon as={FiCheck} />
                    详细的现状分析
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} />
                    量化的评估指标
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} />
                    可行的改进建议
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FiCheck} />
                    清晰的实施路径
                  </ListItem>
                </List>
              </Box>
              <Box textAlign="center">
                <Button
                  as={Link}
                  to="/consulting/contact"
                  size="lg"
                  colorScheme="white"
                  variant="outline"
                  _hover={{
                    bg: 'white',
                    color: 'brand.primary',
                  }}
                >
                  预约评估
                </Button>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SupplyChainAssessment; 