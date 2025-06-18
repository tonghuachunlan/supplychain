import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Avatar,
  Input,
  Textarea,
  SimpleGrid,
  useColorModeValue,
  Divider,
  Badge,
  Icon,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FiMessageSquare, FiThumbsUp, FiClock } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';

// 模拟数据
const mockQuestions = [
  {
    id: '1',
    title: '如何理解供应链七大链性之间的关系？',
    content: '在学习供应链七大链性的过程中，我发现它们之间似乎存在着密切的联系，但不太清楚具体是如何相互影响的...',
    author: {
      name: '张三',
      avatar: '/images/avatars/expert-zhang.svg',
    },
    createdAt: '2024-03-15',
    likes: 12,
    replies: 3,
    tags: ['七大链性', '理论学习'],
  },
  {
    id: '2',
    title: '数字化转型过程中最常见的问题有哪些？',
    content: '我们公司正在进行数字化转型，想了解一下在这个过程中需要特别注意哪些问题...',
    author: {
      name: '李四',
      avatar: '/images/avatars/expert-li.svg',
    },
    createdAt: '2024-03-14',
    likes: 8,
    replies: 2,
    tags: ['数字化转型', '实践问题'],
  },
];

const ExpertQA: React.FC = () => {
  const { expertId, courseId } = useParams();
  const toast = useToast();
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isExpertQA = Boolean(expertId);
  const isCourseQA = Boolean(courseId);

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
      description: '专家会尽快回复您的问题',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setQuestion('');
    setTitle('');
  };

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* 页面标题 */}
          <Box>
            <Heading size="xl" mb={2}>
              {isExpertQA ? '专家问答' : '课程问答'}
            </Heading>
            <Text color="gray.600" fontSize="lg">
              {isExpertQA 
                ? '向专家提出您的问题，获取专业解答'
                : '课程学习过程中的问题交流与解答'}
            </Text>
          </Box>

          {/* 提问框 */}
          <Box bg={bg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <Heading size="md" mb={6}>向专家提问</Heading>
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

          {/* 问题列表 */}
          <Box>
            <Heading size="md" mb={6}>历史问答</Heading>
            <VStack spacing={6} align="stretch">
              {mockQuestions.map((qa) => (
                <Box
                  key={qa.id}
                  bg={bg}
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <HStack spacing={4} mb={4}>
                    <Avatar
                      size="sm"
                      name={qa.author.name}
                      src={qa.author.avatar}
                    />
                    <Box>
                      <Text fontWeight="bold">{qa.author.name}</Text>
                      <Text fontSize="sm" color="gray.500">{qa.createdAt}</Text>
                    </Box>
                  </HStack>
                  <Heading size="sm" mb={2}>{qa.title}</Heading>
                  <Text mb={4}>{qa.content}</Text>
                  <Divider my={4} />
                  <HStack spacing={4} mt={4}>
                    <Button
                      size="sm"
                      leftIcon={<FiThumbsUp />}
                      variant="ghost"
                    >
                      {qa.likes}
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<FiMessageSquare />}
                      variant="ghost"
                    >
                      {qa.replies} 回复
                    </Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ExpertQA; 