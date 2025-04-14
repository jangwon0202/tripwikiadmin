// src/components/ContentDetailModal.tsx
import React, { useState } from "react"
import { Button } from "../components/ui/button"

type ContentDetailModalProps = {
  content: Record<string, any>
  onClose: () => void
  onUpdate: (updated: Record<string, string>) => void
  onDelete: () => void
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  content,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [editableContent, setEditableContent] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const [key, value] of Object.entries(content)) {
      initial[key] = String(value)
    }
    return initial
  })

  const handleChange = (key: string, value: string) => {
    setEditableContent((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-bold mb-4">관광지 상세 정보</h2>
        {Object.entries(editableContent).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block font-semibold mb-1">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        ))}
        <div className="mt-4 flex justify-between">
          <Button onClick={() => onUpdate(editableContent)} className="bg-green-500 text-white">
            수정
          </Button>
          <Button onClick={onDelete} className="bg-red-500 text-white">
            삭제
          </Button>
          <Button onClick={onClose} className="bg-gray-300">
            닫기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContentDetailModal
