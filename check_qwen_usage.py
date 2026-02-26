#!/usr/bin/env python3
import os
import requests
import json
from datetime import datetime

def check_qwen_usage():
    """检查 Qwen API 的消耗量和剩余量"""
    
    print("=== Qwen API 使用情况检查 ===\n")
    
    # 读取 API 密钥
    env_path = "/Users/caobingbing/.openclaw/credentials/qwen.env"
    if not os.path.exists(env_path):
        print("❌ 环境变量文件不存在")
        return
    
    api_key = None
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('QWEN_API_KEY='):
                api_key = line.split('=', 1)[1].strip()
                break
    
    if not api_key:
        print("❌ 未找到 API 密钥")
        return
    
    print(f"✅ 找到 API 密钥: {api_key[:10]}...")
    
    # Qwen API 端点
    base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    
    # 1. 检查模型列表（验证 API 连接）
    print("\n1. 检查 API 连接...")
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
                print(f"   可用模型数量: {len(data['data'])}")
        else:
            print(f"   ❌ API 连接失败，状态码: {response.status_code}")
            print(f"   响应: {response.text[:200]}...")
            
    except Exception as e:
        print(f"   ❌ 连接错误: {str(e)}")
    
    # 2. 尝试获取账户信息（如果 API 支持）
    print("\n2. 尝试获取账户信息...")
    try:
        # Qwen 的账户信息端点可能不同，这里尝试几个常见的
        account_endpoints = [
            f"{base_url}/account",
            f"{base_url}/billing",
            f"{base_url}/usage",
            "https://dashscope.aliyuncs.com/api/v1/account"
        ]
        
        for endpoint in account_endpoints:
            try:
                response = requests.get(endpoint, headers=headers, timeout=10)
                if response.status_code == 200:
                    print(f"   ✅ 成功访问: {endpoint}")
                    data = response.json()
                    print(f"   账户信息: {json.dumps(data, indent=2, ensure_ascii=False)}")
                    break
                else:
                    print(f"   ⚠️  端点 {endpoint} 返回状态码: {response.status_code}")
            except Exception as e:
                print(f"   ⚠️  端点 {endpoint} 访问失败: {str(e)}")
                continue
        
    except Exception as e:
        print(f"   ❌ 获取账户信息失败: {str(e)}")
    
    # 3. 检查 API 密钥信息
    print("\n3. API 密钥信息...")
    print(f"   密钥前缀: {api_key[:15]}...")
    print(f"   密钥长度: {len(api_key)} 字符")
    
    # 4. 提供手动检查建议
    print("\n4. 手动检查建议:")
    print("   - 登录阿里云百炼控制台: https://dashscope.aliyuncs.com")
    print("   - 查看账户余额和使用情况")
    print("   - 检查 API 调用记录")
    print("   - 查看配额和限制")
    
    # 5. 模拟使用情况（基于配置的模型）
    print("\n5. 配置的模型信息:")
    models = [
        {"name": "Qwen Max", "id": "qwen-max", "context": "32K", "input": "text,image"},
        {"name": "Qwen Plus", "id": "qwen-plus", "context": "32K", "input": "text,image"},
        {"name": "Qwen Turbo", "id": "qwen-turbo", "context": "8K", "input": "text"}
    ]
    
    for model in models:
        print(f"   - {model['name']} ({model['id']})")
        print(f"     上下文: {model['context']} tokens")
        print(f"     输入: {model['input']}")
    
    print("\n=== 总结 ===")
    print("✅ API 密钥已配置")
    print("✅ API 连接测试完成")
    print("⚠️  账户详细信息需要通过阿里云控制台查看")
    print("\n建议:")
    print("1. 登录阿里云百炼控制台查看详细使用情况")
    print("2. 关注 API 调用频率和配额限制")
    print("3. 设置预算提醒避免超额使用")

if __name__ == "__main__":
    check_qwen_usage()