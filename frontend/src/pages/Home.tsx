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
    <Box>
      {/* Hero Section */}
      <Box
        bg={bgGradient}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 16, md: 24 }}
        px={8}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 16 }}
            align="center"
          >
            <Box flex="1">
              <Heading
                as="h1"
                size="2xl"
                mb={6}
                lineHeight="shorter"
                fontWeight="bold"
              >
                掌握供应链思维，
                <br />
                成就卓越管理者
              </Heading>
              <Text fontSize="xl" mb={8} color="gray.600">
                通过系统化的学习，掌握供应链管理的核心理念和实践技能，
                提升企业运营效率，实现可持续发展。
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/courses"
                  size="lg"
                  colorScheme="brand"
                >
                  立即开始学习
                </Button>
                <Button
                  as={RouterLink}
                  to="/about"
                  size="lg"
                  variant="outline"
                >
                  了解更多
                </Button>
              </Stack>
            </Box>
            <Box flex="1">
              <Image
                src="/hero-image.png"
                alt="Supply Chain Management"
                maxH="400px"
                objectFit="contain"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature, index) => (
              <Stack key={index} spacing={4} align="center" textAlign="center">
                <Icon
                  as={feature.icon}
                  w={10}
                  h={10}
                  color="brand.500"
                />
                <Heading as="h3" size="md">
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="brand.50" py={20}>
        <Container maxW="container.xl" textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            准备好开始您的学习之旅了吗？
          </Heading>
          <Text fontSize="lg" mb={8} color="gray.600">
            加入我们，开启供应链管理的专业学习之路。
          </Text>
          <Button
            as={RouterLink}
            to="/register"
            size="lg"
            colorScheme="brand"
            px={8}
          >
            免费注册
          </Button>
        </Container>
      </Box>
    </Box>
  );
} 