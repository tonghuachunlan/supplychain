import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Input,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

/**
 * @component ExpertQA
 * @description 专家问答组件，允许用户查看和提交供应链相关问题
 */
const ExpertQA: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // 模拟的问答数据
  const qaList = [
    {
      id: 1,
      question: "如何优化供应链库存管理？",
      answer: "库存管理优化需要考虑多个因素：需求预测准确性、供应商协同、安全库存水平等。建议实施ABC分类管理，并利用数字化工具进行实时监控。",
      expert: {
        name: "张教授",
        avatar: "https://bit.ly/expert-avatar-1",
        title: "供应链管理专家"
      },
      tags: ["库存管理", "数字化", "供应链优化"]
    },
    {
      id: 2,
      question: "如何应对供应链中的突发风险？",
      answer: "建立完善的风险预警机制，包括供应商分散化、库存缓冲、应急预案等。同时要加强与合作伙伴的信息共享，提高供应链韧性。",
      expert: {
        name: "李博士",
        avatar: "https://bit.ly/expert-avatar-2",
        title: "风险管理专家"
      },
      tags: ["风险管理", "供应链韧性", "应急预案"]
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 搜索区域 */}
      <Box mb={8}>
        <Heading mb={4}>专家问答</Heading>
        <Text mb={4} color="gray.600">
          向供应链领域专家提问，获取专业解答
        </Text>
        <HStack>
          <Input
            placeholder="搜索问题..."
            size="lg"
            borderRadius="md"
          />
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="blue"
            size="lg"
          >
            搜索
          </Button>
        </HStack>
      </Box>

      {/* 问答列表 */}
      <VStack spacing={4} align="stretch">
        {qaList.map((qa) => (
          <Box
            key={qa.id}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg={bgColor}
            borderColor={borderColor}
            shadow="sm"
          >
            <HStack mb={4}>
              <Avatar size="md" name={qa.expert.name} src={qa.expert.avatar} />
              <Box>
                <Text fontWeight="bold">{qa.expert.name}</Text>
                <Text fontSize="sm" color="gray.500">{qa.expert.title}</Text>
              </Box>
            </HStack>

            <VStack align="stretch" spacing={3}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {qa.question}
                </Text>
                <Text color="gray.600">{qa.answer}</Text>
              </Box>

              <Divider />

              <HStack spacing={2}>
                {qa.tags.map((tag, index) => (
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
          </Box>
        ))}
      </VStack>

      {/* 提问按钮 */}
      <Button
        position="fixed"
        bottom="4rem"
        right="4rem"
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        shadow="lg"
      >
        我要提问
      </Button>
    </Container>
  );
};

export default ExpertQA; 