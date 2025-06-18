import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Divider,
  Avatar,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaPaperPlane, FaThumbsUp, FaComment } from 'react-icons/fa';

const CourseQA: React.FC = () => {
  const { id } = useParams();
  const toast = useToast();
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // 模拟问答数据
  const qaList = [
    {
      id: 1,
      user: {
        name: '王同学',
        avatar: '/images/user-avatar.jpg',
      },
      title: '关于库存管理的问题',
      content: '在第三章中提到的库存管理策略，能否详细解释一下JIT管理的具体实施步骤？',
      answer: 'JIT管理的实施步骤主要包括：1. 需求预测 2. 供应商管理 3. 生产计划 4. 库存控制 5. 持续改进',
      likes: 12,
      comments: 5,
      date: '2024-03-14',
    },
    // 更多问答数据...
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !question.trim()) {
      toast({
        title: '请填写完整信息',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // TODO: 实现提交逻辑
    toast({
      title: '问题已提交',
      description: '老师会尽快回复您的问题',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setQuestion('');
    setTitle('');
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* 提问表单 */}
        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          boxShadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <Heading size="md" mb={6}>课程问答</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>问题标题</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入问题标题"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>问题详情</FormLabel>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="请详细描述您的问题..."
                  rows={6}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                leftIcon={<FaPaperPlane />}
                alignSelf="flex-end"
              >
                提交问题
              </Button>
            </VStack>
          </form>
        </Box>

        {/* 问答列表 */}
        <Box>
          <Heading size="md" mb={6}>历史问答</Heading>
          <VStack spacing={6} align="stretch">
            {qaList.map((qa) => (
              <Box
                key={qa.id}
                bg={bgColor}
                p={6}
                borderRadius="lg"
                boxShadow="md"
                border="1px"
                borderColor={borderColor}
              >
                <HStack spacing={4} mb={4}>
                  <Avatar src={qa.user.avatar} name={qa.user.name} />
                  <Box>
                    <Text fontWeight="bold">{qa.user.name}</Text>
                    <Text fontSize="sm" color="gray.500">{qa.date}</Text>
                  </Box>
                </HStack>
                <Heading size="sm" mb={2}>{qa.title}</Heading>
                <Text mb={4}>{qa.content}</Text>
                <Divider my={4} />
                <Box bg="gray.50" p={4} borderRadius="md">
                  <Text fontWeight="bold" mb={2}>老师回答：</Text>
                  <Text>{qa.answer}</Text>
                </Box>
                <HStack spacing={4} mt={4}>
                  <Button
                    size="sm"
                    leftIcon={<FaThumbsUp />}
                    variant="ghost"
                  >
                    {qa.likes}
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FaComment />}
                    variant="ghost"
                  >
                    {qa.comments}
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CourseQA; 