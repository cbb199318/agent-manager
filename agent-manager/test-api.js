const http = require('http')

console.log('📊 API 性能测试\n')

function testAPI(endpoint, name) {
  return new Promise((resolve) => {
    const start = Date.now()
    http.get(`http://localhost:3001${endpoint}`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        const duration = Date.now() - start
        console.log(`${name}: ${duration}ms`)
        resolve(duration)
      })
    }).on('error', (err) => {
      console.error(`${name}: 错误 - ${err.message}`)
      resolve(-1)
    })
  })
}

async function runTests() {
  console.log('开始测试...\n')
  
  // 第一次测试（预热）
  console.log('🔥 预热请求...')
  await testAPI('/api/health', '  健康检查')
  
  // 正式测试
  console.log('\n📈 正式测试:')
  const results = []
  
  for (let i = 0; i < 5; i++) {
    const t1 = await testAPI('/api/stats', `  [${i+1}] Stats`)
    const t2 = await testAPI('/api/agents', `[${i+1}] Agents`)
    results.push(t1, t2)
  }
  
  // 计算平均值
  const avg = results.reduce((a, b) => a + b, 0) / results.length
  console.log(`\n平均响应时间：${avg.toFixed(0)}ms`)
  console.log(`最快：${Math.min(...results)}ms`)
  console.log(`最慢：${Math.max(...results)}ms`)
}

runTests()