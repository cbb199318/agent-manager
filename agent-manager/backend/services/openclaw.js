const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)
const fs = require('fs')
const path = require('path')

class OpenClawService {
  constructor() {
    this.agents = new Map()
    this.tasks = new Map()
    this.configPath = path.join(__dirname, '../data/agents.json')
    
    // 加载已保存的 Agent
    this.loadAgents()
  }

  /**
   * 加载已保存的 Agent
   */
  loadAgents() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8')
        const agents = JSON.parse(data)
        agents.forEach(agent => {
          this.agents.set(agent.id, agent)
        })
        console.log(`📂 Loaded ${agents.length} agents from disk`)
      }
    } catch (error) {
      console.error('Failed to load agents:', error)
    }
  }

  /**
   * 保存 Agent 到磁盘（异步，避免阻塞）
   */
  saveAgents() {
    // 使用防抖，避免频繁保存
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
    }
    
    this.saveTimeout = setTimeout(() => {
      try {
        const dataDir = path.dirname(this.configPath)
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        const agents = Array.from(this.agents.values())
        fs.writeFileSync(this.configPath, JSON.stringify(agents, null, 2))
        console.log(`💾 Saved ${agents.length} agents to disk`)
      } catch (error) {
        console.error('Failed to save agents:', error)
      }
    }, 500) // 500ms 防抖
  }

  /**
   * 创建子 Agent
   */
  async createAgent(name, description, model = 'bailian/qwen3.5-plus') {
    try {
      // 创建 Agent 对象
      const agent = {
        id: `agent_${Date.now()}`,
        name,
        description,
        model,
        status: 'idle',
        tasksCompleted: 0,
        tasksRunning: 0,
        sessionKey: null,
        createdAt: new Date().toISOString()
      }

      // 保存到内存
      this.agents.set(agent.id, agent)
      
      // 保存到磁盘
      this.saveAgents()

      console.log(`✅ Agent created: ${name} (${agent.id})`)
      
      // 异步尝试创建真实的 OpenClaw 子 Agent（可选）
      this.createOpenClawSubAgent(agent).catch(err => {
        console.error('Failed to create OpenClaw subagent:', err)
      })
      
      return agent
    } catch (error) {
      console.error('❌ Error creating agent:', error)
      throw error
    }
  }

  /**
   * 创建真实的 OpenClaw 子 Agent（异步）
   */
  async createOpenClawSubAgent(agent) {
    const task = `你是${agent.name}。

## 职责
${agent.description}

## 工作方式
- 接收主 Agent 分配的任务
- 专业、高效地完成工作
- 输出结构化结果

准备好后，请回复"${agent.name}已就绪，等待任务分配"
`

    // 将任务写入临时文件
    const taskFile = path.join(__dirname, `../data/task_${agent.id}.json`)
    const taskData = {
      label: agent.name,
      mode: 'run',
      task: task,
      cleanup: 'keep'
    }
    
    fs.writeFileSync(taskFile, JSON.stringify(taskData, null, 2))
    
    // 调用 openclaw sessions_spawn 命令（需要 Node.js 环境）
    // 注意：这个命令需要在正确的环境中执行
    console.log(`📝 Task file created: ${taskFile}`)
    console.log(`🤖 To create real subagent, run:`)
    console.log(`   cd /Users/caobingbing/workspace/openclaw/agent-manager`)
    console.log(`   # Manual creation via OpenClaw interface`)
  }

  /**
   * 获取所有 Agent
   */
  getAgents() {
    return Array.from(this.agents.values())
  }

  /**
   * 获取单个 Agent
   */
  getAgent(id) {
    return this.agents.get(id)
  }

  /**
   * 更新 Agent 状态
   */
  updateAgentStatus(id, status) {
    const agent = this.agents.get(id)
    if (agent) {
      agent.status = status
      this.agents.set(id, agent)
      this.saveAgents()
    }
    return agent
  }

  /**
   * 删除 Agent
   */
  deleteAgent(id) {
    const success = this.agents.delete(id)
    if (success) {
      this.saveAgents()
    }
    return success
  }

  /**
   * 分配任务给 Agent
   */
  async assignTask(agentId, instruction) {
    const agent = this.agents.get(agentId)
    if (!agent) {
      throw new Error('Agent not found')
    }

    const task = {
      id: `task_${Date.now()}`,
      agentId,
      instruction,
      status: 'pending',
      progress: 0,
      result: null,
      createdAt: new Date().toISOString()
    }

    this.tasks.set(task.id, task)
    
    // 更新 Agent 状态
    agent.status = 'busy'
    agent.tasksRunning += 1

    console.log(`📋 Task assigned to ${agent.name}: ${instruction}`)
    
    return task
  }

  /**
   * 获取任务列表
   */
  getTasks() {
    return Array.from(this.tasks.values())
  }

  /**
   * 更新任务状态
   */
  updateTaskStatus(taskId, status, progress = 0, result = null) {
    const task = this.tasks.get(taskId)
    if (task) {
      task.status = status
      task.progress = progress
      task.result = result
      
      if (status === 'completed' || status === 'failed') {
        const agent = this.agents.get(task.agentId)
        if (agent) {
          agent.status = 'idle'
          agent.tasksRunning -= 1
          agent.tasksCompleted += 1
        }
      }
      
      this.tasks.set(taskId, task)
    }
    return task
  }

  /**
   * 获取统计数据
   */
  getStats() {
    const agents = this.getAgents()
    const tasks = this.getTasks()
    
    return {
      totalAgents: agents.length,
      activeAgents: agents.filter(a => a.status === 'busy').length,
      idleAgents: agents.filter(a => a.status === 'idle').length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      runningTasks: tasks.filter(t => t.status === 'running' || t.status === 'pending').length
    }
  }

  /**
   * 模拟 Agent 响应（用于测试）
   */
  simulateAgentResponse(taskId) {
    setTimeout(() => {
      this.updateTaskStatus(taskId, 'running', 50)
      
      setTimeout(() => {
        this.updateTaskStatus(taskId, 'completed', 100, '任务已完成')
        console.log(`✅ Task ${taskId} completed`)
      }, 2000)
    }, 1000)
  }
}

module.exports = new OpenClawService()