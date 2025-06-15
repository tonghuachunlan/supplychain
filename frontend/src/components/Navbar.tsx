import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useDisclosure,
  Avatar,
  Text,
  Stack,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box as="nav" bg="blue.500" color="white" p={4}>
      <Flex maxW="container.xl" mx="auto" align="center">
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          供应链思维学院
        </Link>
        <Spacer />
        <Flex gap={4}>
          <Link as={RouterLink} to="/courses">课程</Link>
          <Link as={RouterLink} to="/login">
            <Button colorScheme="whiteAlpha">登录</Button>
          </Link>
          <Link as={RouterLink} to="/register">
            <Button colorScheme="whiteAlpha" variant="outline">注册</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
} 