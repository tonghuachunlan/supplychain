import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiEdit2, FiMail, FiPhone } from 'react-icons/fi';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    joinDate: string;
  };
  onUpdate: (data: Partial<ProfileCardProps['user']>) => Promise<void>;
}

export function ProfileCard({ user, onUpdate }: ProfileCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
  });
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onUpdate(formData);
      toast({
        title: '更新成功',
        status: 'success',
        duration: 2000,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: '更新失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <VStack spacing={6} align="stretch">
          {/* 头像和基本信息 */}
          <HStack spacing={6}>
            <Avatar
              size="xl"
              name={user.name}
              src={user.avatar}
              bg="brand.500"
            />
            <VStack align="start" flex={1} spacing={2}>
              <HStack justify="space-between" width="100%">
                <Text fontSize="2xl" fontWeight="bold">
                  {user.name}
                </Text>
                <Button
                  leftIcon={<FiEdit2 />}
                  size="sm"
                  variant="ghost"
                  onClick={onOpen}
                >
                  编辑资料
                </Button>
              </HStack>
              <Text color="gray.500">
                加入时间：{new Date(user.joinDate).toLocaleDateString()}
              </Text>
            </VStack>
          </HStack>

          {/* 联系信息 */}
          <VStack align="start" spacing={3}>
            <HStack>
              <FiMail />
              <Text>{user.email}</Text>
            </HStack>
            {user.phone && (
              <HStack>
                <FiPhone />
                <Text>{user.phone}</Text>
              </HStack>
            )}
          </VStack>
        </VStack>
      </Box>

      {/* 编辑个人信息弹窗 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>编辑个人信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>姓名</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="请输入姓名"
                />
              </FormControl>

              <FormControl>
                <FormLabel>手机号码</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="请输入手机号码"
                />
              </FormControl>

              <HStack justify="flex-end" width="100%" pt={4}>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  取消
                </Button>
                <Button
                  colorScheme="brand"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  保存
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
} 