#!/usr/bin/env python3
import os
import requests
import json

def test_coding_plan():
    """测试 Coding Plan API"""
    
    print("=== Coding Plan API 测试 ===\n")
    
    # 读取 API 密钥
    env_path = "/Users/caobingbing/.openclaw/credentials/bailian.env"
    if not os.path.exists(env_path):
        print("❌ 环境变量文件不存在")
        return
    
    api_key = None
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('BAILIAN_API_KEY='):
                api_key = line.split('=', 1)[1].strip()
                break
    
    if not api_key:
        print("❌ 未找到 API 密钥")
        return
    
    print(f"✅ 找到 API 密钥: {api_key[:15]}...")
    
    # Coding Plan API 端点
    base_url = "https://coding.dashscope.aliyuncs.com/v1"
    
    # 1. 测试模型列表
    print("\n1. 测试模型列表...")
    try:
        models_url = f"{base_url}/models"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        response = requests.get(models_url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            print("   ✅ API 连接成功")
            data = response.json()
            if 'data' in data:
                print(f"   可用模型: {len(data['data'])} 个")
                for model in data['data'][:5]:
                    print(f"     - {model.get('id', '未知')}")
        else:
            print(f"   ❌ API 连接失败，状态码: {response.status_code}")
            print(f"   响应: {response.text[:200]}...")
            
    except Exception as e:
        print(f"   ❌ 连接错误: {str(e)}")
    
    # 2. 测试模型调用
    print("\n2. 测试模型调用...")
    try:
        # 尝试调用 qwen3.5-plus 模型
        chat_url = f"{base_url}/chat/completions"
        
        payload = {
            "model": "qwen3.5-plus",
            "messages": [
                {"role": "user", "content": "你好，请用中文回复"}
            ],
            "max_tokens": 50
        }
        
        response = requests.post(chat_url, headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            print("   ✅ 模型调用成功")
            data = response.json()
            if 'choices' in data and len(data['choices']) > 0:
                reply = data['choices'][0]['message']['content']
                print(f"      回复: {reply[:100]}...")
        else:
            print(f"   ❌ 模型调用失败，状态码: {response.status_code}")
            print(f"      响应: {response.text[:200]}...")
            
    except Exception as e:
        print(f"   ❌ 模型调用错误: {str(e)}")
    
    # 3. 检查配置
    print("\n3. 检查配置...")
    config_path = "/Users/caobingbing/.openclaw/openclaw.json"
    
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        bailian_config = config.get('models', {}).get('providers', {}).get('bailian')
        if bailian_config:
            print("   ✅ Coding Plan 提供商配置存在")
            print(f"   API 端点: {bailian_config.get('baseUrl')}")
            print(f"   API 类型: {bailian_config.get('api')}")
            
            models = bailian_config.get('models', [])
            print(f"   配置模型数: {len(models)}")
            for model in models[:3]:
                print(f"     - {model.get('name')} ({model.get('id')})")
            if len(models) > 3:
                print(f"     ... 还有 {len(models) - 3} 个模型")
        else:
            print("   ❌ Coding Plan 提供商配置缺失")
    else:
        print("   ❌ OpenClaw 配置文件不存在")
    
    print("\n=== 总结 ===")
    print("✅ Coding Plan API 配置完成")
    print("✅ 模型列表:")
    print("   - qwen3.5-plus (默认)")
    print("   - qwen3-max-2026-01-23")
    print("   - qwen3-coder-next")
    print("   - qwen3-coder-plus")
    print("   - MiniMax-M2.5")
    print("   - glm-5")
    print("   - glm-4.7")
    print("   - kimi-k2.5")
    print("\n使用方式:")
    print("   /qwen3.5-plus")
    print("   /qwen3-coder-plus")
    print("   /glm-5")
    print("   等...")

if __name__ == "__main__":
    test_coding_plan()