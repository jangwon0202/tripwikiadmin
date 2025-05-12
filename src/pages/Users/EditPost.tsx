// src/pages/Users/EditPost.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDatabase, ref, get, set } from "firebase/database"
import { Button } from "../../components/ui/button"

type PostType = {
  [key: string]: any
  postId: string
}

const EditPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostType | null>(null)
  const [newKey, setNewKey] = useState("")
  const [newValue, setNewValue] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase()
    const postRef = ref(db, `community/${postId}`)
    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setPost({ postId: postId!, ...data }) // postId도 포함
      }
      setLoading(false)
    })
  }, [postId])

  const handleChange = (key: string, value: string) => {
    setPost((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleDelete = (key: string) => {
    if (post) {
      const updated = { ...post }
      delete updated[key]
      setPost(updated)
    }
  }

  const handleAddField = () => {
    if (newKey.trim() !== "") {
      setPost((prev) => (prev ? { ...prev, [newKey]: newValue } : prev))
      setNewKey("")
      setNewValue("")
    }
  }

  const tryParseJSON = (value: string) => {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  const handleSave = async () => {
    if (postId && post) {
      const { postId: id, ...rawData } = post
      const parsedData: { [key: string]: any } = {}

      for (const [key, value] of Object.entries(rawData)) {
        parsedData[key] = tryParseJSON(value)
      }

      const db = getDatabase()
      await set(ref(db, `community/${id}`), parsedData)
      alert("게시글이 수정되었습니다.")
      navigate("/users/posts")
    }
  }

  if (loading || !post) return <div className="p-4">로딩 중...</div>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>

      <div className="space-y-2 mb-6">
        {Object.entries(post).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="text"
              value={key}
              disabled
              className="w-1/4 px-2 py-1 border bg-gray-100"
            />
            <textarea
              value={typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-2/4 px-2 py-1 border h-24 font-mono"
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

      {/* 필드 추가 */}
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

      <Button onClick={handleSave} className="mr-2 bg-blue-500 text-white">
        저장
      </Button>
      <Button variant="outline" onClick={() => navigate("/users/posts")}>
        취소
      </Button>
    </div>
  )
}

export default EditPost
