import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  HStack,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const teamMembers = [
  {
    name: '张三',
    position: '首席执行官',
    image: '/images/team/member1.jpg',
    bio: '20年供应链管理经验，曾任多家世界500强企业供应链总监',
    linkedin: 'https://linkedin.com',
    email: 'zhangsan@example.com',
  },
  {
    name: '李四',
    position: '技术总监',
    image: '/images/team/member2.jpg',
    bio: '15年供应链技术研发经验，专注数字化转型解决方案',
    linkedin: 'https://linkedin.com',
    email: 'lisi@example.com',
  },
  {
    name: '王五',
    position: '咨询总监',
    image: '/images/team/member3.jpg',
    bio: '12年供应链咨询经验，服务过100+企业客户',
    linkedin: 'https://linkedin.com',
    email: 'wangwu@example.com',
  },
  {
    name: '赵六',
    position: '培训总监',
    image: '/images/team/member4.jpg',
    bio: '10年供应链培训经验，培训学员超过10000人',
    linkedin: 'https://linkedin.com',
    email: 'zhaoliu@example.com',
  },
];

export default function Team() {
  const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 团队介绍标题 */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="gray.800">
              我们的团队
            </Heading>
            <Text color="gray.600" maxW="2xl">
              由行业专家组成的专业团队，为您提供最优质的供应链解决方案
            </Text>
          </VStack>

          {/* 团队成员展示 */}
          <SimpleGrid columns={columnCount} spacing={8} w="full">
            {teamMembers.map((member, index) => (
              <MotionBox
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <VStack
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  shadow="lg"
                  spacing={4}
                  _hover={{ transform: 'translateY(-8px)' }}
                  transition="all 0.3s"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    boxSize="200px"
                    objectFit="cover"
                    fallbackSrc="/images/placeholder-avatar.svg"
                  />
                  <VStack spacing={2}>
                    <Heading size="md" color="gray.800">
                      {member.name}
                    </Heading>
                    <Text color="blue.500" fontWeight="bold">
                      {member.position}
                    </Text>
                  </VStack>
                  <Text color="gray.600" textAlign="center">
                    {member.bio}
                  </Text>
                  <HStack spacing={4}>
                    <Icon
                      as={FiLinkedin}
                      w={5}
                      h={5}
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ color: 'blue.600' }}
                      onClick={() => window.open(member.linkedin, '_blank')}
                    />
                    <Icon
                      as={FiMail}
                      w={5}
                      h={5}
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ color: 'blue.600' }}
                      onClick={() => window.location.href = `mailto:${member.email}`}
                    />
                  </HStack>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
} 