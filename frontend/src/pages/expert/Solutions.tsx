import {
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  Badge,
  Icon,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUsers, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import PageTemplate from '../../components/PageTemplate';
import { getDynamicPlaceholderImage } from '../../constants/images';

// 模拟数据
const solutions = [
  {
    id: '1',
    title: '供应链数字化转型解决方案',
    summary: '帮助企业实现供应链的数字化转型，提升运营效率和决策能力。',
    coverImage: 'https://source.unsplash.com/random/800x400?digital',
    benefits: [
      '提升供应链可视化水平',
      '优化库存管理效率',
      '加强供应商协同能力',
    ],
    metrics: [
      { label: '效率提升', value: '35%' },
      { label: '成本降低', value: '25%' },
      { label: '库存优化', value: '40%' },
    ],
    industries: ['制造业', '零售业', '物流业'],
    implementationTime: '3-6个月',
    consultantCount: 15,
  },
  {
    id: '2',
    title: '供应链风险管理解决方案',
    summary: '构建全面的供应链风险管理体系，提升企业抗风险能力。',
    coverImage: 'https://source.unsplash.com/random/800x400?risk',
    benefits: [
      '建立风险预警机制',
      '优化供应商管理',
      '提升供应链韧性',
    ],
    metrics: [
      { label: '风险识别率', value: '90%' },
      { label: '响应时间', value: '-60%' },
      { label: '成本节约', value: '20%' },
    ],
    industries: ['金融业', '医药业', '能源业'],
    implementationTime: '4-8个月',
    consultantCount: 12,
  },
  {
    id: '3',
    title: '智能供应链规划方案',
    summary: '运用人工智能技术，实现供应链的智能化规划和优化。',
    coverImage: 'https://source.unsplash.com/random/800x400?planning',
    benefits: [
      '提升需求预测准确性',
      '优化库存配置策略',
      '改善运输路线规划',
    ],
    metrics: [
      { label: '预测准确率', value: '85%' },
      { label: '库存周转', value: '+30%' },
      { label: '物流成本', value: '-20%' },
    ],
    industries: ['电商', '快消品', '汽车业'],
    implementationTime: '6-12个月',
    consultantCount: 20,
  },
  {
    id: '4',
    title: '绿色供应链解决方案',
    summary: '助力企业建设环境友好型供应链，实现可持续发展。',
    coverImage: 'https://source.unsplash.com/random/800x400?green',
    benefits: [
      '降低碳排放水平',
      '优化资源利用效率',
      '提升环保合规性',
    ],
    metrics: [
      { label: '碳排放', value: '-30%' },
      { label: '能源效率', value: '+25%' },
      { label: '废物回收', value: '85%' },
    ],
    industries: ['新能源', '化工业', '食品业'],
    implementationTime: '6-10个月',
    consultantCount: 18,
  },
];

export default function Solutions() {
  const cardBg = useColorModeValue('white', 'gray.700');
  const statBg = useColorModeValue('blue.50', 'blue.900');

  return (
    <PageTemplate
      title="解决方案"
      subtitle="专业的供应链管理解决方案，助力企业实现业务转型升级"
      breadcrumbs={[
        { title: '专家观点', link: '/expert' },
        { title: '解决方案' },
      ]}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {solutions.map((solution) => (
          <Card key={solution.id} bg={cardBg}>
            <CardBody>
              <Stack spacing={6}>
                {/* 封面图片 */}
                <Image
                  src={getDynamicPlaceholderImage(solution.title, 'news', 'medium')}
                  alt={solution.title}
                  objectFit="cover"
                  h="180px"
                  w="100%"
                  borderRadius="md"
                  fallbackSrc={getDynamicPlaceholderImage(solution.title, 'news', 'medium')}
                />

                {/* 标题和简介 */}
                <Stack spacing={3}>
                  <Heading size="lg">{solution.title}</Heading>
                  <Text color="gray.600">{solution.summary}</Text>
                </Stack>

                {/* 适用行业 */}
                <Box>
                  <Text fontWeight="bold" mb={2}>适用行业</Text>
                  <HStack spacing={2}>
                    {solution.industries.map((industry, index) => (
                      <Badge key={index} colorScheme="blue">
                        {industry}
                      </Badge>
                    ))}
                  </HStack>
                </Box>

                {/* 核心收益 */}
                <Box>
                  <Text fontWeight="bold" mb={2}>核心收益</Text>
                  <Stack spacing={2}>
                    {solution.benefits.map((benefit, index) => (
                      <HStack key={index}>
                        <Icon as={FiCheckCircle} color="green.500" />
                        <Text>{benefit}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </Box>

                {/* 关键指标 */}
                <SimpleGrid columns={3} spacing={4}>
                  {solution.metrics.map((metric, index) => (
                    <Box
                      key={index}
                      p={3}
                      bg={statBg}
                      borderRadius="lg"
                      textAlign="center"
                    >
                      <Text fontSize="sm" color="gray.500">
                        {metric.label}
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color="blue.500">
                        {metric.value}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>

                {/* 实施信息 */}
                <HStack justify="space-between" color="gray.600">
                  <HStack>
                    <Icon as={FiTrendingUp} />
                    <Text>实施周期：{solution.implementationTime}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text>顾问团队：{solution.consultantCount}人</Text>
                  </HStack>
                </HStack>

                {/* 操作按钮 */}
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                  <Button
                    as={RouterLink}
                    to={`/expert/solutions/${solution.id}`}
                    colorScheme="blue"
                    flex="1"
                  >
                    了解详情
                  </Button>
                  <Button
                    as={RouterLink}
                    to={`/contact?solution=${solution.id}`}
                    colorScheme="blue"
                    variant="outline"
                    flex="1"
                  >
                    咨询方案
                  </Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </PageTemplate>
  );
} 