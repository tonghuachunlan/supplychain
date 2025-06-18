import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
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