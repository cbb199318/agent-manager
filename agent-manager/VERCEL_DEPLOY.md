# 🚀 Vercel 全栈部署指南

## ✅ 项目已配置完成

项目已改造为 Vercel 全栈架构：
- ✅ 前端：React + Vite
- ✅ 后端：Vercel Serverless Functions
- ✅ 配置：vercel.json 已配置
- ✅ API 路由：/api/* 自动映射

---

## 🎯 一键部署（3 步）

### 第 1 步：访问 Vercel
打开：https://vercel.com/new

### 第 2 步：导入 GitHub 仓库
1. 点击 **"Import Git Repository"**
2. 选择你的 GitHub 账号
3. 找到 `agent-manager` 仓库
4. 点击 **"Import"**

### 第 3 步：部署
1. **Project Name**: `agent-manager`
2. **Framework Preset**: `Vite`
3. **Root Directory**: 保持默认（`.`）
4. **Build Command**: `cd frontend && npm run build`
5. **Output Directory**: `frontend/dist`
6. 点击 **"Deploy"**

---

## ⏱️ 等待部署完成（约 2-3 分钟）

Vercel 会：
1. 安装依赖
2. 构建前端
3. 部署 Serverless Functions
4. 分配域名

---

## 🎉 部署成功！

完成后你会看到：
- ✅ **Visit** 按钮（访问你的网站）
- ✅ 域名：`https://agent-manager-xxx.vercel.app`
- ✅ 构建日志

**点击 Visit 访问你的网站！**

---

## 📊 免费额度

### Vercel Hobby（免费）
- ✅ 无限部署
- ✅ 100GB 带宽/月
- ✅ 自动 HTTPS
- ✅ 自动域名
- ✅ Serverless Functions
- ✅ 足够个人项目使用

---

## 🔧 自定义域名（可选）

1. 在 Vercel 项目页面
2. 点击 **"Domains"**
3. 添加你的域名
4. 按提示配置 DNS

---

## 📝 项目结构

```
agent-manager/
├── api/              # Vercel Serverless Functions（后端）
│   ├── agents.js     # Agent API
│   ├── tasks.js      # Tasks API
│   ├── stats.js      # Stats API
│   └── health.js     # Health Check
├── frontend/         # React 前端
│   ├── src/
│   ├── public/
│   └── package.json
├── vercel.json       # Vercel 配置
└── package.json      # 项目配置
```

---

## 🔄 自动部署

配置完成后：
- 每次 `git push` 都会自动部署
- 无需手动操作
- Vercel 会自动构建和发布

---

## 🐛 故障排除

### 构建失败
检查 Vercel 部署日志，常见问题：
- Node.js 版本不匹配 → 检查 `engines.node`
- 依赖安装失败 → 检查 `package.json`
- 构建命令错误 → 检查 `vercel.json`

### API 无法访问
- 检查路由：`/api/xxx`
- 检查 CORS 配置
- 查看函数日志

---

## 📞 支持

- Vercel 文档：https://vercel.com/docs
- 项目 Issues: GitHub

---

**现在去 Vercel 部署吧！** 🚀