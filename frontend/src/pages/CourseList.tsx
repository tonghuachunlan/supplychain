import {
  Box,
  Container,
  SimpleGrid,
  Input,
  Select,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUsers, FiClock } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { Course } from '../types';

const categories = [
  { value: '', label: '全部分类' },
  { value: '供应链管理', label: '供应链管理' },
  { value: '物流管理', label: '物流管理' },
  { value: '采购管理', label: '采购管理' },
  { value: '库存管理', label: '库存管理' },
  { value: '生产管理', label: '生产管理' },
];

const levels = [
  { value: '', label: '全部难度' },
  { value: '入门', label: '入门' },
  { value: '初级', label: '初级' },
  { value: '中级', label: '中级' },
  { value: '高级', label: '高级' },
];

export default function CourseList() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await apiService.get<Course[]>('/courses');
      return response.data;
    },
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading size="xl">课程列表</Heading>

        {/* 搜索和筛选 */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align={{ base: 'stretch', md: 'center' }}
        >
          <Input placeholder="搜索课程..." />
          <Select>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <Select>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </Select>
        </Stack>

        {/* 课程列表 */}
        {isLoading ? (
          <Text>加载中...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {data?.map((course) => (
              <Box
                key={course._id}
                bg={cardBg}
                borderRadius="lg"
                overflow="hidden"
                border="1px"
                borderColor={borderColor}
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              >
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <Box p={6}>
                  <Stack spacing={4}>
                    <Heading as="h3" size="md" noOfLines={2}>
                      {course.title}
                    </Heading>
                    <Text noOfLines={3} color="gray.600">
                      {course.description}
                    </Text>
                    <HStack>
                      <Badge colorScheme="blue">{course.category}</Badge>
                      <Badge colorScheme="green">{course.level}</Badge>
                    </HStack>
                    <HStack spacing={4} color="gray.600">
                      <HStack>
                        <Icon as={FiUsers} />
                        <Text>{course.totalStudents} 名学员</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiClock} />
                        <Text>{course.syllabus.length} 课时</Text>
                      </HStack>
                    </HStack>
                    <Stack
                      direction="row"
                      justify="space-between"
                      align="center"
                      pt={2}
                    >
                      <Text fontWeight="bold" fontSize="xl">
                        ¥{course.price}
                      </Text>
                      <Button
                        as={RouterLink}
                        to={`/courses/${course._id}`}
                        colorScheme="brand"
                      >
                        查看详情
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
} 