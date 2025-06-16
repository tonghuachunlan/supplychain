import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  Icon,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiTarget,
  FiBook,
  FiAward,
  FiCheck,
  FiMonitor,
  FiClipboard,
  FiTrendingUp,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TechHeading from '../../components/common/TechHeading';
import GlassCard from '../../components/common/GlassCard';

const CustomTraining = () => {
  const trainingTypes = [
    {
      title: '管理层培训',
      description: '面向企业高管的供应链战略与管理课程',
      features: [
        '供应链战略规划',
        '风险管理与控制',
        '数字化转型领导力',
        '全球供应链管理',
      ],
      icon: FiUsers,
    },
    {
      title: '专业人员培训',
      description: '面向供应链专业人员的实操技能培训',
      features: [
        '需求预测与计划',
        '库存优化管理',
        '采购谈判技巧',
        '物流运营管理',
      ],
      icon: FiTarget,
    },
    {
      title: '认证课程',
      description: '国际供应链专业认证培训课程',
      features: [
        'CSCP认证培训',
        'CPIM认证培训',
        'CLTD认证培训',
        'SCOR-P认证培训',
      ],
      icon: FiAward,
    },
  ];

  const trainingMethods = [
    {
      title: '线下培训',
      description: '面对面授课，深度交流互动',
      icon: FiUsers,
      features: ['专家现场授课', '案例研讨', '小组讨论', '实地考察'],
    },
    {
      title: '在线培训',
      description: '灵活便捷的线上学习方式',
      icon: FiMonitor,
      features: ['直播课程', '录播课程', '在线答疑', '作业点评'],
    },
    {
      title: '混合式培训',
      description: '线上线下相结合的培训模式',
      icon: FiBook,
      features: ['线上自学', '线下研讨', '项目实践', '导师指导'],
    },
    {
      title: '企业内训',
      description: '根据企业需求定制的培训方案',
      icon: FiClipboard,
      features: ['需求调研', '方案定制', '课程开发', '效果评估'],
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 培训介绍 */}
          <Box textAlign="center">
            <TechHeading size="2xl" mb={6}>
              企业定制培训
            </TechHeading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              为企业量身定制专业的供应链培训课程，提升团队专业能力
            </Text>
          </Box>

          {/* 培训类型 */}
          <Box w="full">
            <TechHeading size="xl" mb={8}>
              培训类型
            </TechHeading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {trainingTypes.map((type) => (
                <GlassCard key={type.title} p={8}>
                  <VStack spacing={6} align="flex-start">
                    <Icon
                      as={type.icon}
                      w={10}
                      h={10}
                      color="brand.primary"
                    />
                    <TechHeading size="lg">
                      {type.title}
                    </TechHeading>
                    <Text color="gray.600">
                      {type.description}
                    </Text>
                    <List spacing={3}>
                      {type.features.map((feature) => (
                        <ListItem key={feature}>
                          <ListIcon as={FiCheck} color="brand.green" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </GlassCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 培训方式 */}
          <Box w="full">
            <TechHeading size="xl" mb={8}>
              培训方式
            </TechHeading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {trainingMethods.map((method) => (
                <GlassCard key={method.title} p={6}>
                  <VStack spacing={4}>
                    <Icon
                      as={method.icon}
                      w={8}
                      h={8}
                      color="brand.primary"
                    />
                    <TechHeading size="md">
                      {method.title}
                    </TechHeading>
                    <Text color="gray.600" textAlign="center">
                      {method.description}
                    </Text>
                    <List spacing={2} fontSize="sm">
                      {method.features.map((feature) => (
                        <ListItem key={feature}>
                          <ListIcon as={FiCheck} color="brand.green" />
                          {feature}
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                </GlassCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 培训效果 */}
          <Box
            bg="brand.primary"
            color="white"
            p={12}
            borderRadius="2xl"
            w="full"
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <VStack>
                <Icon as={FiTrendingUp} w={10} h={10} mb={4} />
                <TechHeading size="lg" color="white">
                  95%
                </TechHeading>
                <Text>客户满意度</Text>
              </VStack>
              <VStack>
                <Icon as={FiUsers} w={10} h={10} mb={4} />
                <TechHeading size="lg" color="white">
                  10000+
                </TechHeading>
                <Text>培训人次</Text>
              </VStack>
              <VStack>
                <Icon as={FiAward} w={10} h={10} mb={4} />
                <TechHeading size="lg" color="white">
                  50+
                </TechHeading>
                <Text>行业专家</Text>
              </VStack>
            </SimpleGrid>
          </Box>

          {/* 联系咨询 */}
          <Box textAlign="center">
            <TechHeading size="xl" mb={6}>
              开启企业培训计划
            </TechHeading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              我们将为您定制专业的培训方案
            </Text>
            <Button
              as={Link}
              to="/consulting/contact"
              size="lg"
              variant="primary"
            >
              预约咨询
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CustomTraining; 