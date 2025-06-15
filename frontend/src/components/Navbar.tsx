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
    <Box
      as="nav"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <RouterLink to="/">
            <Text fontSize="xl" fontWeight="bold" color="brand.500">
              供应链思维学院
            </Text>
          </RouterLink>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <RouterLink to="/courses">
              <Text>课程</Text>
            </RouterLink>
            {user && (
              <>
                <RouterLink to="/profile">
                  <Text>个人中心</Text>
                </RouterLink>
                <RouterLink to="/orders">
                  <Text>我的订单</Text>
                </RouterLink>
              </>
            )}
          </HStack>

          {/* Right Section */}
          <HStack spacing={4}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
            />

            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" name={user.username} src={user.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    个人中心
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/orders">
                    我的订单
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>退出登录</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Button as={RouterLink} to="/login" variant="ghost">
                  登录
                </Button>
                <Button as={RouterLink} to="/register">
                  注册
                </Button>
              </HStack>
            )}

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <FiX /> : <FiMenu />}
              variant="ghost"
              aria-label="Toggle navigation"
            />
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              <RouterLink to="/courses">
                <Text>课程</Text>
              </RouterLink>
              {user ? (
                <>
                  <RouterLink to="/profile">
                    <Text>个人中心</Text>
                  </RouterLink>
                  <RouterLink to="/orders">
                    <Text>我的订单</Text>
                  </RouterLink>
                  <Text cursor="pointer" onClick={handleLogout}>
                    退出登录
                  </Text>
                </>
              ) : (
                <>
                  <RouterLink to="/login">
                    <Text>登录</Text>
                  </RouterLink>
                  <RouterLink to="/register">
                    <Text>注册</Text>
                  </RouterLink>
                </>
              )}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
} 