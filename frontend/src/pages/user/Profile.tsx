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
  Avatar,
  Badge,
  Input,
  FormControl,
  FormLabel,
  Divider,
  useColorModeValue,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiAward,
  FiTrendingUp,
  FiBriefcase,
  FiEdit,
} from 'react-icons/fi';
import { getDynamicPlaceholderImage } from '../../constants/images';

const Profile: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const userProfile = {
    name: '张三',
    title: '供应链管理专家',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    company: '某科技有限公司',
    position: '供应链总监',
    avatar: 'https://example.com/avatar.jpg',
    certifications: ['供应链管理师', 'PMP认证', 'CPIM认证'],
    stats: {
      coursesCompleted: 25,
      certificatesEarned: 3,
      learningHours: 150,
      ranking: 98,
    },
    expertise: ['供应链战略', '库存管理', '采购管理', '物流优化'],
  };

  return (
    <Container maxW="container.xl" py={8}>
      {/* 个人信息卡片 */}
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        p={6}
        mb={8}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* 基本信息 */}
          <VStack align="start" spacing={6}>
            <HStack spacing={6}>
              <Avatar
                size="2xl"
                name={userProfile.name}
                src={getDynamicPlaceholderImage('用户头像', 'avatar', 'medium')}
              />
              <VStack align="start" spacing={2}>
                <Heading size="lg">{userProfile.name}</Heading>
                <Text color="gray.600">{userProfile.title}</Text>
                <HStack>
                  {userProfile.certifications.map((cert, index) => (
                    <Badge key={index} colorScheme="blue">
                      {cert}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </HStack>

            <VStack align="start" spacing={4} width="100%">
              <FormControl>
                <FormLabel>
                  <HStack>
                    <Icon as={FiMail} />
                    <Text>邮箱</Text>
                  </HStack>
                </FormLabel>
                <Input value={userProfile.email} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <HStack>
                    <Icon as={FiPhone} />
                    <Text>电话</Text>
                  </HStack>
                </FormLabel>
                <Input value={userProfile.phone} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <HStack>
                    <Icon as={FiBriefcase} />
                    <Text>公司</Text>
                  </HStack>
                </FormLabel>
                <Input value={userProfile.company} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <HStack>
                    <Icon as={FiUser} />
                    <Text>职位</Text>
                  </HStack>
                </FormLabel>
                <Input value={userProfile.position} isReadOnly />
              </FormControl>
            </VStack>

            <Button leftIcon={<FiEdit />} colorScheme="blue">
              编辑资料
            </Button>
          </VStack>

          {/* 学习统计 */}
          <VStack align="stretch" spacing={6}>
            <Heading size="md">学习统计</Heading>
            <SimpleGrid columns={2} spacing={6}>
              <Stat bg="blue.50" p={4} borderRadius="lg">
                <StatLabel>已完成课程</StatLabel>
                <StatNumber>{userProfile.stats.coursesCompleted}</StatNumber>
                <StatHelpText>
                  <Icon as={FiBook} mr={2} />
                  课程
                </StatHelpText>
              </Stat>

              <Stat bg="green.50" p={4} borderRadius="lg">
                <StatLabel>获得证书</StatLabel>
                <StatNumber>{userProfile.stats.certificatesEarned}</StatNumber>
                <StatHelpText>
                  <Icon as={FiAward} mr={2} />
                  证书
                </StatHelpText>
              </Stat>

              <Stat bg="purple.50" p={4} borderRadius="lg">
                <StatLabel>学习时长</StatLabel>
                <StatNumber>{userProfile.stats.learningHours}</StatNumber>
                <StatHelpText>
                  <Icon as={FiTrendingUp} mr={2} />
                  小时
                </StatHelpText>
              </Stat>

              <Stat bg="orange.50" p={4} borderRadius="lg">
                <StatLabel>学习排名</StatLabel>
                <StatNumber>前 {userProfile.stats.ranking}%</StatNumber>
                <StatHelpText>超过98%的学员</StatHelpText>
              </Stat>
            </SimpleGrid>

            <Divider />

            <VStack align="start" spacing={4}>
              <Heading size="md">专业领域</Heading>
              <HStack wrap="wrap" spacing={2}>
                {userProfile.expertise.map((skill, index) => (
                  <Badge
                    key={index}
                    colorScheme="blue"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {skill}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Profile; 