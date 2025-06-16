import { Box, Heading, Text, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const Interactions = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>我的互动</Heading>
      <Tabs>
        <TabList>
          <Tab>我的评论</Tab>
          <Tab>我的提问</Tab>
          <Tab>收到的回复</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>暂无评论记录</Text>
            </VStack>
          </TabPanel>
          
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>暂无提问记录</Text>
            </VStack>
          </TabPanel>
          
          <TabPanel>
            <VStack align="stretch" spacing={4}>
              <Text>暂无收到的回复</Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Interactions; 