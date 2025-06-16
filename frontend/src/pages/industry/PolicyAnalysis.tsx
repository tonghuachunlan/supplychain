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
  FiSearch,
  FiCalendar,
  FiFileText,
  FiDownload,
  FiBookmark,
  FiShare2,
} from 'react-icons/fi';

const PolicyAnalysis: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const policies = [
    {
      id: 1,
      title: '关于促进供应链创新与应用的指导意见',
      summary: '推动供应链创新发展，提升产业链现代化水平的政策措施',
      content: `
        1. 政策背景：
        - 加快建设现代供应链体系
        - 推动产业转型升级
        - 提升国际竞争力

        2. 主要内容：
        - 鼓励供应链数字化转型
        - 支持供应链金融创新
        - 完善供应链基础设施建设

        3. 具体措施：
        - 设立供应链创新发展专项资金
        - 建立供应链标准化体系
        - 加强供应链人才培养
      `,
      department: '国家发改委',
      date: '2024-03-01',
      status: '实施中',
      category: '指导意见',
      tags: ['创新发展', '政策支持', '产业升级'],
      relatedPolicies: ['供应链金融指导意见', '数字化转型指南'],
    },
    {
      id: 2,
      title: '供应链金融服务实体经济的实施细则',
      summary: '规范供应链金融发展，支持中小企业融资的具体措施',
      content: `
        1. 政策目标：
        - 发展供应链金融
        - 解决中小企业融资难题
        - 促进实体经济发展

        2. 实施要点：
        - 创新融资模式
        - 完善风控体系
        - 加强监管协调

        3. 保障措施：
        - 建立风险补偿机制
        - 加强信息共享平台建设
        - 提供政策性融资担保
      `,
      department: '银保监会',
      date: '2024-02-15',
      status: '征求意见',
      category: '实施细则',
      tags: ['供应链金融', '中小企业', '融资支持'],
      relatedPolicies: ['中小企业融资支持政策', '金融科技监管规定'],
    },
    {
      id: 3,
      title: '供应链数字化转型行动计划',
      summary: '推进供应链数字化、智能化发展的行动指南',
      content: `
        1. 总体目标：
        - 推动供应链数字化转型
        - 提升供应链智能化水平
        - 构建数字供应链生态

        2. 重点任务：
        - 建设数字供应链平台
        - 推广智能化解决方案
        - 促进数据共享与应用

        3. 实施路径：
        - 分阶段推进数字化建设
        - 建立示范项目
        - 加强技术创新支持
      `,
      department: '工信部',
      date: '2024-02-01',
      status: '实施中',
      category: '行动计划',
      tags: ['数字化转型', '智能化', '技术创新'],
      relatedPolicies: ['工业互联网发展规划', '数字经济发展纲要'],
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题和搜索 */}
      <VStack align="stretch" spacing={8} mb={8}>
        <VStack align="start" spacing={4}>
          <Heading size="2xl">政策解读</Heading>
          <Text fontSize="xl" color="gray.600">
            深度解读供应链管理相关政策法规
          </Text>
        </VStack>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="搜索政策..."
            borderRadius="lg"
            focusBorderColor="blue.400"
          />
        </InputGroup>
      </VStack>

      {/* 政策列表 */}
      <VStack spacing={6} align="stretch">
        {policies.map((policy) => (
          <Box
            key={policy.id}
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
                        <Badge colorScheme="purple" fontSize="sm">
                          {policy.category}
                        </Badge>
                        <Badge
                          colorScheme={
                            policy.status === '实施中'
                              ? 'green'
                              : policy.status === '征求意见'
                              ? 'orange'
                              : 'blue'
                          }
                          fontSize="sm"
                        >
                          {policy.status}
                        </Badge>
                      </HStack>

                      <VStack align="start" spacing={2}>
                        <Heading size="md">{policy.title}</Heading>
                        <Text color="gray.600" noOfLines={2}>
                          {policy.summary}
                        </Text>
                      </VStack>

                      <HStack spacing={4}>
                        <HStack>
                          <Icon as={FiFileText} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            {policy.department}
                          </Text>
                        </HStack>
                        <HStack>
                          <Icon as={FiCalendar} color="gray.500" />
                          <Text fontSize="sm" color="gray.500">
                            发布日期：{policy.date}
                          </Text>
                        </HStack>
                      </HStack>

                      <HStack spacing={2}>
                        {policy.tags.map((tag, index) => (
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
                    </VStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={6} px={6}>
                  <VStack align="stretch" spacing={6}>
                    {/* 政策内容 */}
                    <Box>
                      <Heading size="sm" mb={4}>
                        政策详情
                      </Heading>
                      <Text whiteSpace="pre-line" color="gray.600">
                        {policy.content}
                      </Text>
                    </Box>

                    {/* 相关政策 */}
                    <Box>
                      <Heading size="sm" mb={4}>
                        相关政策
                      </Heading>
                      <HStack spacing={2}>
                        {policy.relatedPolicies.map((related, index) => (
                          <Badge
                            key={index}
                            colorScheme="blue"
                            variant="subtle"
                            px={2}
                            py={1}
                            borderRadius="full"
                            cursor="pointer"
                            _hover={{ bg: 'blue.100' }}
                          >
                            {related}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>

                    {/* 操作按钮 */}
                    <HStack spacing={4}>
                      <Button
                        leftIcon={<FiDownload />}
                        colorScheme="purple"
                        flex="1"
                      >
                        下载原文
                      </Button>
                      <Button
                        leftIcon={<FiBookmark />}
                        variant="outline"
                        colorScheme="purple"
                      >
                        收藏
                      </Button>
                      <Button
                        leftIcon={<FiShare2 />}
                        variant="outline"
                        colorScheme="purple"
                      >
                        分享
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

export default PolicyAnalysis; 