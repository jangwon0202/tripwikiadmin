// src/pages/Users/PostManager.tsx
import { getDatabase, onValue, ref, remove } from "firebase/database"
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
}

const PostManager = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate() // ✅ useNavigate는 여기에서 호출해야 함

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
          }))
        : []
      setPosts(loadedPosts)
    })
  }, [])

  const deletePost = (postId: string) => {
    const db = getDatabase()
    remove(ref(db, `community/${postId}`))
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
              e.stopPropagation() // 클릭 버블 방지
              deletePost(post.postId)
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
