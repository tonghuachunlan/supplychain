import React from 'react';
import { Box, Heading, Text, Icon, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiTrendingUp, FiActivity } from 'react-icons/fi';

interface DataCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: 'trend' | 'activity';
  isAnimated?: boolean;
}

const pulseKeyframes = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowKeyframes = keyframes`
  0% { box-shadow: 0 0 5px rgba(22, 93, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(22, 93, 255, 0.4); }
  100% { box-shadow: 0 0 5px rgba(22, 93, 255, 0.2); }
`;

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  trend,
  icon = 'trend',
  isAnimated = true,
}) => {
  const pulseAnimation = isAnimated ? `${pulseKeyframes} 2s infinite` : undefined;
  const glowAnimation = isAnimated ? `${glowKeyframes} 3s infinite` : undefined;

  return (
    <Box
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      borderRadius="card"
      p={6}
      position="relative"
      overflow="hidden"
      animation={glowAnimation}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
      }}
    >
      {/* 背景装饰 */}
      <Box
        position="absolute"
        top="-20%"
        right="-20%"
        width="60%"
        height="60%"
        bg="brand.primary"
        opacity={0.1}
        borderRadius="full"
        animation={pulseAnimation}
      />

      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" color="brand.dark">
          {title}
        </Heading>
        <Icon
          as={icon === 'trend' ? FiTrendingUp : FiActivity}
          color="brand.primary"
          w={6}
          h={6}
        />
      </Flex>

      <Text fontSize="3xl" fontWeight="bold" color="brand.primary">
        {value}
      </Text>

      {trend !== undefined && (
        <Flex align="center" mt={2}>
          <Icon
            as={FiTrendingUp}
            color={trend >= 0 ? 'brand.green' : 'red.500'}
            transform={trend >= 0 ? 'rotate(0deg)' : 'rotate(180deg)'}
            mr={1}
          />
          <Text
            color={trend >= 0 ? 'brand.green' : 'red.500'}
            fontSize="sm"
          >
            {Math.abs(trend)}%
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default DataCard; 