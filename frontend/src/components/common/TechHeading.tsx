import React from 'react';
import { Box, Heading, HeadingProps } from '@chakra-ui/react';

interface TechHeadingProps extends HeadingProps {
  withAccent?: boolean;
  accentColor?: string;
}

const TechHeading: React.FC<TechHeadingProps> = ({
  children,
  withAccent = true,
  accentColor = 'brand.primary',
  ...props
}) => {
  return (
    <Box position="relative">
      <Heading
        position="relative"
        zIndex={1}
        {...props}
      >
        {children}
      </Heading>
      
      {withAccent && (
        <>
          {/* 装饰线 */}
          <Box
            position="absolute"
            left={0}
            bottom="-4px"
            width="40px"
            height="4px"
            bg={accentColor}
            borderRadius="full"
          />
          
          {/* 背景装饰 */}
          <Box
            position="absolute"
            left="-10px"
            top="-10px"
            width="30px"
            height="30px"
            bg={accentColor}
            opacity={0.1}
            borderRadius="lg"
            transform="rotate(45deg)"
          />
        </>
      )}
    </Box>
  );
};

export default TechHeading; 