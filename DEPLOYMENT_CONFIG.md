# 部署配置指南

## 🌐 Netlify 部署配置

### 构建设置
```toml
# netlify.toml
[build]
  base = "frontend/"
  publish = "frontend/dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 环境变量
- `NODE_ENV=production`
- `VITE_API_URL` (根据实际后端地址配置)

## 🚀 Render 部署配置

### Web Service 设置
```yaml
# render.yaml
services:
  - type: web
    name: supplychain-frontend
    env: node
    buildCommand: cd frontend && npm install && npm run build
    startCommand: cd frontend && npm run preview
    envVars:
      - key: NODE_ENV
        value: production
      - key: NODE_VERSION
        value: "18"
```

### 静态站点部署
- **构建命令**: `cd frontend && npm run build`
- **发布目录**: `frontend/dist`
- **Node版本**: 18.x

## 📋 代码规范要求

### 1. 构建兼容性
```json
// package.json engines 配置
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

### 2. 路径处理
- ✅ 相对路径引用
- ✅ 公共资源放在 `public/` 目录
- ✅ 避免绝对路径依赖

### 3. 环境变量
- ✅ 使用 `VITE_` 前缀的环境变量
- ✅ 提供 `.env.example` 文件
- ✅ 生产环境配置分离

### 4. 依赖管理
- ✅ 锁定依赖版本
- ✅ 只使用 `dependencies`，避免 `devDependencies` 运行时依赖
- ✅ 定期更新安全漏洞包

## 🔧 优化配置

### Vite 生产构建优化
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@chakra-ui/react', 'framer-motion']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
})
```

### 性能优化
- ✅ 代码分割和懒加载
- ✅ 图片压缩和格式优化
- ✅ 静态资源缓存策略
- ✅ Bundle 大小分析

## 🚨 部署检查清单

### 构建前检查
- [ ] 所有依赖安装完成
- [ ] TypeScript 编译无错误
- [ ] ESLint 检查通过
- [ ] 单元测试通过
- [ ] 环境变量配置正确

### 部署后验证
- [ ] 页面正常加载
- [ ] 路由跳转正常
- [ ] API 接口连接正常
- [ ] 响应式布局正常
- [ ] 性能指标达标 