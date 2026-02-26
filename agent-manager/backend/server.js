const express = require('express')
const cors = require('cors')
const openclawService = require('./services/openclaw')

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 初始化一些测试 Agent（仅当首次启动时）
const initialAgents = [
  {
    id: 'agent_1',
    name: '内容策划 Agent',
    description: '负责视频内容策划和选题分析',
    model: 'qwen3.5-plus',
    status: 'idle',
    tasksCompleted: 15,
    tasksRunning: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'agent_2',
    name: '脚本写作 Agent',
    description: '负责撰写视频脚本和台词',
    model: 'qwen3.5-plus',
    status: 'busy',
    tasksCompleted: 12,
    tasksRunning: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'agent_3',
    name: '运营推广 Agent',
    description: '负责发布策略和数据分析',
    model: 'qwen3.5-plus',
    status: 'idle',
    tasksCompleted: 10,
    tasksRunning: 0,
    createdAt: new Date().toISOString()
  }
]

// 只在首次启动时添加初始 Agent
if (openclawService.getAgents().length === 0) {
  initialAgents.forEach(agent => {
    openclawService.agents.set(agent.id, agent)
  })
  console.log(`🌱 Initialized ${initialAgents.length} default agents`)
}

// 添加请求日志中间件（用于调试）
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`⏱️  ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`)
  })
  next()
})

// API 路由

// 获取所有 Agent
app.get('/api/agents', (req, res) => {
  const agents = openclawService.getAgents()
  res.json(agents)
})

// 创建新 Agent
app.post('/api/agents', async (req, res) => {
  try {
    const { name, description, model } = req.body
    const agent = await openclawService.createAgent(name, description, model)
    res.status(201).json(agent)
  } catch (error) {
    console.error('Error creating agent:', error)
    res.status(500).json({ error: error.message })
  }
})

// 获取单个 Agent
app.get('/api/agents/:id', (req, res) => {
  const agent = openclawService.getAgent(req.params.id)
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' })
  }
  res.json(agent)
})

// 更新 Agent
app.put('/api/agents/:id', (req, res) => {
  const agent = openclawService.getAgent(req.params.id)
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' })
  }
  
  const { name, description, model, status } = req.body
  if (name) agent.name = name
  if (description) agent.description = description
  if (model) agent.model = model
  if (status) agent.status = status
  
  openclawService.agents.set(req.params.id, agent)
  res.json(agent)
})

// 删除 Agent
app.delete('/api/agents/:id', (req, res) => {
  const success = openclawService.deleteAgent(req.params.id)
  if (!success) {
    return res.status(404).json({ error: 'Agent not found' })
  }
  res.json({ success: true })
})

// 获取任务列表
app.get('/api/tasks', (req, res) => {
  const tasks = openclawService.getTasks()
  res.json(tasks)
})

// 创建任务
app.post('/api/tasks', async (req, res) => {
  try {
    const { agentId, instruction } = req.body
    const task = await openclawService.assignTask(agentId, instruction)
    
    // 模拟任务执行
    openclawService.simulateAgentResponse(task.id)
    
    res.status(201).json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: error.message })
  }
})

// 更新任务状态
app.put('/api/tasks/:id', (req, res) => {
  const { status, progress, result } = req.body
  const task = openclawService.updateTaskStatus(req.params.id, status, progress, result)
  if (!task) {
    return res.status(404).json({ error: 'Task not found' })
  }
  res.json(task)
})

// 获取统计数据
app.get('/api/stats', (req, res) => {
  const stats = openclawService.getStats()
  res.json(stats)
})

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    agents: openclawService.getAgents().length,
    tasks: openclawService.getTasks().length
  })
})

// 启动服务器
const HOST = process.env.HOST || '0.0.0.0' // 允许外部访问
app.listen(PORT, HOST, () => {
  console.log(`🚀 Agent Manager Backend running on port ${PORT}`)
  console.log(`📊 API available at http://${HOST}:${PORT}/api`)
  console.log(`🤖 Loaded ${openclawService.getAgents().length} agents`)
  console.log(`🌐 Local access: http://localhost:${PORT}`)
  console.log(`🌐 Network access: http://$(hostname -I | awk '{print $1}'):${PORT}`)
})