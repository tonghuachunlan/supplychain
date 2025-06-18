import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Grid,
  GridItem,
  Badge,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaQuestionCircle, FaGraduationCap, FaCheck } from 'react-icons/fa';

const ExpertDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // 吴树贵专家信息
  const expert = {
    id: id,
    name: '吴树贵',
    title: '供应链管理专家',
    avatar: '/images/expert-wushugui.jpg',
    description: '中国物流与采购联合会副会长，中国供应链管理专家委员会主任，中国物流学会副会长。拥有30年供应链管理经验，曾服务于多家世界500强企业。',
    expertise: ['供应链战略规划', '供应链优化', '物流管理', '采购管理'],
    achievements: [
      '发表论文50余篇',
      '出版专著8部',
      '主持国家级项目5项',
      '获得国家科技进步奖2项',
      '中国物流与采购联合会"杰出贡献奖"获得者'
    ],
    experience: [
      '中国物流与采购联合会副会长',
      '中国供应链管理专家委员会主任',
      '中国物流学会副会长',
      '清华大学供应链管理特聘教授',
      '北京大学供应链管理客座教授'
    ],
    publications: [
      '《供应链管理理论与实践》',
      '《现代物流管理》',
      '《采购与供应链管理》',
      '《供应链战略规划》',
      '《物流系统优化》'
    ]
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8}>
        {/* 专家基本信息 */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor={borderColor}
            >
              <Image
                src={expert.avatar}
                alt={expert.name}
                borderRadius="full"
                boxSize="200px"
                mx="auto"
                mb={4}
              />
              <Heading size="lg" textAlign="center" mb={2}>
                {expert.name}
              </Heading>
              <Text textAlign="center" color="gray.500" mb={4}>
                {expert.title}
              </Text>
              <HStack spacing={2} justify="center" wrap="wrap">
                {expert.expertise.map((skill, index) => (
                  <Badge key={index} colorScheme="blue">
                    {skill}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </VStack>
        </GridItem>

        {/* 专家详细信息 */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4}>专业背景</Heading>
              <Text mb={4}>{expert.description}</Text>
              
              <Heading size="md" mb={4}>主要成就</Heading>
              <List spacing={2}>
                {expert.achievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheck} color="green.500" />
                    {achievement}
                  </ListItem>
                ))}
              </List>

              <Heading size="md" mt={6} mb={4}>工作经历</Heading>
              <List spacing={2}>
                {expert.experience.map((exp, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheck} color="green.500" />
                    {exp}
                  </ListItem>
                ))}
              </List>

              <Heading size="md" mt={6} mb={4}>主要著作</Heading>
              <List spacing={2}>
                {expert.publications.map((pub, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FaCheck} color="green.500" />
                    {pub}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* 互动按钮 */}
            <HStack spacing={4} justify="center">
              <Button
                leftIcon={<FaBook />}
                colorScheme="blue"
                onClick={() => navigate('/expert/columns')}
              >
                查看专栏
              </Button>
              <Button
                leftIcon={<FaQuestionCircle />}
                colorScheme="green"
                onClick={() => navigate('/qa/expert/1')}
              >
                向专家提问
              </Button>
              <Button
                leftIcon={<FaGraduationCap />}
                colorScheme="purple"
                onClick={() => navigate('/academy/courses')}
              >
                立即学习
              </Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ExpertDetail; 