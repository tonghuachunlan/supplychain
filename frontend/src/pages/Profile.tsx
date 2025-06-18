import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ProfileCard } from "../components/ProfileCard";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  const enhancedUser = {
    ...user,
    id: user.id || "",
    name: user.name || user.username || "用户",
    email: user.email || "",
    avatar: user.avatar,
    joinDate: user.joinDate || new Date().toISOString(),
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 3fr" }} gap={8}>
          <GridItem>
            <VStack spacing={8}>
              <ProfileCard user={enhancedUser} onUpdate={() => {}} />
            </VStack>
          </GridItem>
          <GridItem>
            <Box bg="white" borderRadius="lg" shadow="sm" p={6}>
              {/* 其他功能区域，可以后续添加 */}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
} 