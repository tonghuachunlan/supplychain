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
  FiEye,
  FiCalendar,
  FiSearch,
  FiFileText,
  FiBarChart,
} from 'react-icons/fi';

const Reports: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const reports = [
    {
      id: 1,
      title: '2024年全球供应链风险分析报告',
      description: '深入分析全球供应链面临的主要风险和应对策略',
      date: '2024-02-20',
      downloads: 3500,
      views: 18000,
      tags: ['风险分析', '全球供应链', '趋势报告'],
      fileSize: '3.8MB',
      category: '行业研究',
    },
    {
      id: 2,
      title: '中国制造业供应链转型报告',
      description: '剖析中国制造业供应链数字化转型现状和未来方向',
      date: '2024-02-15',
      downloads: 2800,
      views: 15000,
      tags: ['制造业', '数字化转型', '中国市场'],
      fileSize: '4.2MB',
      category: '区域研究',
    },
    {
      id: 3,
      title: '供应链可持续发展研究报告',
      description: '探讨供应链可持续发展的实践方法和案例分析',
      date: '2024-02-10',
      downloads: 2200,
      views: 12000,
      tags: ['可持续发展', 'ESG', '最佳实践'],
      fileSize: '3.5MB',
      category: '专题研究',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">研究报告</Heading>
          <Text fontSize="xl" color="gray.600">
            深度研究报告，把握供应链管理前沿趋势
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索研究报告..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 报告列表 */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {reports.map((report) => (
          <Box
            key={report.id}
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
                <Badge colorScheme="purple" fontSize="sm">
                  {report.category}
                </Badge>
                <Badge colorScheme="blue" fontSize="sm">
                  {report.fileSize}
                </Badge>
              </HStack>

              <VStack align="start" spacing={2}>
                <Heading size="md">{report.title}</Heading>
                <Text color="gray.600" noOfLines={2}>
                  {report.description}
                </Text>
              </VStack>

              <HStack spacing={4}>
                <HStack>
                  <Icon as={FiCalendar} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {report.date}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={FiEye} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {report.views}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={FiDownload} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {report.downloads}
                  </Text>
                </HStack>
              </HStack>

              <HStack spacing={2}>
                {report.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    colorScheme="purple"
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>

              <Button
                leftIcon={<FiBarChart />}
                rightIcon={<FiDownload />}
                colorScheme="purple"
                variant="outline"
                width="100%"
              >
                下载报告
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Reports; 