import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Badge,
  Heading,
  SimpleGrid,
  Icon,
  Divider,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import {
  FiMail,
  FiGlobe,
  FiAward,
  FiBook,
  FiUsers,
  FiStar,
  FiMessageSquare,
} from 'react-icons/fi';
import { getPlaceholderImage } from '../../constants/images';

const ExpertProfile = () => {
  const { expertId } = useParams();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // 模拟专家数据
  const expert = {
    id: expertId || 'wushugui',
    name: '吴树贵',
    title: '供应链管理首席专家',
    avatar: getPlaceholderImage('avatar', 'large'),
    description: '中物联采购与供应链管理专业委员会专家委员，具有20多年供应链管理实战经验',
    email: 'expert@supplychain.com',
    website: 'www.supplychain-expert.com',
    stats: [
      { label: '发表文章', value: '180+' },
      { label: '授课学员', value: '50000+' },
      { label: '企业咨询', value: '300+' },
      { label: '专业经验', value: '20年' },
    ],
    specialties: [
      '供应链战略规划',
      '采购管理',
      '供应商管理',
      '成本控制',
      '风险管理',
      '数字化转型',
    ],
    achievements: [
      '《供应链思维》作者',
      '国际供应链管理协会认证专家',
      '多家知名企业供应链顾问',
      '供应链管理领域资深讲师',
    ],
    courses: [
      {
        id: '1',
        title: '供应链战略与规划',
        description: '全面掌握供应链战略规划方法',
        students: 5200,
        rating: 4.8,
        price: 299,
      },
      {
        id: '2',
        title: '供应商管理实务',
        description: '供应商选择、评估与管理的实战技巧',
        students: 3800,
        rating: 4.9,
        price: 199,
      },
    ],
    recentArticles: [
      {
        id: '1',
        title: '数字化时代的供应链转型',
        summary: '探讨如何在数字化浪潮中重塑供应链管理模式',
        publishDate: '2024-06-15',
        views: 1250,
      },
      {
        id: '2',
        title: '供应链韧性：应对不确定性的策略',
        summary: '分析如何构建具有韧性的供应链体系',
        publishDate: '2024-06-10',
        views: 980,
      },
    ],
  };

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* 专家基本信息 */}
          <Box w="full" bg={bg} p={8} borderRadius="xl" shadow="lg">
            <VStack spacing={8}>
              <HStack spacing={8} align="flex-start" w="full">
                <Avatar size="2xl" name={expert.name} src={expert.avatar} />
                <VStack align="flex-start" spacing={4} flex={1}>
                  <VStack align="flex-start" spacing={2}>
                    <Heading size="xl">{expert.name}</Heading>
                    <Text fontSize="lg" color="blue.500" fontWeight="bold">
                      {expert.title}
                    </Text>
                    <Text color="gray.600" maxW="2xl">
                      {expert.description}
                    </Text>
                  </VStack>
                  
                  <HStack spacing={4}>
                    <HStack>
                      <Icon as={FiMail} color="gray.500" />
                      <Text fontSize="sm" color="gray.600">{expert.email}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiGlobe} color="gray.500" />
                      <Text fontSize="sm" color="gray.600">{expert.website}</Text>
                    </HStack>
                  </HStack>

                  <HStack spacing={4}>
                    <Button 
                      as={Link} 
                      to={`/expert/qa/${expert.id}`}
                      colorScheme="blue" 
                      leftIcon={<FiMessageSquare />}
                    >
                      向专家提问
                    </Button>
                    <Button 
                      variant="outline" 
                      colorScheme="blue"
                      leftIcon={<FiMail />}
                    >
                      发送邮件
                    </Button>
                  </HStack>
                </VStack>
              </HStack>

              {/* 统计数据 */}
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full">
                {expert.stats.map((stat) => (
                  <Box key={stat.label} textAlign="center">
                    <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                      {stat.value}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {stat.label}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* 专业领域 */}
          <Box w="full">
            <Heading size="lg" mb={6}>专业领域</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
              {expert.specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  colorScheme="blue"
                  variant="subtle"
                  p={3}
                  borderRadius="md"
                  textAlign="center"
                >
                  {specialty}
                </Badge>
              ))}
            </SimpleGrid>
          </Box>

          {/* 主要成就 */}
          <Box w="full">
            <Heading size="lg" mb={6}>主要成就</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {expert.achievements.map((achievement, index) => (
                <HStack key={index} spacing={3}>
                  <Icon as={FiAward} color="orange.500" />
                  <Text>{achievement}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </Box>

          <Divider />

          {/* 精品课程 */}
          <Box w="full">
            <HStack justify="space-between" mb={6}>
              <Heading size="lg">精品课程</Heading>
              <Button as={Link} to="/courses" variant="outline" size="sm">
                查看全部
              </Button>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {expert.courses.map((course) => (
                <Box
                  key={course.id}
                  p={6}
                  bg={bg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  _hover={{ shadow: 'md' }}
                  transition="all 0.2s"
                >
                  <VStack align="flex-start" spacing={3}>
                    <Heading size="md">{course.title}</Heading>
                    <Text color="gray.600" fontSize="sm">{course.description}</Text>
                    <HStack spacing={4} fontSize="sm" color="gray.500">
                      <HStack>
                        <Icon as={FiUsers} />
                        <Text>{course.students} 人学习</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiStar} />
                        <Text>{course.rating} 分</Text>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="xl" fontWeight="bold" color="orange.500">
                        ¥{course.price}
                      </Text>
                      <Button 
                        as={Link} 
                        to={`/courses/${course.id}`}
                        colorScheme="blue" 
                        size="sm"
                      >
                        立即学习
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Divider />

          {/* 最新文章 */}
          <Box w="full">
            <HStack justify="space-between" mb={6}>
              <Heading size="lg">最新文章</Heading>
              <Button as={Link} to="/expert/articles" variant="outline" size="sm">
                查看全部
              </Button>
            </HStack>
            <VStack spacing={4} align="stretch">
              {expert.recentArticles.map((article) => (
                <Box
                  key={article.id}
                  p={6}
                  bg={bg}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  _hover={{ shadow: 'md' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <VStack align="flex-start" spacing={3}>
                    <Heading size="md">{article.title}</Heading>
                    <Text color="gray.600">{article.summary}</Text>
                    <HStack justify="space-between" w="full" fontSize="sm" color="gray.500">
                      <Text>发布时间：{article.publishDate}</Text>
                      <Text>阅读量：{article.views}</Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ExpertProfile; 