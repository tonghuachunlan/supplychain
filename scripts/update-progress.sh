#!/bin/bash

# 项目进度自动更新脚本
# 用于Git hooks自动更新PROJECT_PROGRESS.md文件

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROGRESS_FILE="$PROJECT_ROOT/PROJECT_PROGRESS.md"

echo -e "${BLUE}🔄 开始更新项目进度文档...${NC}"

# 检查PROJECT_PROGRESS.md文件是否存在
if [ ! -f "$PROGRESS_FILE" ]; then
    echo -e "${RED}❌ PROJECT_PROGRESS.md文件不存在${NC}"
    exit 1
fi

# 获取当前时间
CURRENT_DATE=$(date '+%Y-%m-%d')
CURRENT_TIME=$(date '+%H:%M:%S')

# 获取Git信息
GIT_BRANCH=$(git branch --show-current)
GIT_COMMIT=$(git rev-parse --short HEAD)
GIT_USER=$(git config user.name)
GIT_EMAIL=$(git config user.email)

# 获取变更的文件
CHANGED_FILES=$(git diff --cached --name-only)

# 分析变更类型
FRONTEND_CHANGES=0
BACKEND_CHANGES=0
DOCS_CHANGES=0
CONFIG_CHANGES=0

for file in $CHANGED_FILES; do
    if [[ $file == frontend/* ]]; then
        FRONTEND_CHANGES=$((FRONTEND_CHANGES + 1))
    elif [[ $file == backend/* ]]; then
        BACKEND_CHANGES=$((BACKEND_CHANGES + 1))
    elif [[ $file == docs/* ]] || [[ $file == *.md ]]; then
        DOCS_CHANGES=$((DOCS_CHANGES + 1))
    elif [[ $file == package.json ]] || [[ $file == *.config.* ]] || [[ $file == .env* ]]; then
        CONFIG_CHANGES=$((CONFIG_CHANGES + 1))
    fi
done

# 生成更新摘要
UPDATE_SUMMARY=""
if [ $FRONTEND_CHANGES -gt 0 ]; then
    UPDATE_SUMMARY="$UPDATE_SUMMARY 前端文件($FRONTEND_CHANGES个) "
fi
if [ $BACKEND_CHANGES -gt 0 ]; then
    UPDATE_SUMMARY="$UPDATE_SUMMARY 后端文件($BACKEND_CHANGES个) "
fi
if [ $DOCS_CHANGES -gt 0 ]; then
    UPDATE_SUMMARY="$UPDATE_SUMMARY 文档文件($DOCS_CHANGES个) "
fi
if [ $CONFIG_CHANGES -gt 0 ]; then
    UPDATE_SUMMARY="$UPDATE_SUMMARY 配置文件($CONFIG_CHANGES个) "
fi

# 检查是否有重要变更
IMPORTANT_CHANGES=false
if [[ $CHANGED_FILES == *"App.tsx"* ]] || [[ $CHANGED_FILES == *"index.ts"* ]] || [[ $CHANGED_FILES == *"package.json"* ]]; then
    IMPORTANT_CHANGES=true
fi

# 更新PROJECT_PROGRESS.md文件
if [ "$IMPORTANT_CHANGES" = true ]; then
    echo -e "${YELLOW}📝 检测到重要变更，更新进度文档...${NC}"
    
    # 备份原文件
    cp "$PROGRESS_FILE" "$PROGRESS_FILE.backup"
    
    # 更新最后更新时间
    sed -i.bak "s/最后更新时间：.*/最后更新时间：$CURRENT_DATE $CURRENT_TIME/" "$PROGRESS_FILE"
    
    # 添加新的更新记录（如果文件末尾没有更新记录部分）
    if ! grep -q "## 自动更新记录" "$PROGRESS_FILE"; then
        echo "" >> "$PROGRESS_FILE"
        echo "## 自动更新记录" >> "$PROGRESS_FILE"
        echo "" >> "$PROGRESS_FILE"
    fi
    
    # 添加新的更新条目
    echo "### $CURRENT_DATE $CURRENT_TIME - 自动更新" >> "$PROGRESS_FILE"
    echo "- 分支：$GIT_BRANCH" >> "$PROGRESS_FILE"
    echo "- 提交：$GIT_COMMIT" >> "$PROGRESS_FILE"
    echo "- 开发者：$GIT_USER ($GIT_EMAIL)" >> "$PROGRESS_FILE"
    echo "- 变更：$UPDATE_SUMMARY" >> "$PROGRESS_FILE"
    echo "- 变更文件：$(echo $CHANGED_FILES | tr '\n' ' ')" >> "$PROGRESS_FILE"
    echo "" >> "$PROGRESS_FILE"
    
    # 清理备份文件
    rm -f "$PROGRESS_FILE.backup"
    
    echo -e "${GREEN}✅ 项目进度文档已更新${NC}"
else
    echo -e "${YELLOW}ℹ️  未检测到重要变更，跳过进度文档更新${NC}"
fi

# 显示更新摘要
echo -e "${BLUE}📊 更新摘要：${NC}"
echo -e "  📅 日期：$CURRENT_DATE $CURRENT_TIME"
echo -e "  🌿 分支：$GIT_BRANCH"
echo -e "  🔗 提交：$GIT_COMMIT"
echo -e "  👤 开发者：$GIT_USER"
echo -e "  📁 变更文件：$UPDATE_SUMMARY"

echo -e "${GREEN}🎉 项目进度更新完成！${NC}" 