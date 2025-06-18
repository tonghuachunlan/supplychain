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
  const { user, isLoading } = useAuth();

  if (isLoading || !user) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  const enhancedUser = {
    id: user.id || "",
    name: user.username || "用户",
    email: user.email || "",
    joinDate: new Date().toISOString(),
  };

  const handleUpdate = async (data: Partial<typeof enhancedUser>) => {
    // 在这里实现更新逻辑, 例如调用API
    console.log("Updating user data:", data);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 3fr" }} gap={8}>
          <GridItem>
            <VStack spacing={8}>
              <ProfileCard user={enhancedUser} onUpdate={handleUpdate} />
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