import React, { useState } from 'react'
import { Edit, Save, X, Plus, Image, Trash2, ZoomIn } from 'lucide-react'

const mockTestCase = {
  id: 1,
  title: 'ユーザーログイン機能',
  category: 'ITa',
  description: 'ユーザーが正しい認証情報を入力してログインできることを確認する',
  steps: [
    {
      id: 1,
      description: 'ログインページにアクセスする',
      expected: 'ログインフォームが表示される',
      evidence: [
        { id: 1, name: 'login_page.png', url: '/mock/login_page.png' }
      ]
    },
    {
      id: 2,
      description: '有効なユーザー名とパスワードを入力する',
      expected: '入力フィールドに値が表示される',
      evidence: [
        { id: 2, name: 'input_credentials.png', url: '/mock/input_credentials.png' }
      ]
    },
    {
      id: 3,
      description: 'ログインボタンをクリックする',
      expected: 'ダッシュボードページにリダイレクトされる',
      evidence: [
        { id: 3, name: 'dashboard.png', url: '/mock/dashboard.png' },
        { id: 4, name: 'welcome_message.png', url: '/mock/welcome_message.png' }
      ]
    }
  ]
}

export const TestCaseDetail: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {mockTestCase.title}
            </h1>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {mockTestCase.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  保存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  キャンセル
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                編集
              </button>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>{mockTestCase.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">テスト手順</h2>
            {isEditing && (
              <button className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100">
                <Plus className="h-4 w-4 mr-2" />
                手順追加
              </button>
            )}
          </div>

          {mockTestCase.steps.map((step, index) => (
            <div key={step.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  手順 {index + 1}
                </h3>
                {isEditing && (
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    操作内容
                  </label>
                  {isEditing ? (
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      defaultValue={step.description}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{step.description}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    期待結果
                  </label>
                  {isEditing ? (
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      defaultValue={step.expected}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{step.expected}</p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-700">
                      エビデンス ({step.evidence.length}件)
                    </label>
                    {isEditing && (
                      <button className="flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100">
                        <Plus className="h-3 w-3 mr-1" />
                        画像追加
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {step.evidence.map((evidence) => (
                      <div key={evidence.id} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <Image className="h-8 w-8 text-gray-400" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center">
                          <button
                            onClick={() => setSelectedImage(evidence.url)}
                            className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full shadow-md transition-opacity"
                          >
                            <ZoomIn className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {evidence.name}
                        </p>
                      </div>
                    ))}
                    
                    {isEditing && (
                      <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                        <div className="text-center">
                          <Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">画像を追加</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full p-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">エビデンス画像</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">画像プレビュー</p>
                  <p className="text-sm text-gray-400">{selectedImage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}