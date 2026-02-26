#!/usr/bin/env python3
import os
import requests
import json
from datetime import datetime

def check_coding_plan_usage():
    """检查 Coding Plan API 的使用情况"""
    
    print("=== Coding Plan API 使用情况检查 ===\n")
    
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
    
    print(f"✅ API 密钥：{api_key[:15]}...")
    
    # Coding Plan API 端点
    base_url = "https://coding.dashscope.aliyuncs.com/v1"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # 1. 尝试获取账户余额
    print("\n1. 检查账户余额...")
    try:
        balance_endpoints = [
            f"{base_url}/account/balance",
            f"{base_url}/billing/balance",
            "https://dashscope.aliyuncs.com/api/v1/account/balance",
        ]
        
        for endpoint in balance_endpoints:
            try:
                response = requests.get(endpoint, headers=headers, timeout=10)
                if response.status_code == 200:
                    print(f"   ✅ 成功获取余额信息")
                    data = response.json()
                    print(f"   余额: {json.dumps(data, indent=6, ensure_ascii=False)}")
                    break
                else:
                    print(f"   ⚠️  {endpoint.split('/')[-1]}: {response.status_code}")
            except Exception as e:
                continue
        
    except Exception as e:
        print(f"   ❌ 获取余额失败：{str(e)}")
    
    # 2. 尝试获取使用情况
    print("\n2. 检查使用情况...")
    try:
        usage_endpoints = [
            f"{base_url}/usage",
            f"{base_url}/billing/usage",
            f"{base_url}/account/usage",
            "https://dashscope.aliyuncs.com/api/v1/account/usage",
        ]
        
        for endpoint in usage_endpoints:
            try:
                response = requests.get(endpoint, headers=headers, timeout=10)
                if response.status_code == 200:
                    print(f"   ✅ 成功获取使用情况")
                    data = response.json()
                    print(f"   使用情况：{json.dumps(data, indent=6, ensure_ascii=False)[:500]}...")
                    break
                else:
                    print(f"   ⚠️  {endpoint.split('/')[-1]}: {response.status_code}")
            except Exception as e:
                continue
        
    except Exception as e:
        print(f"   ❌ 获取使用情况失败：{str(e)}")
    
    # 3. 尝试获取配额信息
    print("\n3. 检查配额信息...")
    try:
        quota_endpoints = [
            f"{base_url}/quota",
            f"{base_url}/account/quota",
            "https://dashscope.aliyuncs.com/api/v1/account/quota",
        ]
        
        for endpoint in quota_endpoints:
            try:
                response = requests.get(endpoint, headers=headers, timeout=10)
                if response.status_code == 200:
                    print(f"   ✅ 成功获取配额信息")
                    data = response.json()
                    print(f"   配额：{json.dumps(data, indent=6, ensure_ascii=False)[:500]}...")
                    break
                else:
                    print(f"   ⚠️  {endpoint.split('/')[-1]}: {response.status_code}")
            except Exception as e:
                continue
        
    except Exception as e:
        print(f"   ❌ 获取配额失败：{str(e)}")
    
    # 4. 手动检查建议
    print("\n4. 手动检查方法:")
    print("   - 登录阿里云百炼控制台: https://dashscope.aliyuncs.com")
    print("   - 进入 '费用中心' 或 '账户管理'")
    print("   - 查看余额和使用情况")
    print("   - 检查 API 调用配额")
    
    # 5. 当前会话统计
    print("\n5. 当前会话统计:")
    print("   查看会话状态可以使用: /status")
    print("   会显示:")
    print("   - Token 使用量 (输入/输出)")
    print("   - 缓存命中率")
    print("   - 上下文使用情况")
    
    print("\n=== 总结 ===")
    print("✅ API 密钥已配置")
    print("⚠️  详细使用情况需要通过阿里云控制台查看")
    print("\n建议:")
    print("1. 登录阿里云百炼控制台查看详细使用情况")
    print("2. 设置预算提醒")
    print("3. 定期检查 API 调用量")

if __name__ == "__main__":
    check_coding_plan_usage()