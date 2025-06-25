import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { ProjectCreateForm } from './ProjectCreateForm'
import type { CreateProjectForm } from '../types'

interface ProjectCreateModalProps {
  isOpen: boolean
  onSubmit: (formData: CreateProjectForm) => void
  onClose: () => void
}

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (formData: CreateProjectForm) => {
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
            新規プロジェクト作成
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="モーダルを閉じる"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <ProjectCreateForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            nameInputRef={nameInputRef}
          />
        </div>
      </div>
    </div>
  )
}