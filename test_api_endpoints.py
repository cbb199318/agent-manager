#!/usr/bin/env python3
import requests

def test_api_endpoints():
    """测试不同的 API 端点"""
    
    api_key = "sk-sp-f82d4b35755445b38e8e148cd3310b1f"
    
    # 不同的 API 端点
    endpoints = [
        # 阿里云百炼
        "https://dashscope.aliyuncs.com/api/v1/models",
        "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
        "https://dashscope.aliyuncs.com/api/v1/chat/completions",
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        
        # Qwen 原生 API
        "https://api.qwen.ai/v1/models",
        "https://api.qwen.ai/v1/chat/completions",
        
        # 其他可能的端点
        "https://dashscope.aliyuncs.com/api/v1/account",
        "https://dashscope.aliyuncs.com/api/v1/billing",
    ]
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    print("=== 测试不同 API 端点 ===\n")
    
    for endpoint in endpoints:
        try:
            # 对于聊天端点，发送一个简单的请求
            if "chat/completions" in endpoint:
                payload = {
                    "model": "qwen-plus",
                    "messages": [{"role": "user", "content": "test"}],
                    "max_tokens": 10
                }
                response = requests.post(endpoint, headers=headers, json=payload, timeout=10)
            else:
                response = requests.get(endpoint, headers=headers, timeout=10)
            
            status = response.status_code
            if status == 200:
                print(f"✅ {endpoint}")
                print(f"   状态: {status}")
                try:
                    data = response.json()
                    if 'data' in data:
                        print(f"   模型数: {len(data['data'])}")
                    elif 'choices' in data:
                        print(f"   回复: {data['choices'][0]['message']['content'][:50]}...")
                    else:
                        print(f"   数据: {json.dumps(data, indent=2, ensure_ascii=False)[:200]}...")
                except:
                    print(f"   响应: {response.text[:100]}...")
            elif status == 401:
                print(f"❌ {endpoint}")
                print(f"   状态: {status} - API 密钥无效")
            elif status == 404:
                print(f"⚠️  {endpoint}")
                print(f"   状态: {status} - 端点不存在")
            else:
                print(f"⚠️  {endpoint}")
                print(f"   状态: {status}")
                
        except Exception as e:
            print(f"❌ {endpoint}")
            print(f"   错误: {str(e)}")
        
        print()

if __name__ == "__main__":
    test_api_endpoints()