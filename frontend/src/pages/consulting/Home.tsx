import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { FiTarget, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TechHeading from '../../components/common/TechHeading';
import GlassCard from '../../components/common/GlassCard';

const ConsultingHome = () => {
  const services = [
    {
      title: '企业服务',
      description: '为企业提供定制化的供应链解决方案',
      icon: FiTarget,
      path: '/consulting/enterprise',
    },
    {
      title: '定制培训',
      description: '根据企业需求定制专业的供应链培训课程',
      icon: FiUsers,
      path: '/consulting/training',
    },
    {
      title: '供应链评估',
      description: '全面评估企业供应链现状，提供优化建议',
      icon: FiTrendingUp,
      path: '/consulting/assessment',
    },
    {
      title: '专家咨询',
      description: '连接行业专家，解决供应链难题',
      icon: FiAward,
      path: '/consulting/contact',
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 服务介绍 */}
          <Box textAlign="center">
            <TechHeading size="2xl" mb={6}>
              咨询与服务
            </TechHeading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              依托专业团队和丰富经验，为企业提供全方位的供应链解决方案
            </Text>
          </Box>

          {/* 服务列表 */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {services.map((service) => (
              <Link key={service.path} to={service.path}>
                <GlassCard
                  p={8}
                  h="full"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'xl',
                  }}
                >
                  <VStack spacing={6} align="flex-start">
                    <Icon
                      as={service.icon}
                      w={10}
                      h={10}
                      color="brand.primary"
                    />
                    <TechHeading size="lg">
                      {service.title}
                    </TechHeading>
                    <Text color="gray.600">
                      {service.description}
                    </Text>
                    <Button
                      variant="primary"
                      size="lg"
                      w="full"
                    >
                      了解更多
                    </Button>
                  </VStack>
                </GlassCard>
              </Link>
            ))}
          </SimpleGrid>

          {/* 联系我们 */}
          <Box
            bg="brand.primary"
            color="white"
            p={12}
            borderRadius="2xl"
            textAlign="center"
            w="full"
          >
            <TechHeading size="xl" color="white" mb={6}>
              需要专业咨询？
            </TechHeading>
            <Text fontSize="lg" mb={8}>
              我们的专家团队随时为您提供支持
            </Text>
            <Button
              as={Link}
              to="/consulting/contact"
              size="lg"
              colorScheme="white"
              variant="outline"
              _hover={{
                bg: 'white',
                color: 'brand.primary',
              }}
            >
              立即咨询
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ConsultingHome; 