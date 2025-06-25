import React, { useState } from 'react'
import { FolderOpen, Plus, Search } from 'lucide-react'
import { ProjectCreateModal } from './ProjectCreateModal'
import { useProjectStore } from '../stores/projectStore'
import type { CreateProjectForm } from '../types'

export const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { projects, addProject } = useProjectStore()

  const handleCreateProject = (formData: CreateProjectForm) => {
    addProject(formData)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">プロジェクト</h2>
          <button 
            className="p-1 text-gray-500 hover:text-gray-700"
            onClick={() => setIsModalOpen(true)}
            aria-label="新規プロジェクト作成"
          >
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
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
                  {project.name}
                </div>
                <span className="text-xs text-gray-500">
                  ({project.testCases.length}件)
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              プロジェクトがありません<br />
              ＋ボタンから作成してください
            </div>
          )}
        </div>
      </div>

      <ProjectCreateModal
        isOpen={isModalOpen}
        onSubmit={handleCreateProject}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  )
}