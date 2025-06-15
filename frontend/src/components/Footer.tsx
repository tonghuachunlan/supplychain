import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.50"
      color="gray.700"
      py={8}
      borderTop="1px"
      borderColor="gray.200"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          justify="space-between"
          align="center"
        >
          <Text>© 2025 供应链思维学院. All rights reserved.</Text>
          <Stack direction="row" spacing={6}>
            <Link href="#" isExternal>
              关于我们
            </Link>
            <Link href="#" isExternal>
              联系我们
            </Link>
            <Link href="#" isExternal>
              使用条款
            </Link>
            <Link href="#" isExternal>
              隐私政策
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 