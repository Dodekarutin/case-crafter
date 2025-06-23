import React from 'react'
import { FolderOpen, Plus, Search, Filter } from 'lucide-react'

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">プロジェクト</h2>
          <button className="p-1 text-gray-500 hover:text-gray-700">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="プロジェクトを検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 text-sm text-gray-700 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
              現在のプロジェクト
            </div>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="ml-6 space-y-1">
            <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
              ITa テスト (5件)
            </div>
            <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
              ITb テスト (3件)
            </div>
            <div className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
              統合テスト (8件)
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">最近のプロジェクト</h3>
          <div className="space-y-1">
            <div className="flex items-center p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
              <FolderOpen className="h-4 w-4 mr-2 text-gray-400" />
              ログイン機能テスト
            </div>
            <div className="flex items-center p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
              <FolderOpen className="h-4 w-4 mr-2 text-gray-400" />
              API連携テスト
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}