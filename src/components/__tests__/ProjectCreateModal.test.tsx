import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectCreateModal } from '../ProjectCreateModal'

describe('ProjectCreateModal', () => {
  const mockOnSubmit = jest.fn()
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('isOpenがtrueの時にモーダルが表示される', () => {
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('新規プロジェクト作成')).toBeInTheDocument()
  })

  test('isOpenがfalseの時にモーダルが表示されない', () => {
    render(
      <ProjectCreateModal
        isOpen={false}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('ESCキーでモーダルが閉じる', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    await user.keyboard('{Escape}')
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('オーバーレイクリックでモーダルが閉じる', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    const overlay = screen.getByTestId('modal-overlay')
    await user.click(overlay)
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('フォーム送信が正しく動作する', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    const nameInput = screen.getByLabelText('プロジェクト名')
    const submitButton = screen.getByRole('button', { name: '作成' })

    await user.type(nameInput, 'テストプロジェクト')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'テストプロジェクト',
        description: '',
        category: 'ITa',
      })
    })
  })

  test('フォーム送信後にモーダルが閉じる', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    const nameInput = screen.getByLabelText('プロジェクト名')
    const submitButton = screen.getByRole('button', { name: '作成' })

    await user.type(nameInput, 'テストプロジェクト')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  test('キャンセルボタンでモーダルが閉じる', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    const cancelButton = screen.getByRole('button', { name: 'キャンセル' })
    await user.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  test('モーダルが開いた時にフォーカスが移る', () => {
    render(
      <ProjectCreateModal
        isOpen={true}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />
    )

    const nameInput = screen.getByLabelText('プロジェクト名')
    expect(nameInput).toHaveFocus()
  })
})