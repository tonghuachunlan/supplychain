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
  FiCalendar,
  FiMapPin,
} from 'react-icons/fi';
import { getPlaceholderImage, getDynamicPlaceholderImage } from '../../constants/images';

const CaseStudies: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const caseStudies = [
    {
      id: 1,
      title: '阿里巴巴供应链数字化转型',
      company: '阿里巴巴集团',
      industry: '电商零售',
      description: '通过数字化技术重构供应链体系，提升运营效率和客户体验',
      results: [
        '库存周转率提升30%',
        '配送时效缩短50%',
        '运营成本降低25%'
      ],
      date: '2024-01-15',
      location: '杭州',
      image: getPlaceholderImage('news', 'medium'),
      tags: ['数字化转型', '电商', '物流优化'],
    },
    {
      id: 2,
      title: '华为全球供应链风险管理',
      company: '华为技术有限公司',
      industry: '通信设备',
      description: '建立全球供应链风险预警和应对机制，确保业务连续性',
      results: [
        '风险识别准确率提升至95%',
        '供应链中断恢复时间缩短60%',
        '供应商多元化程度提升40%'
      ],
      date: '2024-02-20',
      location: '深圳',
      image: getPlaceholderImage('news', 'medium'),
      tags: ['风险管理', '全球化', '业务连续性'],
    },
    {
      id: 3,
      title: '美的集团智能制造供应链',
      company: '美的集团',
      industry: '家电制造',
      description: '构建智能制造供应链体系，实现柔性生产和快速响应',
      results: [
        '生产效率提升35%',
        '订单交付周期缩短45%',
        '产品质量提升20%'
      ],
      date: '2024-03-10',
      location: '佛山',
      image: getPlaceholderImage('news', 'medium'),
      tags: ['智能制造', '柔性生产', '质量提升'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">案例分析</Heading>
          <Text fontSize="xl" color="gray.600">
            学习优秀企业的供应链管理实践和经验
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
        {caseStudies.map((caseStudy) => (
          <Box
            key={caseStudy.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            _hover={{ shadow: 'md' }}
            transition="all 0.3s"
          >
            <Box p={6}>
              <HStack spacing={6} align="start">
                <Image
                  src={getDynamicPlaceholderImage(caseStudy.title, 'news', 'medium')}
                  alt={caseStudy.title}
                  objectFit="cover"
                  w="200px"
                  h="150px"
                  borderRadius="md"
                  fallbackSrc={getDynamicPlaceholderImage(caseStudy.title, 'news', 'medium')}
                />
                <VStack align="start" spacing={4} flex={1}>
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{caseStudy.title}</Heading>
                    <HStack spacing={4} fontSize="sm" color="gray.500">
                      <HStack>
                        <Icon as={FiCalendar} />
                        <Text>{caseStudy.date}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiMapPin} />
                        <Text>{caseStudy.location}</Text>
                      </HStack>
                    </HStack>
                    <Text color="blue.500" fontWeight="medium">
                      {caseStudy.company} - {caseStudy.industry}
                    </Text>
                  </VStack>
                  
                  <Text color="gray.600">
                    {caseStudy.description}
                  </Text>
                  
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <Icon as={FiTrendingUp} color="green.500" />
                      <Text fontWeight="bold">主要成果：</Text>
                    </HStack>
                    {caseStudy.results.map((result, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        • {result}
                      </Text>
                    ))}
                  </VStack>
                  
                  <HStack spacing={2}>
                    {caseStudy.tags.map((tag, index) => (
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
                </VStack>
              </HStack>
            </Box>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default CaseStudies; 