// Vercel Serverless Function - Tasks API
const tasks = [
  { id: 26, agentId: 'agent_2', instruction: '撰写 OpenClaw 多 Agent 协同视频脚本', status: 'running', progress: 60 },
  { id: 25, agentId: 'agent_1', instruction: '分析抖音 AI 热点趋势', status: 'completed', progress: 100 },
  { id: 24, agentId: 'agent_3', instruction: '制定视频发布策略', status: 'completed', progress: 100 }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(tasks);
  }

  if (req.method === 'POST') {
    const { agentId, instruction } = req.body;
    const newTask = {
      id: tasks.length + 1,
      agentId,
      instruction,
      status: 'pending',
      progress: 0
    };
    tasks.unshift(newTask);
    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}