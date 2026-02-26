# 🚀 云端部署指南

## 方案：Vercel（前端）+ Railway（后端）

---

## 📦 准备工作

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 注册账号
- Vercel: https://vercel.com/signup
- Railway: https://railway.app

---

## 🎨 部署前端到 Vercel

### 步骤 1：登录 Vercel
```bash
cd /Users/caobingbing/workspace/openclaw/agent-manager/frontend
vercel login
```

### 步骤 2：部署
```bash
vercel
```

按提示操作：
- Set up and deploy? **Y**
- Which scope? 选择你的账号
- Link to existing project? **N**
- Project name? **agent-manager-frontend**
- Directory? **.** (当前目录)
- Override settings? **N**

### 步骤 3：获取部署 URL
部署完成后会显示：
```
https://agent-manager-frontend-xxx.vercel.app
```

### 步骤 4：配置后端 API 地址
创建 `.env.production` 文件：
```bash
echo "VITE_API_URL=https://your-backend.railway.app/api" > .env.production
```

重新部署：
```bash
vercel --prod
```

---

## ⚙️ 部署后端到 Railway

### 步骤 1：创建 Railway 项目
1. 访问 https://railway.app
2. 点击 "New Project"
3. 选择 "Deploy from GitHub repo"

### 步骤 2：连接 GitHub
1. 授权 Railway 访问 GitHub
2. 选择你的仓库（或创建新仓库）
3. 选择 `backend` 文件夹作为根目录

### 步骤 3：配置环境变量
在 Railway 面板中添加：
```
PORT=3001
NODE_ENV=production
```

### 步骤 4：获取部署 URL
部署完成后会显示：
```
https://your-backend-production.up.railway.app
```

---

## 🔗 连接前后端

### 更新前端配置
编辑 `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-production.up.railway.app/api
```

### 更新 API 服务
编辑 `frontend/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### 重新部署前端
```bash
cd frontend
vercel --prod
```

---

## ✅ 验证部署

### 测试前端
访问 Vercel 提供的 URL，应该能看到界面

### 测试后端 API
```bash
curl https://your-backend-production.up.railway.app/api/health
```

应该返回：
```json
{
  "status": "ok",
  "timestamp": "2026-02-26T...",
  "agents": 5,
  "tasks": 0
}
```

---

## 🔧 故障排除

### 前端无法连接后端
- 检查 `.env.production` 中的 API URL
- 确保后端已部署并运行
- 检查浏览器控制台错误

### 后端启动失败
- 查看 Railway 日志
- 检查环境变量是否配置
- 确保 `package.json` 有正确的 start 脚本

### 跨域问题
后端已配置 CORS，应该没问题。如果还有问题：
```javascript
// backend/server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}))
```

---

## 📊 免费额度

### Vercel
- ✅ 个人免费
- ✅ 无限部署
- ✅ 100GB 带宽/月
- ✅ 自动 HTTPS

### Railway
- ✅ $5 免费额度/月
- ✅ 足够个人项目使用
- ✅ 自动休眠（30 天无访问）

---

## 🎯 下一步

### 自定义域名（可选）
1. 在 Vercel 购买或绑定域名
2. 在 Railway 配置自定义域名
3. 更新前端 API URL

### 数据库持久化（推荐）
当前使用内存存储，重启后数据丢失。建议：
1. Railway 添加 PostgreSQL 插件
2. 修改后端使用数据库
3. 迁移现有数据

### 监控和日志
- Vercel: 自动收集日志
- Railway: 实时日志查看
- 考虑添加 Sentry 错误追踪

---

## 📞 支持

遇到问题？
- Vercel 文档：https://vercel.com/docs
- Railway 文档：https://docs.railway.app
- 项目 Issues: GitHub

---

**最后更新**: 2026-02-26