import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const UserManagement = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>用户管理</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>用户ID</Th>
              <Th>用户名</Th>
              <Th>邮箱</Th>
              <Th>注册时间</Th>
              <Th>状态</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={6}>
                <Text textAlign="center">暂无用户数据</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UserManagement; 