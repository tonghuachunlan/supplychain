# 项目进度追踪系统

## 概述

本项目包含一个自动化的项目进度追踪系统，用于实时更新和维护 `PROJECT_PROGRESS.md` 文件。

## 文件结构

```
scripts/
├── update-progress.sh    # 自动更新项目进度的主脚本
└── README.md            # 本说明文档

.git/hooks/
└── pre-commit          # Git pre-commit hook，自动触发进度更新
```

## 功能特性

### 1. 自动更新机制
- **Git Hooks**: 每次提交前自动更新项目进度
- **手动更新**: 支持手动运行更新脚本
- **智能分析**: 自动分析代码变更类型和影响范围

### 2. 进度追踪内容
- 项目概述和技术栈更新
- 功能实现进度和完成状态
- 文件结构变化记录
- 待实现功能清单
- 重大更新记录
- 已知问题和解决方案
- 下一步开发计划
- 项目依赖版本信息
- 开发环境配置

### 3. 变更分析
- 前端代码变更检测
- 后端代码变更检测
- 配置文件变更检测
- 文档更新检测
- 依赖包变更检测

## 使用方法

### 自动更新（推荐）
系统已配置Git hooks，每次提交代码时会自动更新项目进度：

```bash
git add .
git commit -m "你的提交信息"
# 系统会自动运行更新脚本并更新 PROJECT_PROGRESS.md
```

### 手动更新
如果需要手动更新项目进度：

```bash
# 方法1：使用npm脚本
npm run update-progress
# 或
npm run progress

# 方法2：直接运行脚本
./scripts/update-progress.sh
```

### 查看当前进度
```bash
# 查看项目进度文档
cat PROJECT_PROGRESS.md

# 或者在编辑器中打开
code PROJECT_PROGRESS.md
```

## 脚本配置

### 环境变量
脚本支持以下环境变量：

- `PROJECT_ROOT`: 项目根目录路径（自动检测）
- `PROGRESS_FILE`: 进度文档文件路径（默认：PROJECT_PROGRESS.md）

### 自定义配置
可以在 `update-progress.sh` 脚本中修改：

- 变更类型权重
- 更新频率控制
- 输出格式定制
- 错误处理策略

## 故障排除

### 常见问题

1. **权限错误**
   ```bash
   chmod +x scripts/update-progress.sh
   chmod +x .git/hooks/pre-commit
   ```

2. **脚本未找到**
   - 确保脚本文件存在于正确位置
   - 检查文件路径是否正确

3. **Git hooks不工作**
   ```bash
   # 重新安装hooks
   cp .git/hooks/pre-commit .git/hooks/pre-commit.backup
   chmod +x .git/hooks/pre-commit
   ```

4. **更新失败**
   - 检查PROJECT_PROGRESS.md文件是否存在
   - 确保有写入权限
   - 查看错误日志

### 调试模式
启用调试模式查看详细信息：

```bash
# 设置调试环境变量
export DEBUG_PROGRESS=1
./scripts/update-progress.sh
```

## 最佳实践

1. **定期检查**: 每周检查一次项目进度文档的准确性
2. **及时更新**: 重要功能完成后及时提交，触发自动更新
3. **版本控制**: 将进度文档纳入版本控制，跟踪历史变化
4. **团队协作**: 团队成员都应该了解和使用这个系统
5. **备份策略**: 定期备份进度文档

## 扩展功能

### 添加新的追踪项
在 `update-progress.sh` 脚本中添加新的分析逻辑：

```bash
# 示例：添加新的变更类型检测
if [[ "$file" == *.test.* ]]; then
    TEST_CHANGES=$((TEST_CHANGES + 1))
fi
```

### 自定义输出格式
修改脚本中的输出模板和格式：

```bash
# 示例：添加新的进度统计
echo "## 测试覆盖率: $TEST_COVERAGE%" >> "$PROGRESS_FILE"
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。 