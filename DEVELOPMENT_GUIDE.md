# 开发指南

## 🚀 快速开始

### 当前开发环境
- **当前分支**: `develop-v1.1`
- **基于版本**: v1.0.0-stable
- **开发服务器**: http://localhost:5173

### 启动开发服务器
```bash
cd frontend
npm run dev
```

## 🌳 分支管理

### 主要分支
| 分支名 | 用途 | 状态 |
|--------|------|------|
| `main` | 生产主分支 | 稳定 |
| `stable-v1.0-20250619` | 当前稳定版本 | 锁定 |
| `develop-v1.1` | **当前开发分支** | 活跃 ⭐ |

### 创建新功能分支
```bash
# 从当前develop分支创建功能分支
git checkout -b feature/新功能名称

# 开发完成后
git checkout develop-v1.1
git merge feature/新功能名称
git branch -d feature/新功能名称
```

## 📋 开发规范

### 提交信息格式
```
type(scope): description

feat: 新功能
fix: 修复bug  
docs: 文档更新
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具配置
```

### 代码质量
- ✅ TypeScript 严格模式
- ✅ ESLint 代码检查
- ✅ Prettier 代码格式化
- ✅ Vitest 单元测试

## 🛠️ 常用命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 代码检查
npm run lint

# 格式化代码
npm run format
```

## 📦 技术栈

### 前端核心
- **框架**: React 18 + TypeScript
- **构建**: Vite
- **UI**: Chakra UI + Framer Motion
- **路由**: React Router v6
- **状态**: React Query + Context API

### 开发工具
- **包管理**: npm
- **代码检查**: ESLint + Prettier
- **测试**: Vitest + Testing Library
- **Git Hooks**: Husky + lint-staged

## 🎯 下一步开发建议

### 优先级功能
1. **内容管理系统** - 动态内容编辑
2. **用户中心完善** - 个人资料、学习记录
3. **课程系统增强** - 视频播放、进度同步
4. **搜索功能** - 全站内容搜索
5. **数据分析** - 用户行为追踪

### 技术优化
- 性能优化和懒加载
- 单元测试覆盖率提升
- 无障碍访问优化
- PWA功能支持 