# 供应链思维学院

供应链思维学院是一个在线教育平台，旨在帮助学习者掌握供应链管理的核心理念和实践技能。

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- Chakra UI
- React Router
- React Query
- Axios

### 后端
- Node.js
- Express
- TypeScript
- MongoDB
- JWT
- Zod

## 项目结构

```
supplychain/
├── frontend/          # 前端项目
│   ├── src/
│   │   ├── components/  # 可复用组件
│   │   ├── pages/      # 页面组件
│   │   ├── hooks/      # 自定义 Hooks
│   │   ├── services/   # API 服务
│   │   ├── utils/      # 工具函数
│   │   ├── contexts/   # 上下文
│   │   └── types/      # 类型定义
│   └── ...
├── backend/           # 后端项目
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── models/      # 数据模型
│   │   ├── routes/      # 路由定义
│   │   ├── middleware/  # 中间件
│   │   ├── services/    # 业务服务
│   │   └── utils/       # 工具函数
│   └── ...
└── docs/             # 文档
    ├── API.md         # API 文档
    └── ...
```

## 环境要求

- Node.js >= 16
- MongoDB >= 4.4
- npm >= 7

## 安装和运行

1. 克隆项目：

```bash
git clone <repository-url>
cd supplychain
```

2. 安装依赖：

```bash
# 安装前端依赖
cd frontend && npm install
cd ../backend && npm install
```

3. 配置环境变量：

复制并配置环境变量文件：

```bash
# 前端环境变量
cp frontend/.env.example frontend/.env

# 后端环境变量
cp backend/.env.example backend/.env
```

4. 启动开发服务器：

```bash
# 启动前端服务
cd frontend && npm run dev

# 启动后端服务
cd backend && npm run dev
```

## 功能特性

- 用户认证
  - 注册/登录
  - JWT 令牌管理
  - 权限控制

- 课程管理
  - 课程浏览和搜索
  - 课程详情和大纲
  - 视频播放和进度记录
  - 学习进度追踪

- 互动功能
  - 课程评论
  - 评论回复
  - 点赞功能

- 支付系统
  - 订单管理
  - 多种支付方式
  - 退款处理

- 个人中心
  - 个人信息管理
  - 学习数据统计
  - 订单历史记录

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交改动
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT

## 联系方式

- 项目负责人：[姓名]
- 邮箱：[邮箱地址]

## 更新日志

请参考 `PROJECT_PROGRESS.md` 