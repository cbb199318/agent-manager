# Coding Plan API 配置完成 ✅

## 配置状态

✅ **Coding Plan API 已成功配置**
- API 端点: `https://coding.dashscope.aliyuncs.com/v1`
- API 密钥: 已配置
- 默认模型: `qwen3.5-plus`
- 模型数量: 8 个

## 可用模型列表

### Qwen 系列
1. **qwen3.5-plus** (`bailian/qwen3.5-plus`)
   - 支持文本 + 图像
   - 上下文窗口: 1,000,000 tokens
   - 最大输出: 65,536 tokens
   - **默认模型**

2. **qwen3-max-2026-01-23** (`bailian/qwen3-max-2026-01-23`)
   - 支持文本
   - 上下文窗口: 262,144 tokens
   - 最大输出: 65,536 tokens

3. **qwen3-coder-next** (`bailian/qwen3-coder-next`)
   - 支持文本
   - 上下文窗口: 262,144 tokens
   - 最大输出: 65,536 tokens

4. **qwen3-coder-plus** (`bailian/qwen3-coder-plus`)
   - 支持文本
   - 上下文窗口: 1,000,000 tokens
   - 最大输出: 65,536 tokens

### 其他模型
5. **MiniMax-M2.5** (`bailian/MiniMax-M2.5`)
   - 支持文本
   - 上下文窗口: 1,000,000 tokens
   - 最大输出: 65,536 tokens

6. **glm-5** (`bailian/glm-5`)
   - 支持文本
   - 上下文窗口: 202,752 tokens
   - 最大输出: 16,384 tokens

7. **glm-4.7** (`bailian/glm-4.7`)
   - 支持文本
   - 上下文窗口: 202,752 tokens
   - 最大输出: 16,384 tokens

8. **kimi-k2.5** (`bailian/kimi-k2.5`)
   - 支持文本 + 图像
   - 上下文窗口: 262,144 tokens
   - 最大输出: 32,768 tokens

## 使用方式

### 快速切换命令
```
/qwen3.5-plus          # 切换到 qwen3.5-plus (默认)
/qwen3-coder-plus      # 切换到 qwen3-coder-plus
/qwen3-coder-next      # 切换到 qwen3-coder-next
/qwen3-max-2026-01-23  # 切换到 qwen3-max-2026-01-23
/MiniMax-M2.5          # 切换到 MiniMax-M2.5
/glm-5                 # 切换到 glm-5
/glm-4.7               # 切换到 glm-4.7
/kimi-k2.5             # 切换到 kimi-k2.5 (Coding Plan 版本)
```

### 使用 /model 命令
```
/model qwen3.5-plus
/model qwen3-coder-plus
/model glm-5
```

### 使用完整模型 ID
```
/bailian/qwen3.5-plus
/bailian/qwen3-coder-plus
/bailian/glm-5
```

## 模型选择建议

### 根据任务类型选择

1. **通用任务**: `qwen3.5-plus` (默认)
   - 支持文本和图像
   - 超大上下文窗口 (1M tokens)
   - 适合大多数场景

2. **代码编程**: `qwen3-coder-plus` 或 `qwen3-coder-next`
   - 专为代码优化
   - 超大上下文窗口
   - 适合编程任务

3. **复杂推理**: `qwen3-max-2026-01-23`
   - 强大推理能力
   - 大上下文窗口
   - 适合复杂任务

4. **中文处理**: `glm-5` 或 `glm-4.7`
   - 优秀的中文理解
   - 适合中文内容处理

5. **多模态任务**: `qwen3.5-plus` 或 `kimi-k2.5`
   - 支持文本和图像
   - 适合需要图像理解的任务

### 根据上下文长度选择

- **超长上下文** (1M+ tokens): `qwen3.5-plus`, `qwen3-coder-plus`, `MiniMax-M2.5`
- **长上下文** (262K tokens): `qwen3-max-2026-01-23`, `qwen3-coder-next`, `kimi-k2.5`
- **中等上下文** (202K tokens): `glm-5`, `glm-4.7`

## 配置文件位置

- **主配置**: `/Users/caobingbing/.openclaw/openclaw.json`
- **环境变量**: `/Users/caobingbing/.openclaw/credentials/bailian.env`
- **测试脚本**: `/Users/caobingbing/workspace/openclaw/test_coding_plan.py`

## 验证配置

运行测试脚本验证配置：
```bash
python3 /Users/caobingbing/workspace/openclaw/test_coding_plan.py
```

## 注意事项

1. **API 密钥**: 使用的是 Qwen Coding Plan Lite 的 API 密钥
2. **服务状态**: 确保 Coding Plan 服务已开通
3. **配额限制**: 注意 API 调用配额和限制
4. **费用**: 根据使用情况可能产生费用

## 当前默认模型

**主模型**: `bailian/qwen3.5-plus`

## 与其他模型对比

### Coding Plan vs 原生 Qwen
- **Coding Plan**: 专为编程优化，支持更多编程相关模型
- **原生 Qwen**: 通用模型，支持文本和图像

### 免费模型备用
如果 Coding Plan API 有问题，可以切换到免费模型：
- `/Kimi` - Kimi K2.5 (Moonshot，免费)
- `/Xiaomi` - Xiaomi MiMo V2 Flash (小米，免费)

## 下一步操作

1. **测试模型**: 尝试使用 `/qwen3.5-plus` 命令
2. **验证功能**: 测试代码生成、文本处理等功能
3. **监控使用**: 关注 API 调用和配额使用情况
4. **优化配置**: 根据使用体验调整默认模型

## 相关文档

- 阿里云百炼文档: https://help.aliyun.com/zh/model-studio
- Coding Plan 文档: https://help.aliyun.com/zh/model-studio/coding-plan
- API 错误代码: https://help.aliyun.com/zh/model-studio/error-code