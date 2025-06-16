import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Radio,
  RadioGroup,
  useDisclosure,
  useToast,
  Box,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { courseService } from '../api/services/course.service';

interface EnrollButtonProps {
  courseId: string;
  price: number;
  isEnrolled?: boolean;
}

export default function EnrollButton({ courseId, price, isEnrolled = false }: EnrollButtonProps) {
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'creditcard'>('alipay');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEnroll = async () => {
    if (isEnrolled) {
      // 已报名，直接跳转到学习页面
      window.location.href = `/courses/${courseId}/learn`;
      return;
    }
    onOpen();
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // 模拟支付过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟报名课程
      await courseService.enroll(courseId);
      
      onClose();
      
      toast({
        title: '报名成功',
        description: '开始学习吧！',
        status: 'success',
        duration: 3000,
      });
      
      // 跳转到学习页面
      window.location.href = `/courses/${courseId}/learn`;
    } catch (error: any) {
      toast({
        title: '支付失败',
        description: error.message || '请稍后重试',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        colorScheme="blue"
        leftIcon={<FiShoppingCart />}
        onClick={handleEnroll}
        isLoading={isProcessing}
        width="100%"
      >
        {isEnrolled ? '继续学习' : '立即报名'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>选择支付方式</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={6} align="stretch" pb={6}>
              <Box borderWidth={1} borderRadius="md" p={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  课程费用：¥{price.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  报名后可立即开始学习
                </Text>
              </Box>

              <RadioGroup value={paymentMethod} onChange={(value: any) => setPaymentMethod(value)}>
                <VStack align="stretch" spacing={3}>
                  <Radio value="alipay">
                    <HStack>
                      <Text>支付宝支付</Text>
                      <Text fontSize="sm" color="gray.500">
                        推荐使用支付宝APP扫码支付
                      </Text>
                    </HStack>
                  </Radio>
                  
                  <Radio value="wechat">
                    <HStack>
                      <Text>微信支付</Text>
                      <Text fontSize="sm" color="gray.500">
                        使用微信扫码支付
                      </Text>
                    </HStack>
                  </Radio>
                  
                  <Radio value="creditcard">
                    <HStack>
                      <Text>信用卡支付</Text>
                      <Text fontSize="sm" color="gray.500">
                        支持Visa、Mastercard等
                      </Text>
                    </HStack>
                  </Radio>
                </VStack>
              </RadioGroup>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handlePayment}
                isLoading={isProcessing}
              >
                确认支付
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
} 