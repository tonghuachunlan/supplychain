import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Image,
  Icon,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiBook, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    icon: FiBook,
    title: '专业课程',
    description: '由行业专家精心设计的供应链管理课程，理论与实践相结合。',
  },
  {
    icon: FiUsers,
    title: '互动学习',
    description: '与同学和讲师进行实时互动，分享经验，共同进步。',
  },
  {
    icon: FiAward,
    title: '认证证书',
    description: '完成课程后获得专业认证证书，提升职业竞争力。',
  },
  {
    icon: FiTrendingUp,
    title: '职业发展',
    description: '掌握供应链管理技能，开启职业发展新机遇。',
  },
];

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.50, blue.100)',
    'linear(to-r, blue.900, blue.800)'
  );

  return (
    <Container maxW="container.xl">
      <Box py={20} textAlign="center">
        <VStack spacing={6}>
          <Heading as="h1" size="2xl">
            欢迎来到供应链思维学院
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            在这里，您可以学习供应链管理的核心理念和实践技能，提升职业竞争力。
          </Text>
          <Button
            as={RouterLink}
            to="/courses"
            size="lg"
            colorScheme="blue"
            mt={8}
          >
            浏览课程
          </Button>
        </VStack>
      </Box>
    </Container>
  );
} 