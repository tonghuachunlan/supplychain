import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Icon,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const footerSections = [
  {
    title: '关于我们',
    links: [
      { label: '平台介绍', path: '/about' },
      { label: '团队介绍', path: '/team' },
      { label: '联系我们', path: '/contact' },
    ],
  },
  {
    title: '帮助中心',
    links: [
      { label: '新手指南', path: '/help/guide' },
      { label: '常见问题', path: '/help/faq' },
      { label: '意见反馈', path: '/help/feedback' },
      { label: '服务条款', path: '/help/terms' },
    ],
  },
  {
    title: '合作与服务',
    links: [
      { label: '企业合作', path: '/cooperation/enterprise' },
      { label: '企业培训', path: '/service/training' },
      { label: '院校合作', path: '/cooperation/college' },
      { label: '讲师招募', path: '/cooperation/lecturer' },
    ],
  },
];

export default function Footer() {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor}>
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {footerSections.map((section) => (
            <Stack key={section.title} spacing={4}>
              <Text fontWeight="bold" fontSize="lg">
                {section.title}
              </Text>
              <Stack spacing={2}>
                {section.links.map((link) => (
                  <Link
                    key={link.path}
                    as={RouterLink}
                    to={link.path}
                    color="gray.600"
                    _hover={{ color: 'blue.500' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>

        <Box borderTop="1px" borderColor={borderColor} mt={10} pt={8}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 4, md: 8 }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <HStack>
                <Icon as={FiPhone} />
                <Text>400-123-4567</Text>
              </HStack>
              <HStack>
                <Icon as={FiMail} />
                <Text>contact@supplychain.edu</Text>
              </HStack>
              <HStack>
                <Icon as={FiMapPin} />
                <Text>北京市朝阳区科技园区</Text>
              </HStack>
            </Stack>
            <Text fontSize="sm" color="gray.500">
              © 2024 供应链思维学院. All rights reserved.
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
} 