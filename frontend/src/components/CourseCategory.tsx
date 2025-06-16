import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

interface CourseCategoryProps {
  category: {
    id: string;
    title: string;
    description: string;
    level: string;
    courseCount: number;
  };
}

export default function CourseCategory({ category }: CourseCategoryProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
    >
      <VStack align="start" spacing={4}>
        <Badge colorScheme="blue" fontSize="sm">
          {category.level}
        </Badge>
        
        <Heading size="md">{category.title}</Heading>
        
        <Text color="gray.600" noOfLines={3}>
          {category.description}
        </Text>
        
        <Text fontSize="sm" color="gray.500">
          {category.courseCount} 门课程
        </Text>
      </VStack>
    </Box>
  );
} 