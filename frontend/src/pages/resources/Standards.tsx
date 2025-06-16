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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  FiDownload,
  FiSearch,
  FiBookmark,
  FiCalendar,
  FiGlobe,
  FiFileText,
} from 'react-icons/fi';

const Standards: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const standards = [
    {
      id: 1,
      title: '供应链管理标准体系',
      description: '全面的供应链管理标准体系指南，包含各个环节的标准规范',
      category: '管理标准',
      organization: 'ISO',
      version: '2024版',
      lastUpdate: '2024-01-15',
      sections: [
        '1. 基础术语和定义',
        '2. 管理体系要求',
        '3. 流程标准化指南',
        '4. 评估和改进方法',
      ],
      tags: ['ISO标准', '管理体系', '标准化'],
    },
    {
      id: 2,
      title: '供应链数字化标准规范',
      description: '供应链数字化转型的标准规范和实施指南',
      category: '技术标准',
      organization: 'IEEE',
      version: '2024版',
      lastUpdate: '2024-02-01',
      sections: [
        '1. 数据标准',
        '2. 接口规范',
        '3. 安全要求',
        '4. 实施指南',
      ],
      tags: ['数字化', '技术规范', '标准化'],
    },
    {
      id: 3,
      title: '绿色供应链标准',
      description: '可持续发展导向的供应链管理标准和评估体系',
      category: '行业标准',
      organization: 'GRI',
      version: '2024版',
      lastUpdate: '2024-02-15',
      sections: [
        '1. 环境影响评估',
        '2. 可持续采购',
        '3. 碳足迹计算',
        '4. 绿色物流',
      ],
      tags: ['可持续发展', '绿色供应链', 'ESG'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">标准规范</Heading>
          <Text fontSize="xl" color="gray.600">
            权威的供应链管理标准和规范文件
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索标准..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 标准列表 */}
      <VStack spacing={6} align="stretch">
        {standards.map((standard) => (
          <Box
            key={standard.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
          >
            <Accordion allowToggle>
              <AccordionItem border="none">
                <AccordionButton p={6}>
                  <Box flex="1">
                    <VStack align="start" spacing={4}>
                      <HStack justify="space-between" width="100%">
                        <Badge colorScheme="orange" fontSize="sm">
                          {standard.category}
                        </Badge>
                        <HStack>
                          <Badge colorScheme="blue" fontSize="sm">
                            {standard.organization}
                          </Badge>
                          <Badge colorScheme="green" fontSize="sm">
                            {standard.version}
                          </Badge>
                        </HStack>
                      </HStack>

                      <VStack align="start" spacing={2}>
                        <Heading size="md">{standard.title}</Heading>
                        <Text color="gray.600" noOfLines={2}>
                          {standard.description}
                        </Text>
                      </VStack>

                      <HStack spacing={4}>
                        <HStack>
                          <Icon as={FiGlobe} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            {standard.organization}
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={FiCalendar} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            更新：{standard.lastUpdate}
                          </Text>
                        </HStack>
                      </HStack>

                      <HStack spacing={2}>
                        {standard.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            colorScheme="orange"
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
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={6} px={6}>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="sm">标准内容</Heading>
                    <VStack align="start" spacing={2}>
                      {standard.sections.map((section, index) => (
                        <Text key={index} color="gray.600">
                          {section}
                        </Text>
                      ))}
                    </VStack>
                    <HStack spacing={4} pt={4}>
                      <Button
                        leftIcon={<FiDownload />}
                        colorScheme="orange"
                        flex="1"
                      >
                        下载标准文件
                      </Button>
                      <Button
                        leftIcon={<FiBookmark />}
                        variant="outline"
                        colorScheme="orange"
                        flex="1"
                      >
                        收藏
                      </Button>
                    </HStack>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Standards; 