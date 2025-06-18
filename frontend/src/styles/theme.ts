import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#165DFF',    // 主色调
      600: '#0045E0',    // Hover 状态
      700: '#0034B3',    // Active 状态
      primary: '#165DFF', // 主色调别名
      gray: '#F0F2F5',      // 科技银灰
      dark: '#1D2129',      // 墨黑
      // 辅助色
      orange: '#FF7D00',    // 智能橙
      green: '#00B42A',     // 科技青
    },
  },
  fonts: {
    heading: '"Inter", "Source Han Sans SC", "思源黑体", -apple-system, sans-serif',
    body: '"Inter", "Source Han Sans SC", "思源黑体", -apple-system, sans-serif',
  },
  fontSizes: {
    body: '16px',
    bodyLarge: '18px',
  },
  lineHeights: {
    body: 1.8,
  },
  components: {
    // 卡片样式
    Card: {
      baseStyle: {
        container: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    // 按钮样式
    Button: {
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            _disabled: {
              bg: 'brand.500',
            },
          },
        },
        secondary: {
          bg: 'brand.orange',
          color: 'white',
          _hover: {
            bg: '#FF9500',
          },
        },
        success: {
          bg: 'brand.green',
          color: 'white',
          _hover: {
            bg: '#00D632',
          },
        },
      },
    },
    // 标题样式
    Heading: {
      baseStyle: {
        fontWeight: 700,
        color: 'brand.dark',
      },
    },
    // 文本样式
    Text: {
      baseStyle: {
        fontSize: 'body',
        lineHeight: 'body',
        color: 'brand.dark',
      },
    },
  },
  // 全局样式
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.dark',
      },
      // 滚动条样式
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '::-webkit-scrollbar-track': {
        bg: 'brand.gray',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'brand.500',
        borderRadius: '3px',
      },
    },
  },
  // 动画配置
  transition: {
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      default: '0.3s',
    },
  },
  // 阴影配置
  shadows: {
    card: '0 8px 32px rgba(0, 0, 0, 0.1)',
    cardHover: '0 12px 40px rgba(0, 0, 0, 0.15)',
    tooltip: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  // 圆角配置
  radii: {
    card: '12px',
    button: '8px',
  },
});

export default theme; 