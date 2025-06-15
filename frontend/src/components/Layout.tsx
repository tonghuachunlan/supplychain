import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" p={4}>
        <Outlet />
      </Box>
    </Box>
  );
} 