// Vercel Serverless Function - Stats API
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      totalAgents: 3,
      activeAgents: 1,
      idleAgents: 2,
      totalTasks: 25,
      completedTasks: 20,
      runningTasks: 5
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}