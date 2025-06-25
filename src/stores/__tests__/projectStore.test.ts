import { act, renderHook } from "@testing-library/react";
import { useProjectStore } from "../projectStore";

// テスト用のプロジェクトデータ
const mockProject = {
  name: "テストプロジェクト",
  description: "テスト用のプロジェクトです",
  category: "ITa" as const,
};

describe("ProjectStore", () => {
  beforeEach(() => {
    // 各テストの前にlocalStorageをクリア
    localStorage.clear();

    // 各テストの前にストアをクリア
    const { result } = renderHook(() => useProjectStore());
    act(() => {
      result.current.projects.forEach((project) => {
        result.current.deleteProject(project.id);
      });
    });
  });

  describe("addProject", () => {
    test("新しいプロジェクトを追加できる", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      expect(result.current.projects).toHaveLength(1);
      expect(result.current.projects[0].name).toBe(mockProject.name);
      expect(result.current.projects[0].description).toBe(
        mockProject.description
      );
      expect(result.current.projects[0].category).toBe(mockProject.category);
      expect(result.current.projects[0].id).toBeDefined();
      expect(result.current.projects[0].createdAt).toBeDefined();
      expect(result.current.projects[0].updatedAt).toBeDefined();
      expect(result.current.projects[0].testCases).toEqual([]);
    });

    test("プロジェクトにはユニークなIDが生成される", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
        result.current.addProject({ ...mockProject, name: "別のプロジェクト" });
      });

      expect(result.current.projects).toHaveLength(2);
      expect(result.current.projects[0].id).not.toBe(
        result.current.projects[1].id
      );
    });
  });

  describe("updateProject", () => {
    test("既存のプロジェクトを更新できる", async () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      const projectId = result.current.projects[0].id;
      const createdAt = result.current.projects[0].createdAt;
      const updatedName = "更新されたプロジェクト";

      // 時間差を作るため少し待つ
      await new Promise((resolve) => setTimeout(resolve, 10));

      act(() => {
        result.current.updateProject(projectId, { name: updatedName });
      });

      expect(result.current.projects[0].name).toBe(updatedName);
      expect(result.current.projects[0].updatedAt).not.toBe(createdAt);
    });
  });

  describe("deleteProject", () => {
    test("プロジェクトを削除できる", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      const projectId = result.current.projects[0].id;

      act(() => {
        result.current.deleteProject(projectId);
      });

      expect(result.current.projects).toHaveLength(0);
    });

    test("現在のプロジェクトを削除するとcurrentProjectがnullになる", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      const project = result.current.projects[0];

      // プロジェクトを現在のプロジェクトに設定
      act(() => {
        result.current.setCurrentProject(project);
      });

      expect(result.current.currentProject).toBe(project);

      // そのプロジェクトを削除
      act(() => {
        result.current.deleteProject(project.id);
      });

      // currentProjectがnullになることを確認
      expect(result.current.currentProject).toBeNull();
      expect(result.current.projects).toHaveLength(0);
    });

    test("現在のプロジェクト以外を削除してもcurrentProjectは変わらない", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
        result.current.addProject({ ...mockProject, name: "別のプロジェクト" });
      });

      const [firstProject, secondProject] = result.current.projects;

      // 最初のプロジェクトを現在のプロジェクトに設定
      act(() => {
        result.current.setCurrentProject(firstProject);
      });

      // 2番目のプロジェクトを削除
      act(() => {
        result.current.deleteProject(secondProject.id);
      });

      // currentProjectは変わらないことを確認
      expect(result.current.currentProject).toBe(firstProject);
      expect(result.current.projects).toHaveLength(1);
    });
  });

  describe("setCurrentProject", () => {
    test("現在のプロジェクトを設定できる", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      const project = result.current.projects[0];

      act(() => {
        result.current.setCurrentProject(project);
      });

      expect(result.current.currentProject).toBe(project);
    });

    test("現在のプロジェクトをnullに設定できる", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.setCurrentProject(null);
      });

      expect(result.current.currentProject).toBe(null);
    });
  });

  describe("永続化機能", () => {
    test("プロジェクトを追加するとlocalStorageに保存される", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      // localStorageにデータが保存されることを確認
      const savedData = localStorage.getItem("project-store");
      expect(savedData).toBeTruthy();

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        expect(parsedData.state.projects).toHaveLength(1);
        expect(parsedData.state.projects[0].name).toBe(mockProject.name);
      }
    });

    test("永続化されたデータを新しいストアインスタンスで読み込める", () => {
      // 最初のストアでデータを保存
      const { result: firstResult } = renderHook(() => useProjectStore());

      act(() => {
        firstResult.current.addProject(mockProject);
      });

      expect(firstResult.current.projects).toHaveLength(1);

      // 新しいストアインスタンスを作成して、永続化されたデータが読み込まれることを確認
      const { result: secondResult } = renderHook(() => useProjectStore());

      expect(secondResult.current.projects).toHaveLength(1);
      expect(secondResult.current.projects[0].name).toBe(mockProject.name);
    });

    test("プロジェクトを削除すると永続化データも更新される", () => {
      const { result } = renderHook(() => useProjectStore());

      act(() => {
        result.current.addProject(mockProject);
      });

      const projectId = result.current.projects[0].id;

      act(() => {
        result.current.deleteProject(projectId);
      });

      // localStorageのデータが更新されることを確認
      const savedData = localStorage.getItem("project-store");
      expect(savedData).toBeTruthy();

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        expect(parsedData.state.projects).toHaveLength(0);
      }
    });
  });
});
