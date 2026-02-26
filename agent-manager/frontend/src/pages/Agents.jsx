import React, { useState, useEffect } from 'react'
import { agentAPI, taskAPI } from '../services/api'

function Agents() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    model: 'qwen3.5-plus'
  })

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    try {
      const res = await agentAPI.getAll()
      setAgents(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load agents:', error)
      setLoading(false)
    }
  }

  const handleCreateAgent = async () => {
    try {
      await agentAPI.create(newAgent)
      setShowCreateModal(false)
      setNewAgent({ name: '', description: '', model: 'qwen3.5-plus' })
      loadAgents()
    } catch (error) {
      console.error('Failed to create agent:', error)
      alert('创建失败：' + error.message)
    }
  }

  const getStatusBadge = (status) => {
    if (status === 'busy') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">🟡 忙碌</span>
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🟢 空闲</span>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-500">加载 Agent 列表...</div>
          <div className="text-sm text-gray-400 mt-2">如果加载时间过长，请刷新页面</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Agent 管理</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          ➕ 新建 Agent
        </button>
      </div>

      {/* Agent 列表 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
                {getStatusBadge(agent.status)}
              </div>
              <p className="text-sm text-gray-500 mb-4">{agent.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span>🤖 模型：{agent.model}</span>
                <span>✅ 完成：{agent.tasksCompleted || 0}</span>
                <span>⏳ 进行中：{agent.tasksRunning || 0}</span>
              </div>
              <div className="flex space-x-3">
                <button 
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => alert(`查看 Agent: ${agent.name}`)}
                >
                  查看
                </button>
                <button 
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => alert(`编辑 Agent: ${agent.name}`)}
                >
                  编辑
                </button>
                <button 
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-indigo-300 shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
                  onClick={async () => {
                    const instruction = prompt('请输入任务指令：')
                    if (instruction) {
                      try {
                        await taskAPI.create({ agentId: agent.id, instruction })
                        alert('任务已分配！')
                        loadAgents()
                      } catch (error) {
                        alert('分配任务失败：' + error.message)
                      }
                    }
                  }}
                >
                  分配任务
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 创建 Agent 模态框 */}
      {showCreateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">创建新 Agent</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">名称</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="例如：内容策划 Agent"
                      value={newAgent.name}
                      onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">描述</label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="3"
                      placeholder="描述 Agent 的职责"
                      value={newAgent.description}
                      onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">选择模型</label>
                    <select
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={newAgent.model}
                      onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value })}
                    >
                      <option value="qwen3.5-plus">qwen3.5-plus (推荐)</option>
                      <option value="qwen3-coder-plus">qwen3-coder-plus</option>
                      <option value="glm-5">glm-5</option>
                      <option value="kimi-k2.5">kimi-k2.5</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm"
                  onClick={handleCreateAgent}
                >
                  创建
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Agents