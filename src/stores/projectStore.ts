import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project, ProjectStore } from "../types";

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,

      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          testCases: [],
        };

        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: new Date().toISOString() }
              : project
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          currentProject:
            state.currentProject?.id === id ? null : state.currentProject,
        }));
      },

      setCurrentProject: (project) => {
        set({ currentProject: project });
      },
    }),
    {
      name: "project-store",
    }
  )
);
