import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const contactInfo = [
  {
    icon: FiMapPin,
    title: '公司地址',
    content: '北京市海淀区中关村科技园区',
  },
  {
    icon: FiPhone,
    title: '联系电话',
    content: '400-123-4567',
  },
  {
    icon: FiMail,
    title: '电子邮箱',
    content: 'contact@supplychain.edu',
  },
  {
    icon: FiClock,
    title: '工作时间',
    content: '周一至周五 9:00-18:00',
  },
];

export default function Contact() {
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现表单提交逻辑
    toast({
      title: '提交成功',
      description: '我们会尽快与您联系',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 联系方式标题 */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="gray.800">
              联系我们
            </Heading>
            <Text color="gray.600" maxW="2xl">
              如果您有任何问题或建议，请随时与我们联系
            </Text>
          </VStack>

          {/* 联系方式卡片 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {contactInfo.map((info, index) => (
              <MotionBox
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <VStack
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  shadow="lg"
                  spacing={4}
                  _hover={{ transform: 'translateY(-8px)' }}
                  transition="all 0.3s"
                >
                  <Icon as={info.icon} w={8} h={8} color="blue.500" />
                  <Heading size="md" color="gray.800">
                    {info.title}
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    {info.content}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* 联系表单 */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            p={8}
            borderRadius="xl"
            shadow="lg"
            w="full"
            maxW="3xl"
            mx="auto"
          >
            <VStack spacing={6}>
              <Heading size="lg" color="gray.800">
                发送消息
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>姓名</FormLabel>
                  <Input placeholder="请输入您的姓名" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>电话</FormLabel>
                  <Input placeholder="请输入您的电话" />
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired>
                <FormLabel>邮箱</FormLabel>
                <Input placeholder="请输入您的邮箱" type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>主题</FormLabel>
                <Input placeholder="请输入消息主题" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>消息内容</FormLabel>
                <Textarea placeholder="请输入您的消息内容" rows={6} />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w={{ base: 'full', md: 'auto' }}
              >
                发送消息
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 