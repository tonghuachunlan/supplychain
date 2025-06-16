import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface GlassCardProps extends BoxProps {
  blur?: string;
  opacity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  blur = '10px',
  opacity = 0.8,
  ...props
}) => {
  return (
    <Box
      position="relative"
      borderRadius="card"
      overflow="hidden"
      {...props}
    >
      {/* 背景模糊层 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="white"
        opacity={opacity}
        backdropFilter={`blur(${blur})`}
        borderRadius="inherit"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.2)"
      />
      
      {/* 内容层 */}
      <Box
        position="relative"
        zIndex={1}
        p={6}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GlassCard; 