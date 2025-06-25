// プロジェクト関連の型定義

export interface Project {
  id: string
  name: string
  description?: string
  category: 'ITa' | 'ITb' | '統合テスト' | 'その他'
  createdAt: string
  updatedAt: string
  testCases: TestCase[]
}

export interface TestCase {
  id: number
  title: string
  category: string
  status: 'completed' | 'in_progress' | 'failed' | 'pending'
  steps: number
  evidence: number
  lastModified: string
  description?: string
  testSteps?: TestStep[]
}

export interface TestStep {
  id: number
  description: string
  expected: string
  evidence: Evidence[]
}

export interface Evidence {
  id: number
  name: string
  url: string
}

// プロジェクト作成フォームの型
export interface CreateProjectForm {
  name: string
  description: string
  category: Project['category']
}

// プロジェクトストアの型
export interface ProjectStore {
  projects: Project[]
  currentProject: Project | null
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'testCases'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (project: Project | null) => void
}