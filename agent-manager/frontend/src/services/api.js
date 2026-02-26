import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  baseURL: '/api', // Vercel 使用相对路径
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器，优化性能
api.interceptors.request.use(
  config => {
    console.log(`📡 API Request: ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  error => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout:', error.config.url)
    } else if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data)
    } else {
      console.error('❌ Network error:', error.message)
    }
    return Promise.reject(error)
  }
)

// Agent API
export const agentAPI = {
  // 获取所有 Agent
  getAll() {
    return api.get('/agents')
  },

  // 获取单个 Agent
  getById(id) {
    return api.get(`/agents/${id}`)
  },

  // 创建 Agent
  create(data) {
    return api.post('/agents', data)
  },

  // 更新 Agent
  update(id, data) {
    return api.put(`/agents/${id}`, data)
  },

  // 删除 Agent
  delete(id) {
    return api.delete(`/agents/${id}`)
  }
}

// Task API
export const taskAPI = {
  // 获取所有任务
  getAll() {
    return api.get('/tasks')
  },

  // 创建任务
  create(data) {
    return api.post('/tasks', data)
  },

  // 更新任务
  update(id, data) {
    return api.put(`/tasks/${id}`, data)
  }
}

// 统计 API
export const statsAPI = {
  get() {
    return api.get('/stats')
  }
}

// 健康检查
export const healthAPI = {
  check() {
    return api.get('/health')
  }
}

export default api