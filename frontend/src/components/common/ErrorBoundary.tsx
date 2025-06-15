import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { captureError } from '../../utils/monitoring';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          p={8}
          textAlign="center"
          maxW="container.md"
          mx="auto"
        >
          <Heading mb={4}>出错了</Heading>
          <Text mb={6}>
            抱歉，页面出现了一些问题。我们已经记录了这个错误，并会尽快修复。
          </Text>
          <Button
            colorScheme="blue"
            onClick={this.handleRetry}
          >
            重试
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 