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
  Badge,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { FiSend, FiMessageSquare, FiBook } from 'react-icons/fi';

// 模拟数据
const courseQuestions = {
  'sct-basic': [
    {
      id: 1,
      user: {
        name: '王经理',
        avatar: 'https://via.placeholder.com/40',
      },
      question: '供应链七大链性理论中，价值链和信息链的关系是什么？',
      answer: '价值链和信息链是供应链中两个相互依存的重要链性。价值链关注的是价值创造和传递的过程，而信息链则负责支撑价值链的运作，提供必要的信息支持。两者相辅相成，共同推动供应链的高效运转。',
      timestamp: '2024-03-15 16:30',
      tags: ['理论概念', '链性关系'],
    },
    {
      id: 2,
      user: {
        name: '李总监',
        avatar: 'https://via.placeholder.com/40',
      },
      question: '如何理解供应链认知四段式中的"链性思维"？',
      answer: '链性思维是供应链认知四段式中的核心概念，它强调从整体性和系统性的角度看待供应链。具体包括：\n1. 整体性思维\n2. 系统性思维\n3. 协同性思维\n4. 创新性思维\n这种思维方式有助于我们更好地理解和优化供应链。',
      timestamp: '2024-03-14 11:15',
      tags: ['认知方法', '思维模式'],
    },
  ],
  'sct-advanced': [
    {
      id: 1,
      user: {
        name: '张总',
        avatar: 'https://via.placeholder.com/40',
      },
      question: '企业数字化转型过程中，如何平衡短期效益和长期发展？',
      answer: '在数字化转型过程中，需要从以下几个方面平衡短期效益和长期发展：\n1. 制定清晰的转型路线图\n2. 分阶段实施转型计划\n3. 建立合理的评估机制\n4. 保持战略定力\n5. 注重人才培养',
      timestamp: '2024-03-15 15:20',
      tags: ['转型策略', '战略规划'],
    },
  ],
};

export default function CourseQA() {
  const { courseId } = useParams();
  const [question, setQuestion] = useState('');
  const [contact, setContact] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const questions = courseQuestions[courseId as keyof typeof courseQuestions] || [];

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
            <Heading size="xl" mb={4}>课程问答</Heading>
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
                      <HStack spacing={2}>
                        {q.tags.map((tag, index) => (
                          <Badge key={index} colorScheme="blue">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
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