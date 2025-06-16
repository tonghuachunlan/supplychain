import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  Icon,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiCheck, FiTrendingUp, FiLayers, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TechHeading from '../../components/common/TechHeading';
import GlassCard from '../../components/common/GlassCard';

const EnterpriseService = () => {
  const solutions = [
    {
      title: '供应链诊断与优化',
      description: '全面评估供应链现状，识别问题点，提供优化方案',
      features: [
        '供应链成熟度评估',
        '流程优化建议',
        '成本控制方案',
        '风险管理策略',
      ],
      icon: FiTrendingUp,
    },
    {
      title: '数字化转型',
      description: '助力企业实现供应链数字化转型，提升运营效率',
      features: [
        '数字化规划咨询',
        '系统选型建议',
        '实施路径规划',
        '变革管理支持',
      ],
      icon: FiLayers,
    },
    {
      title: '全球供应链布局',
      description: '优化全球供应链网络，提升竞争优势',
      features: [
        '网络布局优化',
        '供应商管理体系',
        '物流方案设计',
        '库存策略优化',
      ],
      icon: FiGlobe,
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 服务介绍 */}
          <Box textAlign="center">
            <TechHeading size="2xl" mb={6}>
              企业服务解决方案
            </TechHeading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              为企业提供专业的供应链咨询服务，助力企业实现供应链转型升级
            </Text>
          </Box>

          {/* 解决方案列表 */}
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} w="full">
            {solutions.map((solution) => (
              <GlassCard
                key={solution.title}
                p={8}
                h="full"
              >
                <VStack spacing={6} align="flex-start" h="full">
                  <Icon
                    as={solution.icon}
                    w={10}
                    h={10}
                    color="brand.primary"
                  />
                  <TechHeading size="lg">
                    {solution.title}
                  </TechHeading>
                  <Text color="gray.600">
                    {solution.description}
                  </Text>
                  <List spacing={3} flex={1}>
                    {solution.features.map((feature) => (
                      <ListItem key={feature}>
                        <ListIcon as={FiCheck} color="brand.green" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    as={Link}
                    to="/consulting/contact"
                    variant="primary"
                    size="lg"
                    w="full"
                  >
                    咨询详情
                  </Button>
                </VStack>
              </GlassCard>
            ))}
          </SimpleGrid>

          {/* 服务流程 */}
          <Box w="full">
            <TechHeading size="xl" mb={8} textAlign="center">
              服务流程
            </TechHeading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
              {[
                '需求分析',
                '方案设计',
                '实施支持',
                '效果评估',
              ].map((step, index) => (
                <Box
                  key={step}
                  position="relative"
                  textAlign="center"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    right: { base: '50%', md: '-50%' },
                    top: { base: '100%', md: '50%' },
                    width: { base: '2px', md: '50%' },
                    height: { base: '20px', md: '2px' },
                    bg: 'brand.primary',
                    display: index === 3 ? 'none' : 'block',
                  }}
                >
                  <Box
                    w={12}
                    h={12}
                    borderRadius="full"
                    bg="brand.primary"
                    color="white"
                    fontSize="xl"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    mb={4}
                  >
                    {index + 1}
                  </Box>
                  <Text fontWeight="bold">{step}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* 联系咨询 */}
          <Box
            bg="brand.primary"
            color="white"
            p={12}
            borderRadius="2xl"
            textAlign="center"
            w="full"
          >
            <TechHeading size="xl" color="white" mb={6}>
              开启企业供应链升级之旅
            </TechHeading>
            <Text fontSize="lg" mb={8}>
              我们的专家团队将为您提供专业的解决方案
            </Text>
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
              预约咨询
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default EnterpriseService; 