#!/usr/bin/env python3
import os
import requests
import json

def diagnose_qwen():
    """诊断 Qwen API 配置问题"""
    
    print("=== Qwen API 配置诊断 ===\n")
    
    # 1. 检查环境变量文件
    print("1. 检查环境变量文件...")
    env_path = "/Users/caobingbing/.openclaw/credentials/qwen.env"
    
    if not os.path.exists(env_path):
        print("   ❌ 环境变量文件不存在")
        print(f"   期望路径: {env_path}")
        return
    
    print(f"   ✅ 文件存在: {env_path}")
    
    # 2. 读取配置
    print("\n2. 读取配置...")
    api_key = None
    base_url = None
    
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('QWEN_API_KEY='):
                api_key = line.split('=', 1)[1].strip()
            elif line.startswith('QWEN_BASE_URL='):
                base_url = line.split('=', 1)[1].strip()
    
    if not api_key:
        print("   ❌ 未找到 QWEN_API_KEY")
        return
    
    print(f"   ✅ API 密钥: {api_key[:15]}...")
    print(f"   基础 URL: {base_url or '未配置'}")
    
    # 3. 检查 OpenClaw 配置
    print("\n3. 检查 OpenClaw 配置...")
    config_path = "/Users/caobingbing/.openclaw/openclaw.json"
    
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        qwen_config = config.get('models', {}).get('providers', {}).get('qwen')
        if qwen_config:
            print(f"   ✅ Qwen 提供商配置存在")
            print(f"   API 端点: {qwen_config.get('baseUrl')}")
            print(f"   API 类型: {qwen_config.get('api')}")
            
            models = qwen_config.get('models', [])
            print(f"   配置模型数: {len(models)}")
            for model in models:
                print(f"     - {model.get('name')} ({model.get('id')})")
        else:
            print("   ❌ Qwen 提供商配置缺失")
    else:
        print("   ❌ OpenClaw 配置文件不存在")
    
    # 4. 测试 API 连接
    print("\n4. 测试 API 连接...")
    
    # 尝试不同的 API 端点
    test_endpoints = [
        ("https://dashscope.aliyuncs.com/api/v1/models", "阿里云百炼 v1"),
        ("https://dashscope.aliyuncs.com/compatible-mode/v1/models", "兼容模式 v1"),
        ("https://api.qwen.ai/v1/models", "Qwen 原生 API"),
    ]
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    for endpoint, description in test_endpoints:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            
            if response.status_code == 200:
                print(f"   ✅ {description}: 连接成功")
                data = response.json()
                if 'data' in data:
                    print(f"      可用模型: {len(data['data'])} 个")
                break
            elif response.status_code == 401:
                print(f"   ❌ {description}: API 密钥无效")
            else:
                print(f"   ⚠️  {description}: 状态码 {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ {description}: {str(e)}")
    
    # 5. 提供解决方案
    print("\n5. 解决方案建议:")
    print("   如果 API 密钥无效:")
    print("   1. 登录阿里云百炼控制台: https://dashscope.aliyuncs.com")
    print("   2. 进入 'API 密钥管理'")
    print("   3. 检查密钥状态，必要时重新生成")
    print("   4. 更新环境变量文件")
    print()
    print("   如果账户未开通服务:")
    print("   1. 登录阿里云控制台")
    print("   2. 开通百炼服务")
    print("   3. 充值账户余额")
    print()
    print("   配置文件更新:")
    print("   1. 编辑: /Users/caobingbing/.openclaw/credentials/qwen.env")
    print("   2. 更新 QWEN_API_KEY")
    print("   3. 重启 OpenClaw 服务")
    
    # 6. 当前状态总结
    print("\n=== 当前状态总结 ===")
    if api_key:
        print("✅ API 密钥已配置")
    else:
        print("❌ API 密钥未配置")
    
    if base_url:
        print(f"✅ 基础 URL 已配置: {base_url}")
    else:
        print("⚠️  基础 URL 未配置，使用默认值")
    
    print("\n📋 配置文件位置:")
    print(f"   环境变量: {env_path}")
    print(f"   OpenClaw 配置: {config_path}")
    print(f"   工作目录: /Users/caobingbing/workspace/openclaw")

if __name__ == "__main__":
    diagnose_qwen()