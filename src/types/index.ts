// プロジェクト関連の型定義

export interface Project {
  id: string;
  name: string;
  description?: string;
  category: ProjectCategory;
  createdAt: string;
  updatedAt: string;
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  title: string;
  category: string;
  status: "completed" | "in_progress" | "failed" | "pending";
  steps: number;
  evidence: number;
  lastModified: string;
  description?: string;
  testSteps?: TestStep[];
}

export interface TestStep {
  id: string;
  description: string;
  expected: string;
  evidence: Evidence[];
}

export interface Evidence {
  id: string;
  name: string;
  url: string;
}

// カテゴリの定数定義
export const PROJECT_CATEGORIES = [
  "ITa",
  "ITb",
  "統合テスト",
  "その他",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// プロジェクト作成フォームの型
export interface CreateProjectForm {
  name: string;
  description: string;
  category: ProjectCategory;
}

// フォームエラーの型
export interface FormErrors {
  name?: string;
  description?: string;
  category?: string;
}

// プロジェクトストアの型
export interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt" | "testCases">
  ) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
}
