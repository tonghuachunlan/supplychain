import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  GridItem,
  VStack,
  Container,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { courseService } from "../api/services";
import { VideoPlayer } from "../components/VideoPlayer";
import { CourseOutline } from "../components/CourseOutline";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourse(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError || !course) {
    return (
      <Alert status="error" mt="10">
        <AlertIcon />
        无法加载课程详情。
      </Alert>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            {course.title}
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {course.description}
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <VideoPlayer
              videoUrl={""}
            />
          </GridItem>
          <GridItem>
            <CourseOutline chapters={course.chapters} />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default CourseDetail; 