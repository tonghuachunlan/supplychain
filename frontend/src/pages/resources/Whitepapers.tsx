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
} from 'react-icons/fi';

const Whitepapers: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const papers = [
    {
      id: 1,
      title: '2024年供应链发展趋势报告',
      description:
        '深入分析全球供应链发展趋势，包括数字化转型、可持续发展、风险管理等关键议题',
      date: '2024-01-15',
      downloads: 2500,
      views: 15000,
      tags: ['趋势报告', '数字化', '可持续发展'],
      fileSize: '2.5MB',
    },
    {
      id: 2,
      title: '供应链韧性建设白皮书',
      description:
        '探讨如何构建具有韧性的供应链网络，应对全球不确定性带来的挑战',
      date: '2024-02-01',
      downloads: 1800,
      views: 12000,
      tags: ['韧性', '风险管理', '最佳实践'],
      fileSize: '3.1MB',
    },
    {
      id: 3,
      title: '供应链数字孪生技术应用指南',
      description:
        '详细介绍数字孪生技术在供应链中的应用场景、实施方法和案例分析',
      date: '2024-02-15',
      downloads: 2100,
      views: 13500,
      tags: ['数字孪生', '技术创新', '案例分析'],
      fileSize: '4.2MB',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">白皮书</Heading>
          <Text fontSize="xl" color="gray.600">
            深度解析供应链管理领域的前沿趋势和最佳实践
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索白皮书..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 白皮书列表 */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {papers.map((paper) => (
          <Box
            key={paper.id}
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
                <Badge colorScheme="blue" fontSize="sm">
                  {paper.fileSize}
                </Badge>
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiEye} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {paper.views}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiDownload} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {paper.downloads}
                    </Text>
                  </HStack>
                </HStack>
              </HStack>

              <VStack align="start" spacing={2}>
                <Heading size="md">{paper.title}</Heading>
                <Text color="gray.600" noOfLines={2}>
                  {paper.description}
                </Text>
              </VStack>

              <HStack>
                <Icon as={FiCalendar} color="gray.500" />
                <Text fontSize="sm" color="gray.500">
                  发布日期：{paper.date}
                </Text>
              </HStack>

              <HStack spacing={2}>
                {paper.tags.map((tag, index) => (
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

              <Button
                leftIcon={<FiFileText />}
                rightIcon={<FiDownload />}
                colorScheme="blue"
                variant="outline"
                width="100%"
              >
                下载白皮书
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Whitepapers; 