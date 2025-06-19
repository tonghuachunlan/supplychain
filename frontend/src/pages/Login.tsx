import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  FormErrorMessage,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email) {
      newErrors.email = '请输入邮箱';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!password) {
      newErrors.password = '请输入密码';
    } else if (password.length < 6) {
      newErrors.password = '密码长度至少为6位';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast({
        title: '登录成功',
        description: '欢迎回来！',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      setApiError(error.message);
      // 清除密码，让用户重新输入
      setPassword('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    // 清除相关字段的错误
    setErrors(prev => ({ ...prev, [field]: '' }));
    // 清除API错误
    setApiError(null);
  };

  return (
    <Container maxW="container.sm" py={12}>
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        as="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={6}>
          <Heading textAlign="center" size="xl" mb={4}>
            登录
          </Heading>
          
          {apiError && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {apiError}
            </Alert>
          )}
          
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="请输入邮箱"
              autoComplete="email"
              isDisabled={isSubmitting}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>密码</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="请输入密码"
              autoComplete="current-password"
              isDisabled={isSubmitting}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            loadingText="登录中..."
            width="100%"
          >
            登录
          </Button>
          
          <Stack direction="row" justify="space-between" fontSize="sm">
            <Link as={RouterLink} to="/forgot-password" color="brand.500">
              忘记密码？
            </Link>
            <Text>
              还没有账号？{' '}
              <Link as={RouterLink} to="/register" color="brand.500">
                立即注册
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
} 