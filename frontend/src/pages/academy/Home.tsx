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
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FiBook, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const AcademyHome: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const features = [
    {
      icon: FiBook,
      title: '基础课程',
      description: '从零开始，掌握供应链管理的基本概念和原理',
      link: '/academy/basic',
    },
    {
      icon: FiTrendingUp,
      title: '进阶课程',
      description: '深入学习供应链管理的高级技能和策略',
      link: '/academy/advanced',
    },
    {
      icon: FiAward,
      title: '实践指南',
      description: '真实案例分析和实践操作指导',
      link: '/academy/guides',
    },
    {
      icon: FiUsers,
      title: '学习路径',
      description: '个性化的学习计划和职业发展路径',
      link: '/academy/paths',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 头部横幅 */}
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        mb={8}
      >
        <VStack spacing={4} align="start">
          <Heading size="2xl">供应链思维学院</Heading>
          <Text fontSize="xl" color="gray.600">
            专业的供应链管理在线学习平台，助力您的职业发展
          </Text>
          <HStack spacing={4}>
            <Button as={RouterLink} to="/academy/courses" colorScheme="blue" size="lg">
              浏览课程
            </Button>
            <Button as={RouterLink} to="/academy/paths" variant="outline" size="lg">
              查看学习路径
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* 特色内容 */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={12}>
        {features.map((feature, index) => (
          <Box
            key={index}
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <VStack align="start" spacing={4}>
              <Icon as={feature.icon} boxSize={8} color="blue.500" />
              <Heading size="md">{feature.title}</Heading>
              <Text color="gray.600">{feature.description}</Text>
              <Button
                as={RouterLink}
                to={feature.link}
                variant="link"
                colorScheme="blue"
                rightIcon={<Icon as={FiTrendingUp} />}
              >
                了解更多
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* 学习统计 */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack>
            <Text fontSize="3xl" fontWeight="bold" color="blue.500">
              1000+
            </Text>
            <Text>课程数量</Text>
          </VStack>
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack>
            <Text fontSize="3xl" fontWeight="bold" color="blue.500">
              50000+
            </Text>
            <Text>注册学员</Text>
          </VStack>
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <VStack>
            <Text fontSize="3xl" fontWeight="bold" color="blue.500">
              98%
            </Text>
            <Text>学员好评</Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default AcademyHome; 