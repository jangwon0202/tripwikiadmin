// src/pages/Detail.tsx
import { getDatabase, onValue, ref, set } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type ContentType = {
  contentId: string
  contentTypeId: string
  title: string
  firstimage?: string
  [key: string]: any
}

const Detail = () => {
  const { contentTypeId, contentId } = useParams()
  const [content, setContent] = useState<ContentType | null>(null)
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")
  const db = getDatabase()

  useEffect(() => {
    if (contentTypeId && contentId) {
      const detailRef = ref(
        db,
        `tour_data/contents/${contentTypeId}/${contentId}`
      )
      onValue(detailRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          setContent({ contentId, contentTypeId, ...data })
        }
      })
    }
  }, [contentTypeId, contentId])

  const handleChange = (key: string, value: string) => {
    setContent((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleDelete = (key: string) => {
    if (content) {
      const updated = { ...content }
      delete updated[key]
      setContent(updated)
    }
  }

  const handleAddField = () => {
    if (newKey.trim() !== "") {
      setContent((prev) => (prev ? { ...prev, [newKey]: newValue } : prev))
      setNewKey("")
      setNewValue("")
    }
  }

  const handleSave = async () => {
    if (contentTypeId && contentId && content) {
      const { contentId: id, contentTypeId: typeId, ...dataToSave } = content
      await set(ref(db, `tour_data/contents/${typeId}/${id}`), dataToSave)
      alert("저장 완료!")
    }
  }

  if (!content) return <p>로딩 중...</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">관광지 상세 정보</h2>

      {content.firstimage && (
        <img
          src={content.firstimage}
          alt={content.title}
          className="w-full max-w-md mb-4 rounded"
        />
      )}

      <div className="space-y-2 mb-6">
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="text"
              value={key}
              disabled
              className="w-1/4 px-2 py-1 border bg-gray-100"
            />
            <input
              type="text"
              value={String(value)}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-2/4 px-2 py-1 border"
            />
            <button
              onClick={() => handleDelete(key)}
              className="text-red-500 hover:underline"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 필드 추가 영역 */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="새 필드명"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="w-1/4 px-2 py-1 border"
        />
        <input
          type="text"
          placeholder="새 값"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-2/4 px-2 py-1 border"
        />
        <button
          onClick={handleAddField}
          className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-1 rounded"
        >
          추가
        </button>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        저장
      </button>
    </div>
  )
}

export default Detail
