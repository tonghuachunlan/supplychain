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
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FiClock, FiUsers, FiStar, FiBookOpen } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const PracticalGuides: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const guides = [
    {
      id: 1,
      title: '供应链数字化转型实践指南',
      description: '详细介绍供应链数字化转型的实施步骤、方法和案例',
      duration: '6小时',
      students: 1500,
      rating: 4.9,
      image: 'https://example.com/guide1.jpg',
      tags: ['实践', '数字化转型'],
      type: '案例分析',
    },
    {
      id: 2,
      title: '供应链成本优化实操手册',
      description: '通过实际案例学习供应链成本优化的具体方法',
      duration: '8小时',
      students: 1200,
      rating: 4.8,
      image: 'https://example.com/guide2.jpg',
      tags: ['实践', '成本优化'],
      type: '操作指南',
    },
    {
      id: 3,
      title: '供应商管理最佳实践',
      description: '供应商选择、评估和关系管理的实践指南',
      duration: '5小时',
      students: 980,
      rating: 4.7,
      image: 'https://example.com/guide3.jpg',
      tags: ['实践', '供应商管理'],
      type: '最佳实践',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">实践指南</Heading>
        <Text fontSize="xl" color="gray.600">
          基于真实案例的供应链管理实践指导
        </Text>
      </VStack>

      {/* 指南列表 */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {guides.map((guide) => (
          <Box
            key={guide.id}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
            transition="all 0.3s"
          >
            <Image
              src={guide.image}
              alt={guide.title}
              fallbackSrc="https://via.placeholder.com/400x225"
              objectFit="cover"
              h="200px"
              w="100%"
            />
            <Box p={6}>
              <VStack align="start" spacing={4}>
                <Badge colorScheme="green" fontSize="sm">
                  {guide.type}
                </Badge>
                <Heading size="md">{guide.title}</Heading>
                <Text color="gray.600" noOfLines={2}>
                  {guide.description}
                </Text>
                <HStack spacing={4}>
                  <HStack>
                    <Icon as={FiClock} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {guide.duration}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiUsers} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">
                      {guide.students}人学习
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiStar} color="yellow.500" />
                    <Text fontSize="sm" color="gray.500">
                      {guide.rating}
                    </Text>
                  </HStack>
                </HStack>
                <HStack spacing={2}>
                  {guide.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      colorScheme="green"
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </HStack>
                <Button
                  as={RouterLink}
                  to={`/academy/guides/${guide.id}`}
                  colorScheme="green"
                  width="100%"
                  leftIcon={<FiBookOpen />}
                >
                  开始学习
                </Button>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PracticalGuides; 