import { getDatabase, onValue, ref, remove, runTransaction, get } from "firebase/database"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"

type Post = {
  postId: string
  title: string
  imageUrl: string
  author: string
  content: string
  timeText: string
  timestamp: number
  uid: string // ✅ 추가
}

const PostManager = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const db = getDatabase()
    const postRef = ref(db, "community")
    onValue(postRef, (snapshot) => {
      const data = snapshot.val()
      const loadedPosts: Post[] = data
        ? Object.entries(data).map(([id, value]: any) => ({
            postId: id,
            title: value.title,
            imageUrl: value.imageUrl,
            author: value.author,
            content: value.content,
            timeText: value.timeText,
            timestamp: value.timestamp,
            uid: value.uid, // ✅ 포함
          }))
        : []
      setPosts(loadedPosts)
    })
  }, [])

  const deletePost = async (postId: string, uid: string) => {
    const db = getDatabase()
    try {
      await Promise.all([
        remove(ref(db, `community/${postId}`)), // 커뮤니티에서 삭제
        remove(ref(db, `users/${uid}/Post/${postId}`)), // 사용자 경로에서 삭제
        runTransaction(ref(db, `users/${uid}/postCount`), (currentCount) => {
          return (currentCount || 0) - 1 // 게시물 수 감소
        }),
      ])
      alert("게시글이 삭제되었습니다.")
    } catch (error) {
      console.error("삭제 실패:", error)
      alert("삭제에 실패했습니다.")
    }
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="border rounded p-2 shadow cursor-pointer hover:shadow-lg"
          onClick={() => navigate(`/users/posts/edit/${post.postId}`)}
        >
          <img
            src={post.imageUrl}
            alt="썸네일"
            className="h-40 w-full object-cover rounded"
          />
          <p className="font-semibold mt-2">{post.title}</p>
          <Button
            className="bg-red-500 text-white mt-2"
            onClick={(e) => {
              e.stopPropagation()
              deletePost(post.postId, post.uid) // ✅ UID 함께 전달
            }}
          >
            삭제
          </Button>
        </div>
      ))}
    </div>
  )
}

export default PostManager
