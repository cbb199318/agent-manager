# Qwen API 使用指南

## 配置完成 ✅

Qwen API 已成功配置，包含以下模型：

### 可用模型

1. **Qwen Max** (`qwen-max`)
   - 最强大的 Qwen 模型
   - 支持文本和图像输入
   - 上下文窗口: 32,768 tokens
   - 最大输出: 4,096 tokens
   - 适合复杂任务和高质量输出

2. **Qwen Plus** (`qwen-plus`)
   - 平衡性能和速度的模型
   - 支持文本和图像输入
   - 上下文窗口: 32,768 tokens
   - 最大输出: 4,096 tokens
   - 适合日常使用和中等复杂度任务

3. **Qwen Turbo** (`qwen-turbo`)
   - 轻量快速的模型
   - 仅支持文本输入
   - 上下文窗口: 8,192 tokens
   - 最大输出: 2,048 tokens
   - 适合简单任务和快速响应

## 使用方式

### 方法 1: 使用模型别名（推荐）
```
/Qwen Max
/Qwen Plus
/Qwen Turbo
```

### 方法 2: 使用完整模型名
```
/qwen/qwen-max
/qwen/qwen-plus
/qwen/qwen-turbo
```

### 方法 3: 使用 /model 命令
```
/model Qwen Max
/model qwen/qwen-plus
/model qwen/qwen-turbo
```

## 模型切换

在对话中可以随时切换模型：

1. **当前会话切换**：使用上述命令直接切换
2. **设置默认模型**：在配置文件中修改 `agents.defaults.models.primary`
3. **临时切换**：使用 `/model` 命令仅影响当前对话

## API 密钥安全

- API 密钥存储在 `/Users/caobingbing/.openclaw/credentials/qwen.env`
- 该文件已设置适当的权限（仅所有者可读）
- 请勿将此文件分享给他人
- 如需更换密钥，直接编辑该文件即可

## 配置验证

运行验证脚本检查配置：
```bash
python3 /Users/caobingbing/.openclaw/validate_qwen_config.py
```

## 注意事项

1. **API 调用限制**：请参考 Qwen 官方文档了解速率限制
2. **费用**：Qwen API 可能会产生费用，请注意使用量
3. **网络连接**：确保可以访问 `api.qwen.ai`
4. **模型可用性**：某些模型可能需要特定的订阅或权限

## 故障排除

如果模型切换不生效：
1. 检查 `openclaw.json` 配置是否正确
2. 确认环境变量文件存在且包含正确的 API 密钥
3. 尝试重启 OpenClaw 服务（如果可用）
4. 检查网络连接是否正常

## 相关文件

- 配置文件: `/Users/caobingbing/.openclaw/openclaw.json`
- 环境变量: `/Users/caobingbing/.openclaw/credentials/qwen.env`
- 验证脚本: `/Users/caobingbing/.openclaw/validate_qwen_config.py`
- 使用指南: `/Users/caobingbing/.openclaw/workspace/QWEN_USAGE.md`