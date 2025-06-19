import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Heading,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  Badge,
  useToast,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FiSend, FiClock, FiUser } from 'react-icons/fi';
import { getPlaceholderImage } from '../../constants/images';

const ExpertQADetail = () => {
  const { expertId } = useParams();
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // 模拟专家信息
  const expert = {
    id: expertId || 'wushugui',
    name: '吴树贵',
    title: '供应链管理首席专家',
    avatar: getPlaceholderImage('avatar', 'medium'),
    responseTime: '通常在24小时内回复',
    totalAnswers: 1250,
    rating: 4.9,
  };

  // 模拟问答历史
  const qaHistory = [
    {
      id: '1',
      question: '在供应链数字化转型过程中，企业应该如何平衡成本与效益？',
      answer: '供应链数字化转型确实需要平衡投入与产出。建议企业从以下几个方面考虑：1. 分阶段实施，优先解决痛点明显的环节；2. 选择ROI较高的项目作为试点；3. 建立清晰的效益评估体系；4. 关注长期价值而非短期成本。',
      askedBy: '张经理',
      askedAt: '2024-06-15',
      answeredAt: '2024-06-15',
      status: 'answered',
    },
    {
      id: '2',
      question: '小企业如何建立有效的供应商管理体系？',
      answer: '小企业建立供应商管理体系的关键是要务实：1. 建立简明的供应商分类标准；2. 重点关注核心供应商的管理；3. 建立基本的评估和准入流程；4. 定期进行供应商绩效评估；5. 建立风险预警机制。不需要过于复杂，但要确保有效执行。',
      askedBy: '李总',
      askedAt: '2024-06-12',
      answeredAt: '2024-06-13',
      status: 'answered',
    },
    {
      id: '3',
      question: '如何提高供应链的韧性以应对突发事件？',
      answer: '',
      askedBy: '王主管',
      askedAt: '2024-06-18',
      answeredAt: '',
      status: 'pending',
    },
  ];

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: '请输入您的问题',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    setIsSubmitting(true);
    
    // 模拟提交
    setTimeout(() => {
      toast({
        title: '问题提交成功',
        description: '专家将在24小时内回复您的问题',
        status: 'success',
        duration: 3000,
      });
      setQuestion('');
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'green';
      case 'pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered':
        return '已回复';
      case 'pending':
        return '待回复';
      default:
        return '未知';
    }
  };

  return (
    <Box py={20}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          {/* 专家信息 */}
          <Box bg={bg} p={6} borderRadius="lg" shadow="sm">
            <HStack spacing={4}>
              <Avatar size="lg" name={expert.name} src={expert.avatar} />
              <VStack align="flex-start" spacing={2}>
                <Heading size="md">{expert.name}</Heading>
                <Text color="blue.500" fontWeight="medium">{expert.title}</Text>
                <HStack spacing={4} fontSize="sm" color="gray.600">
                  <HStack>
                    <FiClock />
                    <Text>{expert.responseTime}</Text>
                  </HStack>
                  <Text>已回答 {expert.totalAnswers} 个问题</Text>
                  <Text>好评率 {expert.rating * 20}%</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          {/* 提问表单 */}
          <Box bg={bg} p={6} borderRadius="lg" shadow="sm">
            <VStack spacing={4} align="stretch">
              <Heading size="md">向专家提问</Heading>
              <Alert status="info">
                <AlertIcon />
                请详细描述您的问题，专家会根据您的具体情况提供针对性建议
              </Alert>
              <FormControl>
                <FormLabel>您的问题</FormLabel>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="请详细描述您在供应链管理中遇到的问题..."
                  rows={6}
                  resize="vertical"
                />
              </FormControl>
              <Button
                colorScheme="blue"
                leftIcon={<FiSend />}
                onClick={handleSubmitQuestion}
                isLoading={isSubmitting}
                loadingText="提交中..."
                alignSelf="flex-start"
              >
                提交问题
              </Button>
            </VStack>
          </Box>

          {/* 问答历史 */}
          <Box>
            <Heading size="md" mb={6}>历史问答</Heading>
            <VStack spacing={6} align="stretch">
              {qaHistory.map((qa) => (
                <Box
                  key={qa.id}
                  bg={bg}
                  p={6}
                  borderRadius="lg"
                  shadow="sm"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <VStack spacing={4} align="stretch">
                    {/* 问题 */}
                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <HStack spacing={2}>
                          <FiUser />
                          <Text fontWeight="medium">{qa.askedBy}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {qa.askedAt}
                          </Text>
                        </HStack>
                        <Badge colorScheme={getStatusColor(qa.status)}>
                          {getStatusText(qa.status)}
                        </Badge>
                      </HStack>
                      <Text color="gray.700" fontWeight="medium">
                        问：{qa.question}
                      </Text>
                    </Box>

                    {/* 回答 */}
                    {qa.answer && (
                      <>
                        <Divider />
                        <Box>
                          <HStack spacing={2} mb={2}>
                            <Avatar size="sm" name={expert.name} src={expert.avatar} />
                            <Text fontWeight="medium" color="blue.600">
                              {expert.name}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {qa.answeredAt}
                            </Text>
                          </HStack>
                          <Text color="gray.700">
                            答：{qa.answer}
                          </Text>
                        </Box>
                      </>
                    )}

                    {qa.status === 'pending' && (
                      <Alert status="info" size="sm">
                        <AlertIcon />
                        <Text fontSize="sm">专家正在准备回答，请耐心等待...</Text>
                      </Alert>
                    )}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* 提示信息 */}
          <Alert status="info">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">温馨提示：</Text>
              <Text fontSize="sm">
                • 为了获得更准确的建议，请详细描述您的具体情况和问题背景
                <br />
                • 专家会根据问题的复杂程度在1-3个工作日内回复
                <br />
                • 如需更深入的咨询，可考虑预约一对一咨询服务
              </Text>
            </Box>
          </Alert>
        </VStack>
      </Container>
    </Box>
  );
};

export default ExpertQADetail; 