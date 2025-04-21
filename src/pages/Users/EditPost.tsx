// src/pages/Users/EditPost.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDatabase, ref, get, update } from "firebase/database"
import { Button } from "../../components/ui/button"

const EditPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const db = getDatabase()
    const postRef = ref(db, `community/${postId}`)
    get(postRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setTitle(data.title || "")
        setContent(data.content || "")
        setImageUrl(data.imageUrl || "")
      }
      setLoading(false)
    })
  }, [postId])

  const handleSave = async () => {
    const db = getDatabase()
    const postRef = ref(db, `community/${postId}`)
    await update(postRef, {
      title,
      content,
      imageUrl,
    })
    alert("게시글이 수정되었습니다.")
    navigate("/users/posts")
  }

  if (loading) return <div className="p-4">로딩 중...</div>

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">게시글 수정</h2>

      <label className="block mb-2">제목</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2">내용</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 h-40"
      />

      <label className="block mb-2">이미지 URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <Button onClick={handleSave} className="mr-2 bg-blue-500 text-white">저장</Button>
      <Button variant="outline" onClick={() => navigate("/users/posts")}>취소</Button>
    </div>
  )
}

export default EditPost
