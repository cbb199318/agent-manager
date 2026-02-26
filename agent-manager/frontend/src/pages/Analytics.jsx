import React from 'react'

function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">数据分析</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Token 使用统计</h3>
          <div className="text-center py-12">
            <p className="text-gray-500">📊 图表开发中...</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">成本分析</h3>
          <div className="text-center py-12">
            <p className="text-gray-500">💰 图表开发中...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics