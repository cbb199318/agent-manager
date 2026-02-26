// Vercel Serverless Function - Agent API
const agents = [
  {
    id: 'agent_1',
    name: '内容策划 Agent',
    description: '负责视频内容策划和选题分析',
    model: 'qwen3.5-plus',
    status: 'idle',
    tasksCompleted: 15,
    tasksRunning: 0
  },
  {
    id: 'agent_2',
    name: '脚本写作 Agent',
    description: '负责撰写视频脚本和台词',
    model: 'qwen3.5-plus',
    status: 'busy',
    tasksCompleted: 12,
    tasksRunning: 1
  },
  {
    id: 'agent_3',
    name: '运营推广 Agent',
    description: '负责发布策略和数据分析',
    model: 'qwen3.5-plus',
    status: 'idle',
    tasksCompleted: 10,
    tasksRunning: 0
  }
];

export default function handler(req, res) {
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求（预检）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/agents - 获取所有 Agent
  if (req.method === 'GET') {
    return res.status(200).json(agents);
  }

  // POST /api/agents - 创建新 Agent
  if (req.method === 'POST') {
    const { name, description, model } = req.body;
    const newAgent = {
      id: `agent_${Date.now()}`,
      name,
      description,
      model: model || 'qwen3.5-plus',
      status: 'idle',
      tasksCompleted: 0,
      tasksRunning: 0
    };
    agents.push(newAgent);
    return res.status(201).json(newAgent);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}