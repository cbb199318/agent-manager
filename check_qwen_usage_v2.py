#!/usr/bin/env python3
import os
import requests
import json

def check_qwen_usage_v2():
    """检查 Qwen API 的消耗量和剩余量 - 使用正确的端点"""
    
    print("=== Qwen API 使用情况检查 (v2) ===\n")
    
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
    
    # 尝试不同的 API 端点
    print("\n1. 尝试不同的 API 端点...")
    
    endpoints_to_try = [
        # 阿里云百炼 API
        ("https://dashscope.aliyuncs.com/api/v1/models", "阿里云百炼模型列表"),
        ("https://dashscope.aliyuncs.com/compatible-mode/v1/models", "兼容模式模型列表"),
        # 账户信息端点
        ("https://dashscope.aliyuncs.com/api/v1/account/balance", "账户余额"),
        ("https://dashscope.aliyuncs.com/api/v1/account/quota", "账户配额"),
        ("https://dashscope.aliyuncs.com/api/v1/account/usage", "使用情况"),
    ]
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    successful_endpoints = []
    
    for endpoint, description in endpoints_to_try:
        try:
            response = requests.get(endpoint, headers=headers, timeout=10)
            
            if response.status_code == 200:
                print(f"   ✅ {description}: 成功")
                data = response.json()
                
                # 保存成功端点的信息
                successful_endpoints.append({
                    "endpoint": endpoint,
                    "description": description,
                    "data": data
                })
                
                # 显示关键信息
                if "balance" in endpoint.lower():
                    print(f"      余额信息: {json.dumps(data, indent=6, ensure_ascii=False)}")
                elif "quota" in endpoint.lower():
                    print(f"      配额信息: {json.dumps(data, indent=6, ensure_ascii=False)}")
                elif "usage" in endpoint.lower():
                    print(f"      使用情况: {json.dumps(data, indent=6, ensure_ascii=False)}")
                elif "models" in endpoint.lower():
                    if 'data' in data:
                        print(f"      可用模型: {len(data['data'])} 个")
                        for model in data['data'][:3]:  # 只显示前3个
                            print(f"        - {model.get('id', '未知')}")
                
            elif response.status_code == 401:
                print(f"   ❌ {description}: API 密钥无效")
            elif response.status_code == 404:
                print(f"   ⚠️  {description}: 端点不存在")
            else:
                print(f"   ⚠️  {description}: 状态码 {response.status_code}")
                
        except requests.exceptions.ConnectionError:
            print(f"   ❌ {description}: 网络连接失败")
        except requests.exceptions.Timeout:
            print(f"   ❌ {description}: 请求超时")
        except Exception as e:
            print(f"   ❌ {description}: {str(e)}")
    
    # 2. 检查 API 密钥格式
    print("\n2. API 密钥分析...")
    print(f"   密钥前缀: {api_key[:15]}...")
    print(f"   密钥长度: {len(api_key)} 字符")
    
    # 检查密钥格式
    if api_key.startswith("sk-"):
        print("   ✅ 密钥格式正确 (sk- 开头)")
    else:
        print("   ⚠️  密钥格式可能不正确")
    
    # 3. 提供手动检查建议
    print("\n3. 手动检查建议:")
    print("   - 登录阿里云百炼控制台: https://dashscope.aliyuncs.com")
    print("   - 进入 'API 密钥管理' 页面")
    print("   - 检查密钥是否有效且未过期")
    print("   - 查看账户余额和使用情况")
    print("   - 检查 API 调用配额")
    
    # 4. 总结
    print("\n=== 总结 ===")
    if successful_endpoints:
        print(f"✅ 成功访问 {len(successful_endpoints)} 个端点")
        for ep in successful_endpoints:
            print(f"   - {ep['description']}")
    else:
        print("❌ 未能访问任何 API 端点")
        print("可能的原因:")
        print("   1. API 密钥无效或已过期")
        print("   2. 账户未开通百炼服务")
        print("   3. 网络连接问题")
        print("   4. API 端点变更")
    
    print("\n4. 下一步操作:")
    print("   1. 登录阿里云控制台验证 API 密钥")
    print("   2. 确保账户已开通百炼服务")
    print("   3. 如有需要，重新生成 API 密钥")
    print("   4. 更新环境变量文件中的 API 密钥")

if __name__ == "__main__":
    check_qwen_usage_v2()