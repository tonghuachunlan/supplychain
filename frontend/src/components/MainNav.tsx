import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Icon,
  Spacer,
  Avatar,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

// 导航菜单配置
const menuItems = [
  {
    label: '首页',
    path: '/',
    children: [],
  },
  {
    label: '供应链学院',
    path: '/academy',
    children: [
      { label: '基础课程', path: '/academy/basic' },
      { label: '进阶课程', path: '/academy/advanced' },
      { label: '实操指南', path: '/academy/guides' },
      { label: '学习路径', path: '/academy/paths' },
    ],
  },
  {
    label: '专家观点',
    path: '/expert',
    children: [
      { label: '专家专栏', path: '/expert/columns' },
      { label: '深度文章', path: '/expert/articles' },
      { label: '解决方案', path: '/expert/solutions' },
      { label: '专家问答', path: '/expert/qa' },
    ],
  },
  {
    label: '咨询与服务',
    path: '/consulting',
    children: [
      { label: '企业服务', path: '/consulting/enterprise' },
      { label: '定制培训', path: '/consulting/training' },
      { label: '供应链评估', path: '/consulting/assessment' },
      { label: '联系咨询', path: '/consulting/contact' },
    ],
  },
  {
    label: '新闻动态',
    path: '/news',
    children: [
      { label: '行业新闻', path: '/news' },
      { label: '政策解读', path: '/news/policy' },
      { label: '技术趋势', path: '/news/technology' },
      { label: '案例分析', path: '/news/cases' },
    ],
  },
  {
    label: '资料下载',
    path: '/resources',
    children: [
      { label: '白皮书', path: '/resources/whitepapers' },
      { label: '研究报告', path: '/resources/reports' },
      { label: '工具模板', path: '/resources/tools' },
      { label: '标准文档', path: '/resources/standards' },
    ],
  },
];

export default function MainNav() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  
  const bg = "blue.500";
  const hoverBg = "blue.600";
  const textColor = "white";

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box bg={bg} color={textColor} position="sticky" top={0} zIndex={1000}>
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center">
          <RouterLink to="/">
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              供应链思维
            </Text>
          </RouterLink>

          <HStack spacing={1} ml={8}>
            {menuItems.map((item) => (
              <Box key={item.path}>
                {item.children.length > 0 ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      rightIcon={<ChevronDownIcon />}
                      color={isActive(item.path) ? 'white' : 'whiteAlpha.900'}
                      _hover={{ bg: hoverBg }}
                    >
                      {item.label}
                    </MenuButton>
                    <MenuList bg="white">
                      {item.children.map((child) => (
                        <MenuItem
                          key={child.path}
                          as={RouterLink}
                          to={child.path}
                          color="gray.800"
                          _hover={{ bg: 'gray.100' }}
                        >
                          {child.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    as={RouterLink}
                    to={item.path}
                    variant="ghost"
                    color={isActive(item.path) ? 'white' : 'whiteAlpha.900'}
                    _hover={{ bg: hoverBg }}
                  >
                    {item.label}
                  </Button>
                )}
              </Box>
            ))}
          </HStack>

          <Spacer />

          <HStack spacing={4}>
            <Box position="relative">
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                onClick={onToggle}
              />
              <Collapse in={isOpen} animateOpacity>
                <Box
                  position="absolute"
                  right={0}
                  top="100%"
                  mt={2}
                  bg="white"
                  shadow="lg"
                  borderRadius="md"
                  p={2}
                  w="300px"
                >
                  <InputGroup size="md">
                    <Input
                      placeholder="搜索课程、专家、文章..."
                      bg="white"
                      color="gray.800"
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
                      }}
                    />
                    <InputRightElement>
                      <SearchIcon color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Collapse>
            </Box>

            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  rightIcon={<ChevronDownIcon />}
                  _hover={{ bg: hoverBg }}
                  color={textColor}
                >
                  <HStack>
                    <Avatar size="sm" name={user.username} />
                    <Text>{user.username}</Text>
                  </HStack>
                </MenuButton>
                <MenuList bg="white">
                  <MenuItem as={RouterLink} to="/user/profile" color="gray.800">个人中心</MenuItem>
                  <MenuItem as={RouterLink} to="/user/learning" color="gray.800">学习记录</MenuItem>
                  <MenuItem as={RouterLink} to="/user/favorites" color="gray.800">我的收藏</MenuItem>
                  <MenuItem as={RouterLink} to="/user/interactions" color="gray.800">互动记录</MenuItem>
                  {user.isEnterprise && (
                    <MenuItem as={RouterLink} to="/user/enterprise" color="gray.800">企业专区</MenuItem>
                  )}
                  {user.isAdmin && (
                    <MenuItem as={RouterLink} to="/admin" color="gray.800">管理平台</MenuItem>
                  )}
                  <MenuItem onClick={logout} color="gray.800">退出登录</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  color={textColor}
                  _hover={{ bg: hoverBg }}
                >
                  登录
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  variant="outline"
                  color={textColor}
                  borderColor={textColor}
                  _hover={{ bg: hoverBg }}
                >
                  注册
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
} 