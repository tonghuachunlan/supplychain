// 图片占位符常量
export const PLACEHOLDER_IMAGES = {
  // 课程封面 - 16:9 比例
  course: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjdGQUZDIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSIzMCIgZmlsbD0iIzQ4QkI3OCIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2Zz4=',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgdmlld0JveD0iMCAwIDQ4MCAyNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0ODAiIGhlaWdodD0iMjcwIiBmaWxsPSIjRjdGQUZDIi8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjEzNSIgcj0iNDAiIGZpbGw9IiM0OEJCNzgiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRjdGQUZDIi8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNTAiIGZpbGw9IiM0OEJCNzgiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg=='
  },
  
  // 专家头像 - 1:1 比例
  avatar: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRUREOEYzIiByeD0iNTAiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMTUiIGZpbGw9IiM5RDZGRjMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGQ9Ik0zMCA3NUMzMCA2OC4zNzI2IDM1LjM3MjYgNjMgNDIgNjNINThDNjQuNjI3NCA2MyA3MCA2OC4zNzI2IDcwIDc1VjgwSDMwVjc1WiIgZmlsbD0iIzlENkZGMyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPC9zdmc+',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRUREOEYzIiByeD0iNzUiLz4KPGNpcmNsZSBjeD0iNzUiIGN5PSI2MCIgcj0iMjAiIGZpbGw9IiM5RDZGRjMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGQ9Ik00NSAxMTBDNDUgMTAwLjU1OSA1Mi41NTkgOTMgNjIgOTNIODhDOTcuNDQxIDkzIDEwNSAxMDAuNTU5IDEwNSAxMTBWMTIwSDQ1VjExMFoiIGZpbGw9IiM5RDZGRjMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+Cjwvc3ZnPg==',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUREOEYzIiByeD0iMTAwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzlENkZGMyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZD0iTTYwIDE1MEM2MCAxMzYuNzQ1IDcwLjc0NSAxMjYgODQgMTI2SDExNkMxMjkuMjU1IDEyNiAxNDAgMTM2Ljc0NSAxNDAgMTUwVjE2MEg2MFYxNTBaIiBmaWxsPSIjOUQ2RkYzIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4='
  },
  
  // 新闻图片 - 4:3 比例
  news: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRkVGN0VEIi8+CjxyZWN0IHg9IjEzMCIgeT0iMTAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGNTk3MzEiIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDQ4MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0ODAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRkVGN0VEIi8+CjxyZWN0IHg9IjE5MCIgeT0iMTQwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjU5NzMxIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4=',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDY0MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNDgwIiBmaWxsPSIjRkVGN0VEIi8+CjxyZWN0IHg9IjI2MCIgeT0iMjAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjU5NzMxIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4='
  },
  
  // 书籍封面 - 3:4 比例
  book: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDE1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRUREOEYzIiByeD0iOCIvPgo8cmVjdCB4PSI2MCIgeT0iODAiIHdpZHRoPSIzMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzlENkZGMyIgZmlsbC1vcGFjaXR5PSIwLjUiIHJ4PSI0Ii8+Cjwvc3ZnPg==',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI1IiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIyNSAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjUiIGhlaWdodD0iMzAwIiBmaWxsPSIjRUREOEYzIiByeD0iMTIiLz4KPHJlY3QgeD0iOTAiIHk9IjEyMCIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjYwIiBmaWxsPSIjOUQ2RkYzIiBmaWxsLW9wYWNpdHk9IjAuNSIgcng9IjYiLz4KPC9zdmc+',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRUREOEYzIiByeD0iMTYiLz4KPHJlY3QgeD0iMTIwIiB5PSIxNjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzlENkZGMyIgZmlsbC1vcGFjaXR5PSIwLjUiIHJ4PSI4Ii8+Cjwvc3ZnPg=='
  },
  
  // 产品/工具图片 - 1:1 比例
  product: {
    small: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGREZBIiByeD0iMTAiLz4KPHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwRkI2QTIiIGZpbGwtb3BhY2l0eT0iMC4zIiByeD0iMTAiLz4KPC9zdmc+',
    medium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGREZBIiByeD0iMTUiLz4KPHJlY3QgeD0iMTAwIiB5PSIxMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMEZCNkEyIiBmaWxsLW9wYWNpdHk9IjAuMyIgcng9IjE1Ii8+Cjwvc3ZnPg==',
    large: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGREZBIiByeD0iMjAiLz4KPHJlY3QgeD0iMTUwIiB5PSIxNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMEZCNkEyIiBmaWxsLW9wYWNpdHk9IjAuMyIgcng9IjIwIi8+Cjwvc3ZnPg=='
  }
};

// 根据用途获取合适的占位符
export function getPlaceholderImage(type: 'course' | 'avatar' | 'news' | 'book' | 'product', size: 'small' | 'medium' | 'large' = 'medium') {
  return PLACEHOLDER_IMAGES[type][size];
}

// 默认占位符
export const DEFAULT_PLACEHOLDER = PLACEHOLDER_IMAGES.course.medium;

// 动态生成带标题的SVG占位图
export function getDynamicPlaceholderImage(title: string, type: 'course' | 'avatar' | 'news' | 'book' | 'product' = 'course', size: 'small' | 'medium' | 'large' = 'medium') {
  // 尺寸
  const sizeMap = {
    course: { small: [320, 180], medium: [480, 270], large: [640, 360] },
    avatar: { small: [100, 100], medium: [150, 150], large: [200, 200] },
    news: { small: [320, 240], medium: [480, 360], large: [640, 480] },
    book: { small: [150, 200], medium: [225, 300], large: [300, 400] },
    product: { small: [200, 200], medium: [300, 300], large: [400, 400] },
  };
  const [w, h] = sizeMap[type][size];
  const bgColor = type === 'course' ? '#F7FAFC' : type === 'news' ? '#FEF7ED' : '#EDE8F3';

  // 估算最大可用宽度（左右各留10%边距）
  const maxTextWidth = w * 0.8;
  // 估算每个字符大致宽度（中文英文都兼容，1em约等于fontSize px）
  const titleLen = title.length;
  // 先假设最大字号
  let fontSize = Math.max(14, Math.floor(h / 8));
  // 估算一行最大能放下多少字
  const maxChars = Math.floor(maxTextWidth / fontSize);
  if (titleLen > maxChars) {
    fontSize = Math.floor(maxTextWidth / titleLen);
    if (fontSize < 12) fontSize = 12; // 最小12px
  }
  // 副标题字号
  let subFontSize = Math.max(12, Math.floor(h / 12));
  if (subFontSize > fontSize * 0.9) subFontSize = Math.floor(fontSize * 0.9);

  // SVG字符串，两行文本居中
  const svg = `<svg width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='${w}' height='${h}' fill='${bgColor}'/>
    <text x='50%' y='45%' text-anchor='middle' font-size='${fontSize}' fill='#888' font-family='Arial, sans-serif' dominant-baseline='middle'>${title}</text>
    <text x='50%' y='60%' text-anchor='middle' font-size='${subFontSize}' fill='#aaa' font-family='Arial, sans-serif' dominant-baseline='middle'>（图片示例）</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
} 