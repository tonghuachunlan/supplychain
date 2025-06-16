import React from 'react';
import {
  Box,
  Container,
  Flex,
  Button,
  HStack,
  Text,
  useDisclosure,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '供应链学院', path: '/academy' },
  { label: '专家观点', path: '/expert' },
  { label: '咨询与服务', path: '/consulting' },
  { label: '新闻动态', path: '/news' },
  { label: '资料下载', path: '/resources' },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Container maxW="container.xl">
        <Flex h="70px" align="center" justify="space-between">
          {/* Logo */}
          <Link to="/">
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, brand.primary, brand.orange)"
              bgClip="text"
            >
              供应链思维学院
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  color={isActive(item.path) ? 'brand.primary' : 'brand.dark'}
                  fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive(item.path) ? '20px' : '0',
                    height: '2px',
                    bg: 'brand.primary',
                    transition: 'all 0.3s ease',
                  }}
                  _hover={{
                    _after: {
                      width: '20px',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            icon={<FiMenu />}
            onClick={onOpen}
            variant="ghost"
          />

          {/* Mobile Navigation Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>导航菜单</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="stretch">
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.path} to={item.path} onClick={onClose}>
                      <Button
                        variant="ghost"
                        w="full"
                        justifyContent="flex-start"
                        color={isActive(item.path) ? 'brand.primary' : 'brand.dark'}
                        fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 