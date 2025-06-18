import {
  Box,
  Button,
  Flex,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box as="nav" bg="blue.500" color="white" p={4}>
      <Flex maxW="container.xl" mx="auto" align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          供应链思维学院
        </Link>
        <Spacer />
        <Flex gap={4} align="center">
          <Link as={RouterLink} to="/courses">课程</Link>
          {user ? (
            <>
              <Link as={RouterLink} to="/profile">
                <Text>欢迎, {user.username}</Text>
              </Link>
              <Button colorScheme="whiteAlpha" variant="outline" onClick={handleLogout}>
                退出
              </Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login">
                <Button colorScheme="whiteAlpha">登录</Button>
              </Link>
              <Link as={RouterLink} to="/register">
                <Button colorScheme="whiteAlpha" variant="outline">注册</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
} 