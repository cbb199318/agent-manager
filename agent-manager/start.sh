#!/bin/bash

echo "🚀 Agent 管理系统 - 快速启动脚本"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js"
    echo "请先安装 Node.js: brew install node"
    exit 1
fi

echo "✅ Node.js 版本：$(node -v)"
echo ""

# 安装依赖
echo "📦 安装依赖..."
echo ""

if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    cd backend && npm install && cd ..
fi

echo ""
echo "✅ 依赖安装完成"
echo ""

# 启动服务
echo "🚀 启动开发服务器..."
echo ""
echo "前端：http://localhost:3000"
echo "后端：http://localhost:3001"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

npm run dev