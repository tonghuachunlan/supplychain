import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Progress,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FiBookmark,
  FiCheck,
  FiClock,
  FiArrowRight,
  FiAward,
  FiTrendingUp,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const LearningPaths: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const paths = [
    {
      id: 1,
      title: '供应链管理师认证路径',
      description: '系统学习供应链管理知识，获取专业认证',
      duration: '6个月',
      progress: 65,
      courses: [
        '供应链管理基础',
        '库存管理与优化',
        '采购管理实务',
        '物流运输管理',
        '供应链风险管理',
        '供应链战略规划',
      ],
      certification: '供应链管理师（SCM）认证',
    },
    {
      id: 2,
      title: '数字供应链转型专家路径',
      description: '掌握供应链数字化转型所需的知识和技能',
      duration: '8个月',
      progress: 30,
      courses: [
        '供应链数字化基础',
        '数据分析与可视化',
        '供应链系统集成',
        '区块链技术应用',
        'AI在供应链中的应用',
        '数字化转型实践',
      ],
      certification: '数字供应链专家认证',
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      {/* 页面标题 */}
      <VStack align="start" spacing={4} mb={8}>
        <Heading size="2xl">学习路径</Heading>
        <Text fontSize="xl" color="gray.600">
          选择适合您的职业发展路径，系统提升供应链管理能力
        </Text>
      </VStack>

      {/* 路径列表 */}
      <VStack spacing={8} align="stretch">
        {paths.map((path) => (
          <Box
            key={path.id}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={6}>
              <HStack justify="space-between">
                <VStack align="start" spacing={2}>
                  <Heading size="lg">{path.title}</Heading>
                  <Text color="gray.600">{path.description}</Text>
                </VStack>
                <Icon as={FiTrendingUp} boxSize={8} color="blue.500" />
              </HStack>

              <HStack spacing={8}>
                <HStack>
                  <Icon as={FiClock} color="gray.500" />
                  <Text color="gray.600">预计完成时间：{path.duration}</Text>
                </HStack>
                <HStack>
                  <Icon as={FiAward} color="gray.500" />
                  <Text color="gray.600">获得{path.certification}</Text>
                </HStack>
              </HStack>

              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">学习进度</Text>
                  <Text>{path.progress}%</Text>
                </HStack>
                <Progress
                  value={path.progress}
                  colorScheme="blue"
                  borderRadius="full"
                />
              </Box>

              <Divider />

              <VStack align="start" spacing={4}>
                <Text fontWeight="bold">课程安排：</Text>
                <List spacing={3}>
                  {path.courses.map((course, index) => (
                    <ListItem key={index}>
                      <HStack>
                        <ListIcon
                          as={index < path.progress / 20 ? FiCheck : FiBookmark}
                          color={
                            index < path.progress / 20 ? 'green.500' : 'gray.500'
                          }
                        />
                        <Text color="gray.700">{course}</Text>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </VStack>

              <Button
                as={RouterLink}
                to={`/academy/paths/${path.id}`}
                colorScheme="blue"
                size="lg"
                rightIcon={<FiArrowRight />}
              >
                继续学习
              </Button>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default LearningPaths; 