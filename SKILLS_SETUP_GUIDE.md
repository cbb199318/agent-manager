# Skills 配置指南 - 优先级 1

## 📦 已创建的凭证文件

以下凭证文件已创建在 `/Users/caobingbing/.openclaw/credentials/`：

1. ✅ `openai.env` - OpenAI API 配置
2. ✅ `elevenlabs.env` - ElevenLabs TTS 配置
3. ✅ `notion.env` - Notion API 配置

---

## 🔑 需要获取的 API 密钥

### 1. OpenAI API 密钥（用于 image-gen 和 whisper）

**获取步骤**：
1. 访问：https://platform.openai.com/api-keys
2. 登录/注册 OpenAI 账号
3. 点击 "Create new secret key"
4. 复制 API 密钥（以 `sk-` 开头）
5. 编辑文件：`nano ~/.openclaw/credentials/openai.env`
6. 替换 `你的 OpenAI API 密钥` 为实际密钥

**费用**：
- DALL·E 3 图像生成：约 $0.04/张
- Whisper 语音转文字：约 $0.006/分钟

---

### 2. ElevenLabs API 密钥（用于 sag 语音合成）

**获取步骤**：
1. 访问：https://elevenlabs.io
2. 注册账号（免费套餐：每月 10,000 字符）
3. 进入 Profile → API Keys
4. 生成 API 密钥
5. 编辑文件：`nano ~/.openclaw/credentials/elevenlabs.env`
6. 替换密钥和选择语音 ID

**推荐语音 ID**：
- Rachel（女声，温暖）
- Adam（男声，专业）
- Antoni（男声，清晰）

**费用**：
- 免费套餐：10,000 字符/月
- Starter：$5/月（30,000 字符）

---

### 3. Notion API 密钥（用于笔记管理）

**获取步骤**：
1. 访问：https://www.notion.so/my-integrations
2. 点击 "+ New integration"
3. 填写名称（如 "OpenClaw"）
4. 复制 "Internal Integration Token"
5. 编辑文件：`nano ~/.openclaw/credentials/notion.env`
6. 替换密钥

**连接数据库**：
1. 在 Notion 中创建数据库
2. 点击右上角 "..." → "Connect to"
3. 选择你的 integration
4. 复制数据库 ID 到配置文件

**费用**：完全免费

---

## 🛠️ 其他技能配置

### video-frames（视频帧提取）

**需要安装 ffmpeg**：
```bash
brew install ffmpeg
```

**无需 API 密钥**，本地处理。

---

### openai-whisper（语音转文字）

**使用 OpenAI API**，配置同 openai-image-gen。

**本地版本**（免费但需要安装）：
```bash
brew install whisper
```

---

## ✅ 配置验证

安装 Node.js 并重启网关后，可以测试：

```bash
# 重启网关
openclaw gateway restart

# 测试技能
天气怎么样？
帮我创建一个笔记
生成一张图片
```

---

## 📋 配置清单

- [ ] 安装 Node.js：`brew install node`
- [ ] 获取 OpenAI API 密钥 → 填入 `openai.env`
- [ ] 获取 ElevenLabs API 密钥 → 填入 `elevenlabs.env`
- [ ] 获取 Notion API 密钥 → 填入 `notion.env`
- [ ] 安装 ffmpeg：`brew install ffmpeg`
- [ ] 重启网关：`openclaw gateway restart`
- [ ] 测试各个技能

---

## 🆘 遇到问题？

1. **Node.js 安装失败**：
   - 检查 Homebrew：`brew update`
   - 重新安装：`brew reinstall node`

2. **API 密钥无效**：
   - 检查是否复制完整
   - 确认账户有余额/配额

3. **技能不工作**：
   - 重启网关
   - 检查凭证文件权限：`chmod 600 ~/.openclaw/credentials/*.env`

---

**下一步**：
1. 先安装 Node.js
2. 获取 API 密钥
3. 填写凭证文件
4. 重启网关测试