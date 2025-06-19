import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Button,
  Icon,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import TechHeading from '../../components/common/TechHeading';
import GlassCard from '../../components/common/GlassCard';

const ConsultingContact = () => {
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加表单提交逻辑
    toast({
      title: '提交成功',
      description: '我们会尽快与您联系',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: '电话咨询',
      content: '400-123-4567',
      description: '工作日 9:00-18:00',
    },
    {
      icon: FiMail,
      title: '邮件咨询',
      content: 'consulting@supplychain.edu.cn',
      description: '24小时内回复',
    },
    {
      icon: FiMapPin,
      title: '公司地址',
      content: '北京市海淀区北方地产大厦888号',
      description: '欢迎来访交流',
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* 联系方式 */}
          <Box textAlign="center" w="full">
            <TechHeading size="2xl" mb={6}>
              联系我们
            </TechHeading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" mb={12}>
              专业的咨询团队随时为您提供支持
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {contactInfo.map((info) => (
                <GlassCard key={info.title} p={8}>
                  <VStack spacing={4}>
                    <Icon
                      as={info.icon}
                      w={8}
                      h={8}
                      color="brand.primary"
                    />
                    <TechHeading size="md">
                      {info.title}
                    </TechHeading>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="brand.primary"
                    >
                      {info.content}
                    </Text>
                    <Text color="gray.600">
                      {info.description}
                    </Text>
                  </VStack>
                </GlassCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* 咨询表单 */}
          <Box w="full">
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
              <Box>
                <TechHeading size="xl" mb={6}>
                  预约咨询
                </TechHeading>
                <Text color="gray.600" mb={8}>
                  请填写以下信息，我们的顾问将尽快与您联系，为您提供专业的解决方案。
                </Text>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>姓名</FormLabel>
                    <Input placeholder="请输入您的姓名" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>公司</FormLabel>
                    <Input placeholder="请输入公司名称" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>职位</FormLabel>
                    <Input placeholder="请输入您的职位" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>联系电话</FormLabel>
                    <Input placeholder="请输入联系电话" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>电子邮箱</FormLabel>
                    <Input type="email" placeholder="请输入电子邮箱" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>咨询类型</FormLabel>
                    <Select placeholder="请选择咨询类型">
                      <option value="enterprise">企业服务</option>
                      <option value="training">定制培训</option>
                      <option value="assessment">供应链评估</option>
                      <option value="other">其他咨询</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>咨询内容</FormLabel>
                    <Textarea
                      placeholder="请详细描述您的需求"
                      rows={5}
                    />
                  </FormControl>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    提交咨询
                  </Button>
                </VStack>
              </Box>

              <Box
                bg="brand.primary"
                color="white"
                p={12}
                borderRadius="2xl"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <TechHeading size="xl" color="white" mb={6}>
                  为什么选择我们？
                </TechHeading>
                <VStack spacing={8} align="stretch">
                  <Box>
                    <TechHeading size="md" color="white" mb={2}>
                      专业的顾问团队
                    </TechHeading>
                    <Text>
                      拥有丰富的供应链管理经验和行业洞察
                    </Text>
                  </Box>
                  <Box>
                    <TechHeading size="md" color="white" mb={2}>
                      定制化解决方案
                    </TechHeading>
                    <Text>
                      根据企业实际需求，提供针对性的解决方案
                    </Text>
                  </Box>
                  <Box>
                    <TechHeading size="md" color="white" mb={2}>
                      全程专业支持
                    </TechHeading>
                    <Text>
                      从方案设计到实施落地，提供全程指导
                    </Text>
                  </Box>
                  <Box>
                    <TechHeading size="md" color="white" mb={2}>
                      持续服务保障
                    </TechHeading>
                    <Text>
                      定期跟进和效果评估，确保方案落地
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ConsultingContact; 