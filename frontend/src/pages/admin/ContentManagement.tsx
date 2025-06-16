import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Text } from '@chakra-ui/react';

const ContentManagement = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>内容管理</Heading>
      <Tabs>
        <TabList>
          <Tab>课程管理</Tab>
          <Tab>文章管理</Tab>
          <Tab>资源管理</Tab>
          <Tab>评论管理</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>课程管理功能开发中...</Text>
            </VStack>
          </TabPanel>
          
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>文章管理功能开发中...</Text>
            </VStack>
          </TabPanel>
          
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>资源管理功能开发中...</Text>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>评论管理功能开发中...</Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ContentManagement; 