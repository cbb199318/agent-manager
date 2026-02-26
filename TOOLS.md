# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## 飞书配置

### 应用凭证

- **App ID**: cli_a90426fa74f85bcc
- **App Secret**: 7ZONUuI6BuK7gxOkjVXsBhIliVzy2DGG
- **应用类型**: 企业自建应用
- **权限状态**: 已配置消息发送和接收权限

### 用户信息

- **飞书用户ID**: ou_e27de85bde4ef3bfbb6e0420d19d48cb
- **配对状态**: ✅ 已完成配对授权
- **配对码**: E8C34TZB

### 消息功能

- **发送消息**: ✅ 已启用 (im:message:send_as_bot)
- **接收消息**: ✅ 已启用 (im:message, im:message.p2p_msg:readonly, im:message.group_at_msg:readonly)
- **资源管理**: ✅ 已启用 (im:resource)
- **联系人读取**: ✅ 已启用 (contact:contact.base:readonly)

### 使用说明

1. **发送消息**: 使用 `message` 工具，设置 `channel=feishu`
2. **接收消息**: 飞书会自动将消息路由到当前会话
3. **消息格式**: 支持文本、图片、文件等富媒体消息
4. **群组消息**: 支持群聊和@消息

### 配置验证

✅ 应用已正确配置
✅ 配对授权已完成
✅ 可以开始使用飞书发送和接收消息
