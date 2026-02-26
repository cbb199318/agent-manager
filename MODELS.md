# 可用模型列表

当前配置了 **3 个提供商**，共 **5 个模型**：

## 1. Moonshot (Kimi)

### Kimi K2.5 (`moonshot/kimi-k2.5`)
- **别名**: `Kimi`
- **能力**: 文本 + 图像
- **上下文窗口**: 256,000 tokens
- **最大输出**: 8,192 tokens
- **API 端点**: https://api.moonshot.cn/v1
- **API 类型**: OpenAI Completions
- **费用**: 免费（当前配置）

**使用方式**:
```
/Kimi
/model Kimi
/moonshot/kimi-k2.5
```

## 2. Xiaomi (MiMo)

### Xiaomi MiMo V2 Flash (`xiaomi/mimo-v2-flash`)
- **别名**: `Xiaomi`
- **能力**: 文本
- **上下文窗口**: 262,144 tokens
- **最大输出**: 8,192 tokens
- **API 端点**: https://api.xiaomimimo.com/anthropic
- **API 类型**: Anthropic Messages
- **费用**: 免费（当前配置）

**使用方式**:
```
/Xiaomi
/model Xiaomi
/xiaomi/mimo-v2-flash
```

## 3. Qwen (阿里云通义千问)

### Qwen Max (`qwen/qwen-max`)
- **别名**: `Qwen Max`
- **能力**: 文本 + 图像
- **上下文窗口**: 32,768 tokens
- **最大输出**: 4,096 tokens
- **API 端点**: https://dashscope.aliyuncs.com/compatible-mode/v1
- **API 类型**: OpenAI Completions
- **费用**: 需要 API 密钥

**使用方式**:
```
/Qwen Max
/model Qwen Max
/qwen/qwen-max
```

### Qwen Plus (`qwen/qwen-plus`)
- **别名**: `Qwen Plus`
- **能力**: 文本 + 图像
- **上下文窗口**: 32,768 tokens
- **最大输出**: 4,096 tokens
- **API 端点**: https://dashscope.aliyuncs.com/compatible-mode/v1
- **API 类型**: OpenAI Completions
- **费用**: 需要 API 密钥

**使用方式**:
```
/Qwen Plus
/model Qwen Plus
/qwen/qwen-plus
```

### Qwen Turbo (`qwen/qwen-turbo`)
- **别名**: `Qwen Turbo`
- **能力**: 文本
- **上下文窗口**: 8,192 tokens
- **最大输出**: 2,048 tokens
- **API 端点**: https://dashscope.aliyuncs.com/compatible-mode/v1
- **API 类型**: OpenAI Completions
- **费用**: 需要 API 密钥

**使用方式**:
```
/Qwen Turbo
/model Qwen Turbo
/qwen/qwen-turbo
```

## 模型选择建议

### 根据任务类型选择

1. **复杂任务/高质量输出**: Qwen Max 或 Kimi K2.5
2. **日常使用**: Qwen Plus 或 Xiaomi MiMo V2 Flash
3. **快速响应/简单任务**: Qwen Turbo
4. **需要图像处理**: Qwen Max, Qwen Plus, Kimi K2.5
5. **长文本处理**: Xiaomi MiMo V2 Flash (262K) 或 Kimi K2.5 (256K)

### 根据成本选择

1. **免费**: Kimi K2.5, Xiaomi MiMo V2 Flash
2. **需要 API 密钥**: Qwen 系列

### 当前默认模型
- **主模型**: Xiaomi MiMo V2 Flash (`xiaomi/mimo-v2-flash`)

## 模型切换命令

### 快速切换
```
/Kimi          # 切换到 Kimi K2.5
/Xiaomi        # 切换到 Xiaomi MiMo V2 Flash
/Qwen Max      # 切换到 Qwen Max
/Qwen Plus     # 切换到 Qwen Plus
/Qwen Turbo    # 切换到 Qwen Turbo
```

### 使用 /model 命令
```
/model Kimi
/model Xiaomi
/model Qwen Max
/model Qwen Plus
/model Qwen Turbo
```

### 使用完整模型 ID
```
/moonshot/kimi-k2.5
/xiaomi/mimo-v2-flash
/qwen/qwen-max
/qwen/qwen-plus
/qwen/qwen-turbo
```

## 配置文件位置

- **主配置**: `/Users/caobingbing/.openclaw/openclaw.json`
- **Qwen 凭证**: `/Users/caobingbing/.openclaw/credentials/qwen.env`
- **模型列表**: `/Users/caobingbing/.openclaw/workspace/MODELS.md`

## 注意事项

1. **API 密钥**: Qwen 系列需要有效的 API 密钥才能使用
2. **网络连接**: 确保可以访问相应的 API 端点
3. **速率限制**: 请注意各提供商的速率限制
4. **费用**: Qwen 系列会产生费用，请监控使用量
5. **模型更新**: 模型列表可能会随时间更新，请定期检查

## 验证配置

运行验证脚本检查所有模型配置：
```bash
python3 /Users/caobingbing/.openclaw/validate_qwen_config.py
```