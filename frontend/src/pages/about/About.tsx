import { Box, Container, Heading, Text, VStack, Image } from '@chakra-ui/react';

const About = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading mb={4}>关于供应链思维学院</Heading>
          <Text color="gray.600">
            致力于为供应链从业者提供专业的学习平台
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>我们的使命</Heading>
          <Text>
            打造中国最专业的供应链在线教育平台，助力供应链人才培养和行业发展。
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>我们的愿景</Heading>
          <Text>
            成为供应链领域最具影响力的知识传播平台，推动供应链管理的创新与进步。
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>我们的价值观</Heading>
          <Text>
            专业、创新、协作、共赢
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default About; 