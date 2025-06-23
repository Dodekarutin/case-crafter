import React from 'react'
import { Plus, Search, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

const mockTestCases = [
  {
    id: 1,
    title: 'ユーザーログイン機能',
    category: 'ITa',
    status: 'completed',
    steps: 5,
    evidence: 3,
    lastModified: '2024-01-15'
  },
  {
    id: 2,
    title: 'パスワードリセット',
    category: 'ITa',
    status: 'in_progress',
    steps: 8,
    evidence: 2,
    lastModified: '2024-01-14'
  },
  {
    id: 3,
    title: 'ユーザー登録処理',
    category: 'ITb',
    status: 'pending',
    steps: 6,
    evidence: 0,
    lastModified: '2024-01-13'
  },
  {
    id: 4,
    title: 'データベース連携',
    category: 'ITb',
    status: 'failed',
    steps: 4,
    evidence: 1,
    lastModified: '2024-01-12'
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'in_progress':
      return <Clock className="h-5 w-5 text-blue-500" />
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-400" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '完了'
    case 'in_progress':
      return '進行中'
    case 'failed':
      return '失敗'
    default:
      return '未実施'
  }
}

export const TestCaseList: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">テストケース</h2>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            新規作成
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="テストケースを検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {mockTestCases.map((testCase) => (
            <div
              key={testCase.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {testCase.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {testCase.category}
                    </span>
                    <div className="flex items-center">
                      {getStatusIcon(testCase.status)}
                      <span className="ml-1 text-xs text-gray-600">
                        {getStatusText(testCase.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>手順: {testCase.steps}件</span>
                  <span>エビデンス: {testCase.evidence}件</span>
                </div>
                <span>{testCase.lastModified}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}