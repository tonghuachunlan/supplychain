import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Badge,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from '@chakra-ui/react';
import {
  FiBook,
  FiFileText,
  FiVideo,
  FiBookmark,
  FiShare2,
  FiClock,
  FiEye,
} from 'react-icons/fi';
import { getDynamicPlaceholderImage } from '../../constants/images';

const Favorites: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const favorites = {
    courses: [
      {
        id: 1,
        title: '供应链战略规划与执行',
        description: '系统学习供应链战略规划方法和实施要点',
        instructor: '张教授',
        duration: '15小时',
        level: '高级',
        price: '￥299',
        image: 'https://example.com/course1.jpg',
        tags: ['战略规划', '实践案例'],
      },
      {
        id: 2,
        title: '数字供应链转型实践',
        description: '探索数字技术在供应链中的创新应用',
        instructor: '李教授',
        duration: '12小时',
        level: '中级',
        price: '￥259',
        image: 'https://example.com/course2.jpg',
        tags: ['数字化', '转型'],
      },
    ],
    articles: [
      {
        id: 1,
        title: '2024年供应链发展趋势分析',
        description: '深度解析全球供应链发展新趋势和机遇挑战',
        author: '王专家',
        date: '2024-03-01',
        readTime: '10分钟',
        views: 1500,
        image: 'https://example.com/article1.jpg',
        tags: ['趋势分析', '前沿洞察'],
      },
      {
        id: 2,
        title: '供应链风险管理最佳实践',
        description: '总结供应链风险管理的实践经验和方法论',
        author: '李专家',
        date: '2024-02-28',
        readTime: '15分钟',
        views: 2000,
        image: 'https://example.com/article2.jpg',
        tags: ['风险管理', '最佳实践'],
      },
    ],
    resources: [
      {
        id: 1,
        title: '供应链管理工具包',
        description: '实用的供应链管理工具和模板集合',
        type: '工具包',
        downloads: 500,
        fileSize: '2.5MB',
        date: '2024-02-15',
        tags: ['工具', '模板'],
      },
      {
        id: 2,
        title: '供应链标准化实施指南',
        description: '帮助企业实现供应链标准化的实操指南',
        type: '指南',
        downloads: 800,
        fileSize: '3.8MB',
        date: '2024-02-10',
        tags: ['标准化', '实施指南'],
      },
    ],
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">我的收藏</Heading>
        <Text fontSize="xl" color="gray.600">
          管理您收藏的课程、文章和资源
        </Text>
      </VStack>

      {/* 收藏内容 */}
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        overflow="hidden"
      >
        <Tabs>
          <TabList px={6} pt={4}>
            <Tab>
              <HStack>
                <Icon as={FiBook} />
                <Text>课程</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <Icon as={FiFileText} />
                <Text>文章</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <Icon as={FiVideo} />
                <Text>资源</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* 收藏的课程 */}
            <TabPanel p={6}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {favorites.courses.map((course) => (
                  <Box
                    key={course.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                    overflow="hidden"
                  >
                    <Image
                      src={getDynamicPlaceholderImage(course.title, 'course', 'medium')}
                      alt={course.title}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                      fallbackSrc={getDynamicPlaceholderImage(course.title, 'course', 'medium')}
                    />
                    <Box p={6}>
                      <VStack align="stretch" spacing={4}>
                        <HStack justify="space-between">
                          <Badge colorScheme="blue">{course.level}</Badge>
                          <Text color="blue.500" fontWeight="bold">
                            {course.price}
                          </Text>
                        </HStack>

                        <VStack align="start" spacing={2}>
                          <Heading size="md">{course.title}</Heading>
                          <Text color="gray.600" noOfLines={2}>
                            {course.description}
                          </Text>
                        </VStack>

                        <HStack spacing={4}>
                          <Text fontSize="sm" color="gray.500">
                            讲师：{course.instructor}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            {course.duration}
                          </Text>
                        </HStack>

                        <HStack spacing={2}>
                          {course.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              colorScheme="blue"
                              variant="subtle"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>

                        <HStack spacing={4}>
                          <Button colorScheme="blue" flex="1">
                            立即学习
                          </Button>
                          <Button
                            leftIcon={<FiBookmark />}
                            variant="outline"
                            colorScheme="blue"
                          >
                            取消收藏
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* 收藏的文章 */}
            <TabPanel p={6}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {favorites.articles.map((article) => (
                  <Box
                    key={article.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                    overflow="hidden"
                  >
                    <Image
                      src={getDynamicPlaceholderImage(article.title, 'news', 'medium')}
                      alt={article.title}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                      fallbackSrc={getDynamicPlaceholderImage(article.title, 'news', 'medium')}
                    />
                    <Box p={6}>
                      <VStack align="stretch" spacing={4}>
                        <VStack align="start" spacing={2}>
                          <Heading size="md">{article.title}</Heading>
                          <Text color="gray.600" noOfLines={2}>
                            {article.description}
                          </Text>
                        </VStack>

                        <HStack spacing={4}>
                          <HStack>
                            <Icon as={FiClock} color="gray.500" />
                            <Text fontSize="sm" color="gray.500">
                              {article.readTime}
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={FiEye} color="gray.500" />
                            <Text fontSize="sm" color="gray.500">
                              {article.views}
                            </Text>
                          </HStack>
                        </HStack>

                        <HStack spacing={2}>
                          {article.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              colorScheme="purple"
                              variant="subtle"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </HStack>

                        <HStack spacing={4}>
                          <Button colorScheme="purple" flex="1">
                            阅读全文
                          </Button>
                          <Button
                            leftIcon={<FiBookmark />}
                            variant="outline"
                            colorScheme="purple"
                          >
                            取消收藏
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* 收藏的资源 */}
            <TabPanel p={6}>
              <VStack spacing={6} align="stretch">
                {favorites.resources.map((resource) => (
                  <Box
                    key={resource.id}
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Badge colorScheme="green">{resource.type}</Badge>
                        <Text fontSize="sm" color="gray.500">
                          {resource.fileSize}
                        </Text>
                      </HStack>

                      <VStack align="start" spacing={2}>
                        <Heading size="md">{resource.title}</Heading>
                        <Text color="gray.600">{resource.description}</Text>
                      </VStack>

                      <HStack spacing={4}>
                        <Text fontSize="sm" color="gray.500">
                          下载次数：{resource.downloads}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          更新日期：{resource.date}
                        </Text>
                      </HStack>

                      <HStack spacing={2}>
                        {resource.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            colorScheme="green"
                            variant="subtle"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </HStack>

                      <HStack spacing={4}>
                        <Button colorScheme="green" flex="1">
                          下载资源
                        </Button>
                        <Button
                          leftIcon={<FiBookmark />}
                          variant="outline"
                          colorScheme="green"
                        >
                          取消收藏
                        </Button>
                        <Button
                          leftIcon={<FiShare2 />}
                          variant="outline"
                          colorScheme="green"
                        >
                          分享
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Favorites; 