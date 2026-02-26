#!/usr/bin/env python3
import os
import requests
import json

def test_new_api_key():
    """测试新的 Qwen API 密钥"""
    
    print("=== 测试新的 Qwen API 密钥 ===\n")
    
    # 使用新的 API 密钥
    api_key = "sk-sp-f82d4b35755445b38e8e148cd3310b1f"
    
    print(f"✅ 使用新的 API 密钥: {api_key[:15]}...")
    
    # 测试不同的 API 端点
    endpoints = [
        ("https://dashscope.aliyuncs.com/api/v1/models", "阿里云百炼 v1"),
        ("https://dashscope.aliyuncs.com/compatible-mode/v1/models", "兼容模式 v1"),
        ("https://dashscope.aliyuncs.com/api/v1/account/balance", "账户余额"),
    ]
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    print("\n1. 测试 API 连接...")
    
    for endpoint, description in endpoints:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            
            if response.status_code == 200:
                print(f"   ✅ {description}: 连接成功")
                data = response.json()
                
                # 显示关键信息
                if "models" in endpoint:
                    if 'data' in data:
                        print(f"      可用模型: {len(data['data'])} 个")
                        for model in data['data'][:5]:
                            print(f"        - {model.get('id', '未知')}")
                elif "balance" in endpoint:
                    print(f"      余额信息: {json.dumps(data, indent=6, ensure_ascii=False)}")
                    
            elif response.status_code == 401:
                print(f"   ❌ {description}: API 密钥无效")
            elif response.status_code == 404:
                print(f"   ⚠️  {description}: 端点不存在")
            else:
                print(f"   ⚠️  {description}: 状态码 {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ {description}: {str(e)}")
    
    # 2. 测试模型调用
    print("\n2. 测试模型调用...")
    try:
        # 尝试调用 Qwen Plus 模型
        chat_url = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
        
        payload = {
            "model": "qwen-plus",
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
    
    # 3. 更新环境变量文件
    print("\n3. 更新环境变量文件...")
    env_path = "/Users/caobingbing/.openclaw/credentials/qwen.env"
    
    try:
        with open(env_path, 'w') as f:
            f.write("# Qwen API Configuration\n")
            f.write(f"QWEN_API_KEY={api_key}\n")
            f.write("QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1\n")
        
        print(f"   ✅ 环境变量文件已更新: {env_path}")
        
    except Exception as e:
        print(f"   ❌ 更新环境变量文件失败: {str(e)}")
    
    print("\n=== 总结 ===")
    print("✅ 新 API 密钥已配置")
    print("⚠️  需要重启 OpenClaw 服务以使配置生效")
    print("\n建议:")
    print("1. 重启 OpenClaw 服务")
    print("2. 测试模型切换: /Qwen Plus")
    print("3. 验证 API 使用情况")

if __name__ == "__main__":
    test_new_api_key()