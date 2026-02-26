#!/usr/bin/env python3
import os
import json

def verify_workspace():
    """验证工作目录配置"""
    
    print("=== 工作目录验证 ===\n")
    
    # 检查新工作目录
    new_workspace = "/Users/caobingbing/workspace/openclaw"
    
    if os.path.exists(new_workspace):
        print(f"✅ 新工作目录存在: {new_workspace}")
        
        # 检查关键文件
        key_files = [
            "AGENTS.md",
            "SOUL.md", 
            "USER.md",
            "MEMORY.md",
            "MODELS.md",
            "QWEN_USAGE.md",
            "TOOLS.md",
            "IDENTITY.md",
            "HEARTBEAT.md"
        ]
        
        missing_files = []
        for file in key_files:
            file_path = os.path.join(new_workspace, file)
            if os.path.exists(file_path):
                print(f"  ✅ {file}")
            else:
                print(f"  ❌ {file}")
                missing_files.append(file)
        
        # 检查 memory 目录
        memory_dir = os.path.join(new_workspace, "memory")
        if os.path.exists(memory_dir):
            print(f"  ✅ memory/ 目录存在")
            memory_files = os.listdir(memory_dir)
            if memory_files:
                print(f"    包含文件: {', '.join(memory_files)}")
        else:
            print(f"  ❌ memory/ 目录不存在")
            missing_files.append("memory/")
        
        # 检查配置文件
        config_path = "/Users/caobingbing/.openclaw/openclaw.json"
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = json.load(f)
            
            workspace_config = config.get('agents', {}).get('defaults', {}).get('workspace')
            if workspace_config == new_workspace:
                print(f"\n✅ 配置文件已更新: {workspace_config}")
            else:
                print(f"\n❌ 配置文件未更新: {workspace_config}")
                missing_files.append("配置文件")
        
        if missing_files:
            print(f"\n❌ 缺失的文件/目录: {', '.join(missing_files)}")
        else:
            print(f"\n🎉 所有文件验证通过！")
            
    else:
        print(f"❌ 新工作目录不存在: {new_workspace}")
    
    print(f"\n=== 总结 ===")
    print(f"旧工作目录: /Users/caobingbing/.openclaw/workspace")
    print(f"新工作目录: {new_workspace}")
    print(f"\n后续所有文件将保存在: {new_workspace}")

if __name__ == "__main__":
    verify_workspace()