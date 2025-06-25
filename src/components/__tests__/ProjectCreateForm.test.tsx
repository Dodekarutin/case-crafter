import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectCreateForm } from "../ProjectCreateForm";

describe("ProjectCreateForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("フォームが正しくレンダリングされる", () => {
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    expect(screen.getByLabelText("プロジェクト名")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByLabelText("カテゴリ")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" })
    ).toBeInTheDocument();
  });

  test("プロジェクト名が必須項目として機能する", async () => {
    const user = userEvent.setup();
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const submitButton = screen.getByRole("button", { name: "作成" });
    await user.click(submitButton);

    expect(screen.getByText("プロジェクト名は必須です")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("有効なデータで送信できる", async () => {
    const user = userEvent.setup();
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const nameInput = screen.getByLabelText("プロジェクト名");
    const descriptionInput = screen.getByLabelText("説明");
    const categorySelect = screen.getByLabelText("カテゴリ");
    const submitButton = screen.getByRole("button", { name: "作成" });

    await user.type(nameInput, "テストプロジェクト");
    await user.type(descriptionInput, "テスト用のプロジェクトです");
    await user.selectOptions(categorySelect, "ITa");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "テストプロジェクト",
        description: "テスト用のプロジェクトです",
        category: "ITa",
      });
    });
  });

  test("キャンセルボタンが機能する", async () => {
    const user = userEvent.setup();
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const cancelButton = screen.getByRole("button", { name: "キャンセル" });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("フォーム送信後にフィールドがクリアされる", async () => {
    const user = userEvent.setup();
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    const nameInput = screen.getByLabelText(
      "プロジェクト名"
    ) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText("説明") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "作成" });

    await user.type(nameInput, "テストプロジェクト");
    await user.type(descriptionInput, "テスト用のプロジェクトです");
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(descriptionInput.value).toBe("");
    });
  });

  test("カテゴリ選択肢が正しく表示される", () => {
    render(
      <ProjectCreateForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );

    screen.getByLabelText("カテゴリ");
    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(4);
    expect(screen.getByRole("option", { name: "ITa" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "ITb" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "統合テスト" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "その他" })).toBeInTheDocument();
  });
});
