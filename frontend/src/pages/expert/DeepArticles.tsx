import {
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  Badge,
  Input,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import { getDynamicPlaceholderImage } from '../../constants/images';

// 模拟数据
const articles = [
  {
    id: '1',
    title: '数字供应链转型的关键要素与实施路径',
    summary: '本文深入分析数字供应链转型过程中的关键成功要素，并提供详细的实施路径建议...',
    coverImage: 'https://source.unsplash.com/random/800x400?digital',
    author: '张三',
    role: '供应链专家',
    publishDate: '2024-03-15',
    readTime: '15分钟',
    category: '数字化转型',
    tags: ['数字化', '转型', '供应链管理'],
  },
  {
    id: '2',
    title: '供应链韧性建设：从理论到实践',
    summary: '探讨如何在全球不确定性背景下构建具有韧性的供应链网络，包括风险评估、预警机制...',
    coverImage: 'https://source.unsplash.com/random/800x400?chain',
    author: '李四',
    role: '战略顾问',
    publishDate: '2024-03-14',
    readTime: '20分钟',
    category: '风险管理',
    tags: ['韧性', '风险管理', '供应链网络'],
  },
  {
    id: '3',
    title: '智能供应链：AI技术的创新应用',
    summary: '详细介绍人工智能技术在供应链各环节的应用案例，以及实施过程中的经验与教训...',
    coverImage: 'https://source.unsplash.com/random/800x400?ai',
    author: '王五',
    role: '技术专家',
    publishDate: '2024-03-13',
    readTime: '18分钟',
    category: '技术创新',
    tags: ['AI', '智能化', '技术应用'],
  },
  {
    id: '4',
    title: '绿色供应链：可持续发展之路',
    summary: '分析企业如何在追求经济效益的同时，实现环境友好的供应链运营模式...',
    coverImage: 'https://source.unsplash.com/random/800x400?green',
    author: '赵六',
    role: 'ESG专家',
    publishDate: '2024-03-12',
    readTime: '12分钟',
    category: '可持续发展',
    tags: ['绿色', '可持续', 'ESG'],
  },
];

export default function DeepArticles() {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <PageTemplate
      title="深度文章"
      subtitle="深入解析供应链管理的前沿话题和实践经验"
      breadcrumbs={[
        { title: '专家观点', link: '/expert' },
        { title: '深度文章' },
      ]}
    >
      {/* 筛选工具栏 */}
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={8}>
        <Input placeholder="搜索文章..." maxW={{ base: 'full', md: '300px' }} />
        <Select placeholder="文章分类" maxW={{ base: 'full', md: '200px' }}>
          <option value="digital">数字化转型</option>
          <option value="risk">风险管理</option>
          <option value="tech">技术创新</option>
          <option value="sustainable">可持续发展</option>
        </Select>
        <Select placeholder="排序方式" maxW={{ base: 'full', md: '200px' }}>
          <option value="latest">最新发布</option>
          <option value="hot">最多阅读</option>
          <option value="recommend">编辑推荐</option>
        </Select>
      </Stack>

      {/* 文章列表 */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {articles.map((article) => (
          <Card key={article.id} bg={cardBg}>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src={getDynamicPlaceholderImage(article.title, 'news', 'medium')}
                  alt={article.title}
                  objectFit="cover"
                  h="180px"
                  w="100%"
                  borderRadius="md"
                  fallbackSrc={getDynamicPlaceholderImage(article.title, 'news', 'medium')}
                />
                
                <Stack spacing={2}>
                  <HStack>
                    <Badge colorScheme="blue">{article.category}</Badge>
                    {article.tags.map((tag, index) => (
                      <Badge key={index} colorScheme="gray">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                  
                  <Heading size="md">{article.title}</Heading>
                  
                  <Text color="gray.600" noOfLines={2}>
                    {article.summary}
                  </Text>
                </Stack>

                <Stack>
                  <HStack justify="space-between">
                    <HStack spacing={4}>
                      <Text fontWeight="bold">{article.author}</Text>
                      <Text color="gray.500">{article.role}</Text>
                    </HStack>
                    <HStack spacing={4}>
                      <Text color="gray.500">{article.publishDate}</Text>
                      <Text color="gray.500">
                        阅读时间：{article.readTime}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>

                <Button
                  as={RouterLink}
                  to={`/expert/articles/${article.id}`}
                  colorScheme="blue"
                  variant="outline"
                >
                  阅读全文
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </PageTemplate>
  );
} 