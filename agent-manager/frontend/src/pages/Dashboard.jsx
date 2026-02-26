import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { statsAPI, taskAPI } from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    idleAgents: 0,
    totalTasks: 0,
    completedTasks: 0,
    runningTasks: 0
  })

  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
    // 每 10 秒刷新一次数据（降低频率）
    const interval = setInterval(loadDashboardData, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const statsRes = await statsAPI.get()
      setStats(statsRes.data)

      const tasksRes = await taskAPI.getAll()
      setRecentTasks(tasksRes.data.slice(0, 5))
      
      setLoading(false)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h2>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Agent 总数</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-600">{stats.totalAgents}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">活跃 Agent</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{stats.activeAgents}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">空闲 Agent</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-600">{stats.idleAgents}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">总任务数</dt>
            <dd className="mt-1 text-3xl font-semibold text-purple-600">{stats.totalTasks}</dd>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
          <div className="flex space-x-4">
            <Link to="/agents" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              ➕ 创建 Agent
            </Link>
            <Link to="/tasks" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              📋 分配任务
            </Link>
            <Link to="/analytics" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              📊 查看日志
            </Link>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">最近活动</h3>
          {recentTasks.length === 0 ? (
            <p className="text-gray-500">暂无任务</p>
          ) : (
            <div className="flow-root">
              <ul className="-mb-8">
                {recentTasks.map((task, idx) => (
                  <li key={task.id}>
                    <div className="relative pb-8">
                      {idx !== recentTasks.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                            📋
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">任务 #{task.id}</span>{' '}
                              {task.status === 'completed' ? '已完成' : task.status === 'running' ? '进行中' : '等待中'}
                            </p>
                            <p className="text-sm text-gray-700 truncate">{task.instruction}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{new Date(task.createdAt).toLocaleTimeString()}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard