import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Textarea,
  useToast,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  HStack,
  Divider,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';

// 模拟数据
const questions = [
  {
    id: 1,
    user: {
      name: '张经理',
      avatar: '/images/avatars/user-zhang.svg',
    },
    question: '如何制定供应链数字化转型战略？',
    answer: '供应链数字化转型战略的制定需要考虑以下几个方面：\n1. 明确转型目标\n2. 评估现有能力\n3. 选择合适的技术\n4. 制定实施计划\n5. 建立评估机制',
    timestamp: '2024-03-15 14:30',
  },
  {
    id: 2,
    user: {
      name: '李总监',
      avatar: '/images/avatars/user-li.svg',
    },
    question: '供应链七大链性理论具体包括哪些内容？',
    answer: '供应链七大链性理论包括：\n1. 价值链\n2. 信息链\n3. 资金链\n4. 物流链\n5. 服务链\n6. 知识链\n7. 创新链\n这些链性相互关联，共同构成完整的供应链体系。',
    timestamp: '2024-03-14 10:15',
  },
];

export default function ExpertQA() {
  const [question, setQuestion] = useState('');
  const [contact, setContact] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = () => {
    if (!question.trim()) {
      toast({
        title: '请输入问题',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!contact.trim()) {
      toast({
        title: '请输入联系方式',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: 实现提交问题的逻辑
    toast({
      title: '问题已提交',
      description: '专家会尽快回复您的问题',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setQuestion('');
    setContact('');
  };

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Box w="full" textAlign="center">
            <Heading size="xl" mb={4}>向吴树贵专家提问</Heading>
            <Text color="gray.600">您的问题将得到专家的专业解答</Text>
          </Box>

          <Card w="full" bg={bg} shadow="lg">
            <CardHeader>
              <Heading size="md">我要提问</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Textarea
                  placeholder="请输入您的问题..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  size="lg"
                  rows={4}
                />
                <Input
                  placeholder="请输入您的联系方式（邮箱/手机号）"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </VStack>
            </CardBody>
            <CardFooter>
              <Button
                colorScheme="blue"
                rightIcon={<FiSend />}
                onClick={handleSubmit}
                w="full"
              >
                提交问题
              </Button>
            </CardFooter>
          </Card>

          <Box w="full">
            <Heading size="lg" mb={6}>常见问题</Heading>
            <VStack spacing={6}>
              {questions.map((q) => (
                <Card key={q.id} w="full" bg={bg} shadow="md">
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <HStack>
                        <Avatar size="sm" name={q.user.name} src={q.user.avatar} />
                        <Text fontWeight="bold">{q.user.name}</Text>
                        <Text color="gray.500" fontSize="sm">{q.timestamp}</Text>
                      </HStack>
                      <Box>
                        <Text fontWeight="bold" mb={2}>问：{q.question}</Text>
                        <Text color="gray.600" whiteSpace="pre-line">答：{q.answer}</Text>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 