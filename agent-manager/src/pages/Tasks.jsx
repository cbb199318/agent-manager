import React from 'react'

function Tasks() {
  const tasks = [
    { id: 26, agent: '脚本写作 Agent', instruction: '撰写 OpenClaw 多 Agent 协同视频脚本', status: 'running', progress: 60 },
    { id: 25, agent: '内容策划 Agent', instruction: '分析抖音 AI 热点趋势', status: 'completed', progress: 100 },
    { id: 24, agent: '运营推广 Agent', instruction: '制定视频发布策略', status: 'completed', progress: 100 }
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">任务管理</h2>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">当前任务</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">任务 #{task.id}</p>
                    <p className="text-sm text-gray-500">{task.agent}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'running' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.status === 'running' ? '⏳ 进行中' : '✅ 已完成'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{task.instruction}</p>
                {task.status === 'running' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks