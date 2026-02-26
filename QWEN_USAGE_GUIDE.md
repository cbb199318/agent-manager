# Qwen API 使用情况检查指南

## 当前状态

### 配置状态
- ✅ API 密钥已配置
- ✅ 基础 URL 已配置: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- ✅ 模型已配置: Qwen Max, Qwen Plus, Qwen Turbo
- ❌ API 密钥无效（需要验证）

### 配置文件位置
- **环境变量**: `/Users/caobingbing/.openclaw/credentials/qwen.env`
- **OpenClaw 配置**: `/Users/caobingbing/.openclaw/openclaw.json`
- **诊断脚本**: `/Users/caobingbing/workspace/openclaw/diagnose_qwen.py`

## 检查 Qwen 使用情况的方法

### 方法 1: 通过阿里云百炼控制台（推荐）

1. **登录控制台**
   - 访问: https://dashscope.aliyuncs.com
   - 使用阿里云账号登录

2. **查看账户信息**
   - 进入 **"账户管理"** 或 **"我的账户"**
   - 查看 **余额** 和 **使用情况**
   - 检查 **API 调用记录**

3. **查看配额和限制**
   - 进入 **"配额管理"**
   - 查看各模型的调用配额
   - 检查剩余可用量

### 方法 2: 通过 API 调用（需要有效密钥）

运行诊断脚本检查 API 连接：
```bash
python3 /Users/caobingbing/workspace/openclaw/diagnose_qwen.py
```

### 方法 3: 查看配置文件

检查当前配置：
```bash
# 查看环境变量
cat /Users/caobingbing/.openclaw/credentials/qwen.env

# 查看 OpenClaw 配置
cat /Users/caobingbing/.openclaw/openclaw.json | jq '.models.providers.qwen'
```

## 问题诊断

### API 密钥无效

如果诊断结果显示 API 密钥无效：

1. **验证密钥**
   - 登录阿里云百炼控制台
   - 进入 **"API 密钥管理"**
   - 检查密钥状态是否有效

2. **重新生成密钥**
   - 如果密钥过期或无效，重新生成
   - 复制新的 API 密钥

3. **更新配置**
   ```bash
   # 编辑环境变量文件
   nano /Users/caobingbing/.openclaw/credentials/qwen.env
   
   # 更新 API 密钥
   QWEN_API_KEY=your_new_api_key_here
   ```

### 账户未开通服务

如果提示账户未开通服务：

1. **开通百炼服务**
   - 登录阿里云控制台
   - 搜索 "百炼" 或 "Model Studio"
   - 按照指引开通服务

2. **充值账户**
   - 进入 **"账户充值"**
   - 为账户充值
   - 确保有足够余额

## 当前可用模型

### Qwen 系列
1. **Qwen Max** (`qwen-max`)
   - 最强大模型，支持文本和图像
   - 上下文窗口: 32,768 tokens
   - 最大输出: 4,096 tokens

2. **Qwen Plus** (`qwen-plus`)
   - 平衡型模型，支持文本和图像
   - 上下文窗口: 32,768 tokens
   - 最大输出: 4,096 tokens

3. **Qwen Turbo** (`qwen-turbo`)
   - 轻量快速模型，仅支持文本
   - 上下文窗口: 8,192 tokens
   - 最大输出: 2,048 tokens

### 其他可用模型
- **Kimi K2.5** (`moonshot/kimi-k2.5`) - 免费
- **Xiaomi MiMo V2 Flash** (`xiaomi/mimo-v2-flash`) - 免费

## 模型切换命令

```
/Qwen Max      # 切换到 Qwen Max
/Qwen Plus     # 切换到 Qwen Plus
/Qwen Turbo    # 切换到 Qwen Turbo
```

## 使用建议

### 成本控制
1. **选择合适模型**
   - 简单任务: Qwen Turbo
   - 日常使用: Qwen Plus
   - 复杂任务: Qwen Max

2. **监控使用量**
   - 定期查看阿里云控制台
   - 设置预算提醒
   - 关注 API 调用频率

3. **免费模型备用**
   - Kimi K2.5 和 Xiaomi MiMo V2 Flash 免费
   - 可作为备用选项

### 配置管理
1. **备份配置**
   ```bash
   cp /Users/caobingbing/.openclaw/credentials/qwen.env ~/qwen_backup.env
   ```

2. **定期检查**
   - 每周检查一次 API 使用情况
   - 确保密钥有效
   - 更新配置文件

## 相关脚本

### 诊断脚本
- `/Users/caobingbing/workspace/openclaw/diagnose_qwen.py` - 配置诊断
- `/Users/caobingbing/workspace/openclaw/check_qwen_usage.py` - 使用情况检查
- `/Users/caobingbing/workspace/openclaw/check_qwen_usage_v2.py` - 高级检查

### 验证脚本
- `/Users/caobingbing/workspace/openclaw/validate_qwen_config.py` - 配置验证

## 下一步操作

1. **立即执行**
   - 登录阿里云百炼控制台验证 API 密钥
   - 检查账户余额和使用情况

2. **配置更新**
   - 如密钥无效，重新生成并更新配置
   - 重启 OpenClaw 服务

3. **监控设置**
   - 设置使用提醒
   - 定期检查使用情况

## 联系支持

如有问题：
- 阿里云百炼文档: https://help.aliyun.com/zh/model-studio
- API 错误代码: https://help.aliyun.com/zh/model-studio/error-code
- 技术支持: 通过阿里云控制台提交工单