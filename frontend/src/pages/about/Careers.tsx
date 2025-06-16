import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiCheckCircle, FiBriefcase, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const benefits = [
  {
    icon: FiBriefcase,
    title: '富有竞争力的薪资',
    description: '提供行业领先的薪资待遇和完善的福利体系',
  },
  {
    icon: FiUsers,
    title: '团队文化',
    description: '开放、创新、协作的工作环境，促进个人成长',
  },
  {
    icon: FiTrendingUp,
    title: '职业发展',
    description: '清晰的晋升路径和丰富的培训机会',
  },
  {
    icon: FiAward,
    title: '工作生活平衡',
    description: '弹性工作制和人性化的假期制度',
  },
];

const positions = [
  {
    title: '供应链咨询顾问',
    department: '咨询部',
    location: '北京',
    type: '全职',
    requirements: [
      '供应链管理、物流管理等相关专业本科及以上学历',
      '3年以上供应链咨询或相关行业工作经验',
      '熟悉供应链管理理论和实践',
      '优秀的沟通能力和项目管理能力',
    ],
    responsibilities: [
      '为客户提供供应链战略规划和优化建议',
      '负责供应链咨询项目的执行和交付',
      '编写咨询报告和解决方案文档',
      '参与业务拓展和客户关系维护',
    ],
  },
  {
    title: '供应链数字化产品经理',
    department: '产品部',
    location: '北京',
    type: '全职',
    requirements: [
      '计算机、信息系统等相关专业本科及以上学历',
      '5年以上供应链软件产品经理经验',
      '熟悉供应链业务流程和数字化转型',
      '优秀的产品设计能力和项目管理能力',
    ],
    responsibilities: [
      '负责供应链数字化产品的规划和设计',
      '制定产品路线图和迭代计划',
      '协调研发团队进行产品开发',
      '收集用户反馈并持续优化产品',
    ],
  },
  {
    title: '供应链培训讲师',
    department: '培训部',
    location: '北京',
    type: '全职',
    requirements: [
      '供应链管理相关专业硕士及以上学历',
      '5年以上供应链实践或培训经验',
      '优秀的培训授课能力和课程开发能力',
      '良好的沟通能力和表达能力',
    ],
    responsibilities: [
      '设计和开发供应链培训课程',
      '进行线上和线下培训授课',
      '编写培训教材和案例',
      '参与培训方案定制和客户沟通',
    ],
  },
];

export default function Careers() {
  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 页面标题 */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="gray.800">
              加入我们
            </Heading>
            <Text color="gray.600" maxW="2xl">
              与行业领先的供应链专家团队一起，开启您的职业发展新篇章
            </Text>
          </VStack>

          {/* 公司福利 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {benefits.map((benefit, index) => (
              <MotionBox
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <VStack
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  shadow="lg"
                  spacing={4}
                  _hover={{ transform: 'translateY(-8px)' }}
                  transition="all 0.3s"
                >
                  <Icon as={benefit.icon} w={8} h={8} color="blue.500" />
                  <Heading size="md" color="gray.800">
                    {benefit.title}
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    {benefit.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* 职位列表 */}
          <Box bg="white" p={8} borderRadius="xl" shadow="lg" w="full">
            <VStack spacing={8} align="stretch">
              <Heading size="lg" color="gray.800">
                当前职位
              </Heading>
              <Accordion allowMultiple>
                {positions.map((position, index) => (
                  <AccordionItem key={position.title} border="none" mb={4}>
                    <AccordionButton
                      bg="gray.50"
                      _hover={{ bg: 'gray.100' }}
                      borderRadius="lg"
                      p={4}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                          {position.title}
                        </Text>
                        <HStack spacing={4} mt={2}>
                          <Text color="gray.600">{position.department}</Text>
                          <Text color="gray.600">{position.location}</Text>
                          <Text color="blue.500">{position.type}</Text>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} pt={6}>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Heading size="sm" mb={2} color="gray.800">
                            职位要求
                          </Heading>
                          <List spacing={2}>
                            {position.requirements.map((req, idx) => (
                              <ListItem key={idx}>
                                <ListIcon as={FiCheckCircle} color="green.500" />
                                {req}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                        <Box>
                          <Heading size="sm" mb={2} color="gray.800">
                            工作职责
                          </Heading>
                          <List spacing={2}>
                            {position.responsibilities.map((resp, idx) => (
                              <ListItem key={idx}>
                                <ListIcon as={FiCheckCircle} color="green.500" />
                                {resp}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                        <Button
                          colorScheme="blue"
                          alignSelf="flex-start"
                          size="md"
                          mt={4}
                        >
                          立即申请
                        </Button>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 